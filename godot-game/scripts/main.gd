extends Node3D

const PlayerScript = preload("res://scripts/player.gd")
var player: CharacterBody3D
var started := false
var selected_character := 0
var character_names := ["राजसी लाल", "पन्ना हरा", "रजत संध्या", "केसरिया", "मरून साड़ी", "नीला पारंपरिक"]
var title_label: Label
var status_label: Label
var start_panel: PanelContainer

func _ready() -> void:
	_build_world()
	_build_ui()

func _build_world() -> void:
	var world_env := WorldEnvironment.new()
	var env := Environment.new()
	env.background_mode = Environment.BG_COLOR
	env.background_color = Color("#17121d")
	env.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
	env.ambient_light_color = Color("#c7a98b")
	env.ambient_light_energy = 0.7
	world_env.environment = env
	add_child(world_env)
	var sun := DirectionalLight3D.new()
	sun.rotation_degrees = Vector3(-48, -32, 0)
	sun.light_energy = 1.25
	add_child(sun)
	var floor_body := StaticBody3D.new()
	floor_body.name = "Ground"
	var floor_mesh := MeshInstance3D.new()
	var plane := PlaneMesh.new()
	plane.size = Vector2(60, 60)
	floor_mesh.mesh = plane
	var floor_mat := StandardMaterial3D.new()
	floor_mat.albedo_color = Color("#55463f")
	floor_mat.roughness = 0.95
	floor_mesh.material_override = floor_mat
	floor_body.add_child(floor_mesh)
	var floor_shape := CollisionShape3D.new()
	var box := BoxShape3D.new()
	box.size = Vector3(60, 0.2, 60)
	floor_shape.shape = box
	floor_shape.position.y = -0.1
	floor_body.add_child(floor_shape)
	add_child(floor_body)
	var camera := Camera3D.new()
	camera.position = Vector3(0, 4.4, 7.5)
	camera.rotation_degrees = Vector3(-22, 0, 0)
	camera.current = true
	add_child(camera)
	var stage := MeshInstance3D.new()
	var disc := CylinderMesh.new()
	disc.top_radius = 2.2
	disc.bottom_radius = 2.2
	disc.height = 0.16
	stage.mesh = disc
	stage.position.y = 0.08
	var stage_mat := StandardMaterial3D.new()
	stage_mat.albedo_color = Color("#9b744b")
	stage_mat.metallic = 0.35
	stage.material_override = stage_mat
	add_child(stage)

func _build_ui() -> void:
	var layer := CanvasLayer.new()
	add_child(layer)
	var root := Control.new()
	root.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	layer.add_child(root)
	title_label = Label.new()
	title_label.text = "TRIKAAL — THE ROYAL BEGINNING"
	title_label.add_theme_font_size_override("font_size", 26)
	title_label.add_theme_color_override("font_color", Color("#f0cf91"))
	title_label.position = Vector2(24, 18)
	root.add_child(title_label)
	status_label = Label.new()
	status_label.text = "प्रारम्भिक playable build · असली reference GLB models अभी जोड़ने बाकी हैं"
	status_label.add_theme_font_size_override("font_size", 14)
	status_label.position = Vector2(24, 58)
	status_label.add_theme_color_override("font_color", Color("#e1d4c8"))
	root.add_child(status_label)
	start_panel = PanelContainer.new()
	start_panel.position = Vector2(24, 108)
	start_panel.custom_minimum_size = Vector2(300, 260)
	root.add_child(start_panel)
	var column := VBoxContainer.new()
	column.add_theme_constant_override("separation", 12)
	start_panel.add_child(column)
	var heading := Label.new()
	heading.text = "अपना पात्र चुनें"
	heading.add_theme_font_size_override("font_size", 22)
	column.add_child(heading)
	var picker := OptionButton.new()
	for n in character_names:
		picker.add_item(n)
	picker.item_selected.connect(_on_character_selected)
	column.add_child(picker)
	var note := Label.new()
	note.text = "ये अभी placeholder रूप हैं। हर PDF संदर्भ का अलग 3D मॉडल GLB आने पर यहाँ लगेगा।"
	note.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	column.add_child(note)
	var start := Button.new()
	start.text = "गेम शुरू करें"
	start.custom_minimum_size.y = 48
	start.pressed.connect(_start_game)
	column.add_child(start)
	var controls := Label.new()
	controls.text = "चलना: WASD / Arrow keys · मोबाइल: नीचे के बटन"
	controls.position = Vector2(24, 90)
	controls.add_theme_color_override("font_color", Color("#f3e4ce"))
	root.add_child(controls)
	_add_touch_button(root, "◀", Vector2(28, -110), "move_left")
	_add_touch_button(root, "▶", Vector2(168, -110), "move_right")
	_add_touch_button(root, "▲", Vector2(98, -180), "move_forward")
	_add_touch_button(root, "▼", Vector2(98, -40), "move_back")

func _add_touch_button(parent: Control, caption: String, offset: Vector2, action: String) -> void:
	var b := Button.new()
	b.text = caption
	b.custom_minimum_size = Vector2(62, 62)
	b.anchor_left = 0.0
	b.anchor_top = 1.0
	b.anchor_right = 0.0
	b.anchor_bottom = 1.0
	b.position = offset
	b.add_theme_font_size_override("font_size", 24)
	b.button_down.connect(func(): Input.action_press(action))
	b.button_up.connect(func(): Input.action_release(action))
	parent.add_child(b)

func _on_character_selected(index: int) -> void:
	selected_character = index
	status_label.text = "चयनित पात्र: " + character_names[index] + " · मॉडल स्लॉट तैयार, वास्तविक GLB प्रतीक्षित"

func _start_game() -> void:
	if started:
		return
	started = true
	start_panel.hide()
	player = CharacterBody3D.new()
	player.set_script(PlayerScript)
	player.name = "PlayerCharacter"
	player.position = Vector3(0, 0.2, 0)
	add_child(player)
	status_label.text = "खेल शुरू! " + character_names[selected_character] + " · चलने के लिए WASD या मोबाइल बटन दबाएँ"
