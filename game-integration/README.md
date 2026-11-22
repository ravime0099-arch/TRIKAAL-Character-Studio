# TRIKAAL game handoff

This folder defines the handoff contract between the Character Studio and the Godot game.

- `character-roster.json` indexes the 23 PDF reference pages and the distinct figures visible in group images.
- The entries are **reference descriptions, not finished 3D models**.
- The game should only mark a character playable after a real humanoid GLB has been imported, rig-checked, and tested in a scene.
- Keep one stable ID per figure; do not collapse different figures into color variants of one preset.
- Use clothed, non-explicit designs suitable for the game.

## Godot import target

Place validated files under `res://characters/<character-id>/` and keep a matching `character.json` containing the roster ID, GLB filename, thumbnail, rig type, and animation set. A character is ready only when it can idle, walk, turn, and play the game interaction animations without mesh/skin deformation errors.

## Current limitation

The connected GitHub repository is the Character Studio repository, not the separate Godot game repository. This commit prepares the data contract only; it does not install GLB assets into the game or claim the game is playable yet.
