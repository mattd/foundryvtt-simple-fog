# Simplefog
A module for [FoundryVTT](https://foundryvtt.com) that lets you draw fog of war manually.

## Installation
Install manually via the module's [manifest URL](https://raw.githubusercontent.com/mattd/foundryvtt-simplefog/main/module/module.json):
```
https://raw.githubusercontent.com/mattd/foundryvtt-simplefog/main/module/module.json
```

## Features
- Simplefog implements a manual fog of war layer above the core vision layer
  - Enable and disable the simplefog layer at any time, per scene
  - This allows you to use both Simplefog AND the core vision for line of sight, or alternatively use only one or the other, on a scene by scene basis
- Tokens can be automatically hidden and revealed when underneath Simplefog with a configurable opacity threshold
- Implements a history system so you can easily undo your actions
- Various drawing tools for drawing and erasing fog of war manually
  - Brush tool
    - Hotkeys for quickly changing brush size [ ]
  - Rectangle & Ellipse tool
    - Hold shift to force equal width & height while drawing
  - Polygon Shape tool
    - Click the orange handle to finish your drawing, or right click to cancel
  - Grid tool
    - Reveals any grid square you drag across, works for both Hex and Square grids
- Add an image to the Simplefog layer which overlays the selected tint for both GMs and Players.

![Tools Palette](docs/simplefog-tools.jpg?raw=true "Tools Palette")

## Scene Configuration
Allows you to set various options which affect the entire layer for the current scene
- Set an image overlay for the fog on both player and GM screens.
- Set the opacity of the entire fog layer for both players and GMs
- Animate transitions in opacity, allowing for effects such as "Fade to Black"
- Change tint of the fog for both player and GM, for example to indicate a green poison cloud
- Apply a blur filter for soft edges to fog
- Enable or disable the automatic vision feature
- Save your settings as the new default when creating a scene

![Scene Configuration Screenshot](docs/simplefog-options.png?raw=true "Scene Config")

## License
This package is under an [MIT license](LICENSE) and the [Foundry Virtual Tabletop Limited License Agreement for module development](https://foundryvtt.com/article/license/).

## Credit
This is a _private use_ fork of SimpleFog, originally created by Vance and maintained by League of Foundry Developers. This version of Simplefog is a repackaged version of the League's fork for personal use by me, Matt Dawson. Packaging has been simplified in this for to make maintenance easier over the long term. But that said: rely upon this version at your own risk.
