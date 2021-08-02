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
          icon: "src/icons/win/icon.ico",
        },
        linux: {
          target: "deb",
          icon: "src/icons/png/1024x1024.png",
          category: "Utility"
        },
        mac: {
          target: "dmg",
          category: "public.app-category.utilities",
          icon: "src/icons/mac/icon.icns"
        },

      }


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
