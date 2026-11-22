# TRIKAAL — The Royal Beginning (Godot starter)

This is a separate Godot 4 project folder inside the TRIKAAL Character Studio repository. It does not overwrite the Character Studio or HumanVerse.

## Open on Android
1. Download this repository ZIP from GitHub.
2. Extract it on the tablet.
3. In Godot 4.7.2 Android Editor, import the folder `godot-game` (the folder containing `project.godot`).
4. Open and run the project.

## Current playable foundation
- A small 3D stage and camera.
- Character selection UI.
- A placeholder player that moves with WASD/arrow keys or on-screen touch controls.
- Compatibility renderer for Android.

## Character asset integration
Copy each validated humanoid GLB into `characters/<roster-id>/character.glb`, then instance it from the player scene after checking its skeleton and animation names. The source-page roster is in `../game-integration/character-roster.json`.

## Honest status
This is a starter gameplay scene, not the finished full game. The six choices are placeholder slots; the PDF-specific 3D characters, animations, story, levels, audio, and final game loop still need implementation. No existing local Godot project is deleted or modified by this repository commit.
