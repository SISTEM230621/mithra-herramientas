module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      mainProcessFile: 'src/main/background.js',
      mainProcessWatch: [
        'src/main/background.js'
      ],
      outputDir: "mithra-build",

      // appId: "com.mithra.app",
      // productName: "herramientas",
      // directory: {
      //   "output": "build"
      // },
      // nsis: {
      //   "allowToChangeInstallationDirectory": true,
      //   "oneClick": false
      // }
    }
  },
  pages: {
    index: {
      entry: "src/renderer/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "Mithra",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
};
