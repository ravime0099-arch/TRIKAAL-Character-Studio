# Ara build test

A GitHub Actions workflow is configured on the isolated `integration/ara-engine-review` branch.

It checks out the Ara source into a temporary Actions workspace, installs dependencies, downloads/builds the CC0 MakeHuman assets, and builds the static app with the TRIKAAL Pages sub-path:

`/TRIKAAL-Character-Studio/ara/`

The built files are uploaded as a short-lived Actions artifact for inspection. This deliberately does **not** deploy to GitHub Pages or alter the live `main` branch. The large upstream source and generated assets are not committed into the TRIKAAL repository.

Workflow: `.github/workflows/ara-engine-build.yml`
