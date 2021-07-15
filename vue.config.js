module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      mainProcessFile: 'src/main/background.js',
      mainProcessWatch: [
        'src/main/background.js'
      ],
      chainWebpackMainProcess: (config) => {
        // Chain webpack config for electron main process only
      },
      appId: "com.mithra.app",
      productName: "herramientas",
      target: "NSIS",
      directory: {
        "output": "build"
      },
      nsis: {
        "allowToChangeInstallationDirectory": true,
        "oneClick": false
      }
    }
  },
  pages: {
    index: {
      entry: "src/renderer/main.js",
      template: "public/index.html",
      filename: "index.html",
      // When using the page title option,
      // The title tag in the template needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Mithra",
      // The blocks included in this page will be included by default
      // The extracted generic chunk and vendor chunk.
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
};
