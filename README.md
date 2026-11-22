# TRIKAAL Character Studio

Zero-budget, mobile-first Indian 3D character studio.

Website: https://ravime0099-arch.github.io/TRIKAAL-Character-Studio/

## Current foundation
The /editor/ build uses the open-source Ara 3D Gen human mesh editor as its underlying engine, self-hosted on this TRIKAAL GitHub Pages site. The editor shell is being rebranded as TRIKAAL. The base engine provides human body/face morphs, materials, available garments, rigging, animation and model export. It is not yet a fully custom Indian character system.

## TRIKAAL Indian development scope
The project will progressively add real, rig-compatible Indian assets and controls:
- Face and appearance presets reflecting India's regional diversity, with detailed controls for eyes, brows, nose, lips, jaw, cheeks, forehead, ears, skin tone and hair.
- Fine body proportions: height, shoulders, chest, waist, abdomen, hips, arms, hands, fingers, thighs, knees, calves and feet.
- Saree construction and drape, blouse neckline/sleeves/fit, lehenga-choli, salwar-kameez, dhoti, kurta, sherwani and regional/Rajputi clothing.
- Turban/safa, hairstyles, bindi, nath, earrings, necklaces, bangles, bajuband, kamarband, anklets and makeup.
- Multiple named character saves and editable project files; GLB export for game engines.

These features require actual 3D meshes, textures/materials, rig fitting and tested controls. Listing a garment in the roadmap does not mean its 3D asset already exists. The upstream neutral human base does not include detailed genital anatomy.

## Build
GitHub Actions clones the upstream open-source editor, downloads its CC0 MakeHuman assets, builds it, applies the TRIKAAL editor branding, and publishes the static output. No paid service or Supabase project is used.

This repository is independent of Sahitya-gram and the separate TRIKAAL game project.
