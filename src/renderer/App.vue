<template>
  <v-app>
    <v-app-bar app dense color="primary" dark clipped-right flat height="50">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary left>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { ipcRenderer } from "electron";
window.ipcRenderer = ipcRenderer;

export default {
  name: "App",
  data: () => ({
    title: "",
    drawer: null,
  }),
  watch: {
    "$route.meta": {
      handler: function (meta) {
        const title =
          meta.title === undefined ? "Herramientas Mithra" : meta.title;
        this.title = title;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
