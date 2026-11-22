# Ara 3D Gen integration review

Status: review branch only; the live `main` branch and published site are unchanged.

## Candidate engine

- Upstream: https://github.com/TuriaArt/3d-gen-TU
- Upstream app: https://ara3dgen.com/app/
- Code licence: MIT (retain upstream copyright and licence notice).
- Character data: MakeHuman-derived assets released under CC0 1.0; the upstream setup script downloads and builds these assets locally.
- Runtime: Vite + TypeScript + Three.js; Node.js 20+ required for development/build.
- Asset setup: upstream README documents a one-time download of about 420 MB, producing about 85 MB of generated public assets.
- Export: GLB, FBX, OBJ; game rig and animation support are documented upstream.

## TRIKAAL constraints

- Keep the current TRIKAAL prototype intact.
- Do not merge upstream files into the existing root app until the upstream build and tablet performance have been tested.
- The existing GitHub Pages deployment is a static host. The upstream Vite project must be built with the correct sub-path base before deployment.
- The user's target device is an Android tablet with touch-only input and a strict zero-rupee budget. Test low-detail first; do not assume the desktop build is smooth on tablet.
- The upstream clothing list is not a complete Indian wardrobe. Indian garments and fitting need a separate asset/modeling phase.

## Integration sequence

1. Test the upstream hosted editor on the target tablet.
2. Prepare an isolated upstream source copy/build; preserve the upstream MIT and CC0 notices.
3. Run type-check, build and GLB export validation.
4. Deploy the built app under a separate path (for example `/ara/`) on a test branch/site, not over the current prototype.
5. Test touch controls, memory use, load time, save/export and Godot import.
6. Only after those tests, connect TRIKAAL branding/navigation and start Indian garment work.

## Current decision

Ara is the best current candidate for the realistic human base, morph controls, rigging and export pipeline. It is not yet integrated into TRIKAAL. No claim is made that the external hosted editor is our own integrated app.
