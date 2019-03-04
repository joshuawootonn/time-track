These instructions are based on [this comment](https://github.com/electron-userland/electron-builder/issues/2577#issuecomment-384690260)

##### Install this clutch package
`sudo apt install icnsutils`
##### Package the icons into a `.icns` with this command (MacOS and Linux)
`png2icns icon.icns 128x128.png 256x256.png 32x32.png 16x16.png`
##### Create an `.ico` on this website (Windows)
Use [this website](https://www.icoconverter.com/) to generate windows ico

Finally, copy the generated `icon.ico` and `icon.icns` into the `./public` dir