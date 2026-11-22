# TRIKAAL Character Studio

A zero-budget, mobile-first character creator hosted on GitHub Pages.

## Website
https://ravime0099-arch.github.io/TRIKAAL-Character-Studio/

## Build architecture
- The public site is built from the open-source Ara 3D Gen project (MIT).
- Human base data and system assets are fetched by the upstream setup process from MakeHuman Community (CC0).
- The full builder is published under `/editor/`; this is not the old embedded preview.
- The deployment workflow builds the upstream source and publishes its static output to the repository's Pages branch source.

## Build requirements
Node.js 20+ (the upstream project currently uses modern Vite/TypeScript), pnpm, and internet access for the one-time CC0 asset download. GitHub Actions performs this build; no paid hosting or Supabase project is required.

## Current scope and honest limitations
The upstream editor supplies detailed human body/face morph controls, skin/hair options, clothing/accessories available in its catalogue, rigging, animation, and GLB/FBX/OBJ export. Character settings can be saved/opened as JSON.

TRIKAAL-specific Indian 3D assets are a separate asset-development task. The requested sari and blouse construction controls, lehenga-choli, salwar-kameez, dhoti, kurta, sherwani, Rajputi garments, turbans/safa, Indian jewellery and makeup are not made available merely by listing them; each garment/accessory needs a compatible 3D asset, fitting, materials and validation. The upstream neutral base does not include detailed genital anatomy.

This repository is independent of Sahitya-gram and the separate TRIKAAL game project.
