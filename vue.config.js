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
        productName: "herramientas",
        publish: ['github'
          // {
          //   "provider": "github",
          //   "owner": "sistem.gpr@gmail.com",
          //   "repo": "https://github.com/SISTEM230621/mithra-herramientas.git",
          //   "token": "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"
          // }
        ],
        // win: {
        //   target: "nsis",
        //   icon: "public/electron.ico",
        // },
        /*  mac: {
           target: "dmg",
           category: "public.app-category.utilities"
         },
         linux: {
           target: "AppImage",
           category: "Utility"
         } */
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
