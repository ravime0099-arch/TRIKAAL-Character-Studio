extends CharacterBody3D

@export var move_speed: float = 4.2
@export var turn_speed: float = 9.0
@export var character_id: String = "ref-p01"
var gravity: float = 18.0
var visual_root: Node3D

func _ready() -> void:
	_build_character()

func _physics_process(delta: float) -> void:
	var input_dir := Input.get_vector("move_left", "move_right", "move_forward", "move_back")
	var direction := Vector3(input_dir.x, 0.0, input_dir.y)
	if direction.length() > 0.05:
		direction = direction.normalized()
		velocity.x = direction.x * move_speed
		velocity.z = direction.z * move_speed
		visual_root.rotation.y = lerp_angle(visual_root.rotation.y, atan2(direction.x, direction.z), turn_speed * delta)
	else:
		velocity.x = move_toward(velocity.x, 0.0, move_speed * 5.0 * delta)
		velocity.z = move_toward(velocity.z, 0.0, move_speed * 5.0 * delta)
	if not is_on_floor():
		velocity.y -= gravity * delta
	else:
		velocity.y = 0.0
	move_and_slide()
	global_position.x = clampf(global_position.x, -25.0, 25.0)
	global_position.z = clampf(global_position.z, -25.0, 25.0)

func _build_character() -> void:
	var collider := CollisionShape3D.new()
	var capsule := CapsuleShape3D.new()
	capsule.radius = 0.38
	capsule.height = 1.8
	collider.shape = capsule
	collider.position.y = 0.9
	add_child(collider)
	visual_root = Node3D.new()
	add_child(visual_root)
	var model_path := "res://characters/" + character_id + "/character.glb"
	if ResourceLoader.exists(model_path):
		var model_scene := load(model_path) as PackedScene
		if model_scene:
			var model := model_scene.instantiate()
			visual_root.add_child(model)
			return
	_build_placeholder_body()

func _build_placeholder_body() -> void:
	var body := MeshInstance3D.new()
	var mesh := CapsuleMesh.new()
	mesh.radius = 0.38
	mesh.height = 1.8
	body.mesh = mesh
	body.position.y = 0.9
	var material := StandardMaterial3D.new()
	material.albedo_color = Color("#8f3048")
	material.roughness = 0.72
	body.material_override = material
	visual_root.add_child(body)
	var head := MeshInstance3D.new()
	var head_mesh := SphereMesh.new()
	head_mesh.radius = 0.25
	head_mesh.height = 0.5
	head.mesh = head_mesh
	head.position.y = 1.93
	head.material_override = material
	visual_root.add_child(head)
