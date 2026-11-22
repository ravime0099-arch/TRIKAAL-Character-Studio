# TRIKAAL Character Studio

Zero-budget, mobile-first 3D human character creator.

**Website:** https://ravime0099-arch.github.io/TRIKAAL-Character-Studio/

## Current integration
The repository now contains an automated build that self-hosts the open-source Ara 3D Gen character editor under `/editor/` on this same GitHub Pages site. It fetches the CC0 MakeHuman source assets, builds the full app, and publishes the generated static site. No paid hosting or Supabase project is used.

The full builder provides detailed body and face morph controls, skin/hair choices, its available clothes/accessories, rigging, animation and GLB/FBX/OBJ export. Character parameters can be saved and reopened as JSON.

## TRIKAAL-specific Indian features
The requested custom Indian asset pack is a separate modelling/fitting task, not an already-complete feature. It includes:
- Female and male character presets and appearance variations.
- Sari: fabric, colour, border, pallu and pleats; blouse neckline, sleeves, length and fit.
- Lehenga-choli, salwar-kameez, dhoti, kurta, sherwani and Rajputi attire.
- Turban/safa, hairstyles, jewellery, makeup and accessories.
- Fine controls for height, weight, shoulders, chest, waist, hips, arms, legs, thighs, calves, neck, fingers, muscles, face, skin tone/texture and age.

These garments/accessories must be created as compatible 3D assets and fitted to the human rig before they can honestly be called available in the editor. The upstream neutral body does not contain detailed genital anatomy.

## Separation
This repository is independent of Sahitya-gram and the separate TRIKAAL game project.
