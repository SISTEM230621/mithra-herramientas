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
      builderOptions: {
        appId: "com.mithra.app",
        productName: "Mithra herramientas",
        publish: ['github'],
        win: {
          target: "nsis",
        },
        linux: {
          target: "deb",
          category: "Utility"
        },
        mac: {
          target: "dmg",
          category: "public.app-category.utilities",
        },

      }


    }
  },
  pages: {
    index: {
      entry: "src/renderer/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "Mithra herramientas",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
};
