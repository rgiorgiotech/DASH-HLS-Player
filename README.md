# DASH & HLS Player
A simple Electron DASH-HLS player

## How it works
The project consists of a simple app created with the Electron framework, which uses the Shaka Player libraries for the playback of HLS and DASH streams. The app allows users to enter URLs or the direct path to the media file if it is intended to be placed in the root of the project. The app also supports ClearKeys (keyId and keyValue) for DRM content.

## App structure
It is possible to categorize streams (for example, to group TV channels by genre). In the `streams.json` file, you can specify the category (e.g., 'cat1'); in the `renderer.js` file, you then assign the full name to that category (e.g., 'cat1': 'Category 1'). The full name will then appear in the app's interface.

## DRM
Using the Shaka Player libraries, the app also supports the input of ClearKeys for the decryption of DRM content (the keys must be legally possessed). If the stream is not protected by DRM, you can leave the 'keyId' and 'keyValue' fields in the `streams.json` file empty.

## Customization
You can customize the app's interface by editing the `index.html` file. Additionally, by integrating URLs into the `index.html` file or adding the necessary files to the root of the project, you can also change the player used for playback (for example, to Clapper Player) if you do not wish to use the default HTML5 player.

## Compiling the app & Compatibility
You can compile the app as you prefer, for example, using npm commands. In the `package.json` file, I have included specifications for compiling on macOS and Windows, but you have full freedom to modify the code according to your needs. As an Electron-based app, it has support for macOS, Windows, and Linux.
