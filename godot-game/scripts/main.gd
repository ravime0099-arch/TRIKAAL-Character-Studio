extends Node3D

const PlayerScript = preload("res://scripts/player.gd")
const SAVE_PATH := "user://trikaal_progress.cfg"
const RELIC_POSITIONS := [Vector3(-7, 0.8, -5), Vector3(6, 0.8, -8), Vector3(9, 0.8, 7)]

var player: CharacterBody3D
var follow_camera: Camera3D
var started := false
var paused := false
var selected_character := 0
var collected := 0
var relics: Array[Node3D] = []
var title_label: Label
var status_label: Label
var objective_label: Label
var prompt_label: Label
var start_panel: PanelContainer
var pause_panel: PanelContainer
var character_ids := ["ref-p01","ref-p02","ref-p03","ref-p04","ref-p05","ref-p06","ref-p07","ref-p08","ref-p09","ref-p10","ref-p11-a","ref-p11-b","ref-p12","ref-p13","ref-p14-a","ref-p14-b","ref-p14-c","ref-p15-a","ref-p15-b","ref-p15-c","ref-p16","ref-p17","ref-p18","ref-p19-a","ref-p19-b","ref-p20","ref-p21","ref-p22-a","ref-p22-b","ref-p22-c","ref-p23"]
var character_names := ["हल्दी-पीली साड़ी","मैरून राजसी लहँगा","बैंगनी पारंपरिक ड्रेप","आइवरी-सुनहरा लहँगा","रजत संध्या","आइवरी-सिल्वर लुक","सिल्वर-ग्रे ब्राइडल","सिल्वर-ग्रे पारंपरिक","मैरून-सुनहरा लहँगा","सिल्वर कढ़ाईदार लुक","क्रीम धोती-अंगवस्त्रम","मैरून-सुनहरा महिला लुक","पन्ना-हरा राजसी लहँगा","गहरा हरा-सुनहरा परिधान","मैरून पारंपरिक महिला","मैरून धोती परिधान","नीला पारंपरिक सेट","मैरून-सुनहरा महिला लुक 2","मैरून पुरुष परिधान","नीला महिला परिधान","आइवरी-सिल्वर संध्या","सिल्वर साड़ी-प्रेरित ड्रेप","मरून साड़ी","सिल्वर महिला लुक","क्रीम कुर्ता-शॉल","केसरिया-सुनहरा लहँगा","सिल्वर-ग्रे ड्रेप","मैरून-सुनहरा महिला लुक 3","मैरून पुरुष धोती 2","नीला महिला लुक 2","नीला-सुनहरा साड़ी"]

func _ready() -> void:
	_build_world()
	_build_ui()

func _process(delta: float) -> void:
	if started and is_instance_valid(player) and is_instance_valid(follow_camera):
		var target := player.global_position + Vector3(0, 5.2, 8.0)
		follow_camera.global_position = follow_camera.global_position.lerp(target, min(1.0, delta * 4.0))
		follow_camera.look_at(player.global_position + Vector3(0, 1.0, 0), Vector3.UP)
		_update_interaction_prompt()

func _unhandled_input(event: InputEvent) -> void:
	if not started:
		return
	if event.is_action_pressed("pause_game"):
		_toggle_pause()
	elif event.is_action_pressed("interact") and not paused:
		_collect_nearest_relic()

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
	follow_camera = Camera3D.new()
	follow_camera.position = Vector3(0, 5.2, 8.0)
	follow_camera.rotation_degrees = Vector3(-26, 0, 0)
	follow_camera.current = true
	add_child(follow_camera)
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
	root.process_mode = Node.PROCESS_MODE_ALWAYS
	layer.add_child(root)
	title_label = Label.new()
	title_label.text = "TRIKAAL — THE ROYAL BEGINNING"
	title_label.add_theme_font_size_override("font_size", 25)
	title_label.add_theme_color_override("font_color", Color("#f0cf91"))
	title_label.position = Vector2(22, 14)
	root.add_child(title_label)
	status_label = Label.new()
	status_label.text = "अपना पात्र चुनें और अभ्यास क्षेत्र में प्रवेश करें"
	status_label.add_theme_font_size_override("font_size", 14)
	status_label.position = Vector2(22, 52)
	status_label.add_theme_color_override("font_color", Color("#e1d4c8"))
	root.add_child(status_label)
	objective_label = Label.new()
	objective_label.text = "उद्देश्य: 3 अभ्यास-चिह्न खोजें"
	objective_label.add_theme_font_size_override("font_size", 18)
	objective_label.position = Vector2(22, 82)
	objective_label.add_theme_color_override("font_color", Color("#f0cf91"))
	root.add_child(objective_label)
	prompt_label = Label.new()
	prompt_label.text = ""
	prompt_label.add_theme_font_size_override("font_size", 18)
	prompt_label.position = Vector2(22, 116)
	prompt_label.add_theme_color_override("font_color", Color("#ffffff"))
	root.add_child(prompt_label)
	start_panel = PanelContainer.new()
	start_panel.position = Vector2(24, 158)
	start_panel.custom_minimum_size = Vector2(340, 300)
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
	note.text = "31 roster स्लॉट उपलब्ध हैं। असली GLB मॉडल न होने पर परीक्षण-पात्र दिखेगा।"
	note.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	column.add_child(note)
	var start := Button.new()
	start.text = "गेम शुरू करें"
	start.custom_minimum_size.y = 48
	start.pressed.connect(_start_game)
	column.add_child(start)
	pause_panel = PanelContainer.new()
	pause_panel.position = Vector2(0, 0.5)
	pause_panel.set_anchors_preset(Control.PRESET_CENTER)
	pause_panel.custom_minimum_size = Vector2(260, 150)
	pause_panel.hide()
	root.add_child(pause_panel)
	var pause_column := VBoxContainer.new()
	pause_panel.add_child(pause_column)
	var pause_title := Label.new()
	pause_title.text = "गेम रुका हुआ है"
	pause_title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	pause_column.add_child(pause_title)
	var resume := Button.new()
	resume.text = "जारी रखें"
	resume.pressed.connect(_toggle_pause)
	pause_column.add_child(resume)
	var save_button := Button.new()
	save_button.text = "प्रगति सेव करें"
	save_button.pressed.connect(_save_progress)
	pause_column.add_child(save_button)
	var quit_button := Button.new()
	quit_button.text = "मुख्य मेन्यू"
	quit_button.pressed.connect(_return_to_menu)
	pause_column.add_child(quit_button)
	var controls := Label.new()
	controls.text = "चलना: WASD / Arrow keys · मोबाइल: नीचे के बटन · पास जाकर INTERACT दबाएँ"
	controls.position = Vector2(22, 126)
	controls.add_theme_color_override("font_color", Color("#f3e4ce"))
	root.add_child(controls)
	_add_touch_button(root, "◀", Vector2(24, -112), "move_left")
	_add_touch_button(root, "▶", Vector2(164, -112), "move_right")
	_add_touch_button(root, "▲", Vector2(94, -182), "move_forward")
	_add_touch_button(root, "▼", Vector2(94, -42), "move_back")
	var interact_button := Button.new()
	interact_button.text = "INTERACT"
	interact_button.custom_minimum_size = Vector2(112, 58)
	interact_button.anchor_left = 1.0
	interact_button.anchor_top = 1.0
	interact_button.anchor_right = 1.0
	interact_button.anchor_bottom = 1.0
	interact_button.position = Vector2(-142, -96)
	interact_button.pressed.connect(_collect_nearest_relic)
	root.add_child(interact_button)
	var pause_button := Button.new()
	pause_button.text = "Ⅱ"
	pause_button.custom_minimum_size = Vector2(54, 54)
	pause_button.anchor_left = 1.0
	pause_button.anchor_right = 1.0
	pause_button.position = Vector2(-76, 18)
	pause_button.pressed.connect(_toggle_pause)
	root.add_child(pause_button)

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
	status_label.text = "चयनित: " + character_names[index] + " · " + character_ids[index]

func _start_game() -> void:
	if started:
		return
	started = true
	start_panel.hide()
	player = CharacterBody3D.new()
	player.set_script(PlayerScript)
	player.set("character_id", character_ids[selected_character])
	player.name = "PlayerCharacter"
	player.position = Vector3(0, 0.2, 0)
	add_child(player)
	_spawn_relics()
	_load_progress()
	status_label.text = "अभ्यास क्षेत्र में आपका स्वागत है · " + character_names[selected_character]
	_update_objective()

func _spawn_relics() -> void:
	for i in range(RELIC_POSITIONS.size()):
		var relic := Node3D.new()
		relic.name = "PracticeMark" + str(i + 1)
		relic.position = RELIC_POSITIONS[i]
		var mesh_instance := MeshInstance3D.new()
		var mesh := SphereMesh.new()
		mesh.radius = 0.48
		mesh.height = 0.96
		mesh_instance.mesh = mesh
		var material := StandardMaterial3D.new()
		material.albedo_color = Color("#f0cf91")
		material.emission_enabled = true
		material.emission = Color("#c88b35")
		material.emission_energy_multiplier = 1.4
		mesh_instance.material_override = material
		relic.add_child(mesh_instance)
		var light := OmniLight3D.new()
		light.light_color = Color("#f0cf91")
		light.light_energy = 0.7
		light.omni_range = 3.0
		relic.add_child(light)
		add_child(relic)
		relics.append(relic)

func _nearest_relic() -> Node3D:
	if not is_instance_valid(player):
		return null
	var nearest: Node3D = null
	var nearest_distance := 2.6
	for relic in relics:
		if is_instance_valid(relic):
			var distance := player.global_position.distance_to(relic.global_position)
			if distance < nearest_distance:
				nearest_distance = distance
				nearest = relic
	return nearest

func _update_interaction_prompt() -> void:
	var target := _nearest_relic()
	if target:
		prompt_label.text = "अभ्यास-चिह्न मिला — INTERACT दबाएँ"
	else:
		prompt_label.text = ""

func _collect_nearest_relic() -> void:
	if paused:
		return
	var target := _nearest_relic()
	if target == null:
		return
	relics.erase(target)
	target.queue_free()
	collected += 1
	_update_objective()
	_save_progress()

func _update_objective() -> void:
	objective_label.text = "उद्देश्य: अभ्यास-चिह्न " + str(collected) + "/3"
	if collected >= 3:
		objective_label.text = "अभ्यास पूरा! तीनों चिह्न मिल गए। प्रगति सेव है।"

func _toggle_pause() -> void:
	if not started:
		return
	paused = not paused
	get_tree().paused = paused
	if paused:
		pause_panel.show()
	else:
		pause_panel.hide()

func _save_progress() -> void:
	var config := ConfigFile.new()
	config.set_value("progress", "collected", collected)
	config.set_value("progress", "character_id", character_ids[selected_character])
	config.save(SAVE_PATH)
	status_label.text = "प्रगति डिवाइस पर सेव हो गई"

func _load_progress() -> void:
	var config := ConfigFile.new()
	if config.load(SAVE_PATH) == OK:
		collected = clampi(int(config.get_value("progress", "collected", 0)), 0, 3)
		for i in range(relics.size() - 1, -1, -1):
			if i < collected:
				relics[i].queue_free()
				relics.remove_at(i)
	_update_objective()

func _return_to_menu() -> void:
	get_tree().paused = false
	get_tree().reload_current_scene()
