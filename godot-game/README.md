# TRIKAAL — The Royal Beginning

Godot 4 project foundation for Android and desktop, using the Compatibility renderer.

## Open
Import this folder (the one containing `project.godot`) in Godot 4.7.2.

## Included now
- A 3D stage, lighting, camera, and ground collision.
- Character picker linked to all 31 individual IDs from the 23-page visual reference roster.
- Player movement with keyboard and on-screen touch controls.
- Runtime GLB loader: place a validated humanoid model at `characters/<roster-id>/character.glb`; the matching slot loads it automatically.
- Safe placeholder fallback while a real GLB is not present.
- Story data structure in `data/story.json` that deliberately preserves blank canonical story slots instead of inventing plot or dialogue.

## Important status
This is a playable foundation, not a finished commercial game or verified public web build. The 31 character slots are references, not completed 3D models. The original story/scene text is not present in this repository, so the story file is a non-destructive import structure. Real character GLBs, animation sets, authored levels, audio, quest logic, testing, and platform exports remain to be completed.

## Model handoff
Use `../game-integration/character-roster.json` as the source ID list. Each completed character must be a clothed, game-ready humanoid GLB with tested skeleton and animation compatibility.
