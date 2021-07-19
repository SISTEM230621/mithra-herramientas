<template>
  <v-app>
    <v-app-bar app dense color="primary" dark clipped-right flat height="50">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary left>
      <v-list-item>
        <v-list-item-content class="pa-5">
          <v-list-item-title
            link
            class="link-m text-h6 text-center"
            @click="home"
          >
            MITHRA
          </v-list-item-title>
          <v-list-item-subtitle class="text-center">
            Herramientas
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(m, i) in menu"
            :key="i"
            link
            @click="$router.push({ name: m.name_route }).catch(() => {})"
          >
            <v-list-item-icon>
              <v-icon>{{ m.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ m.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import menu from "@/renderer/mixins/menu.js";

import { ipcRenderer } from "electron";
window.ipcRenderer = ipcRenderer;

export default {
  name: "App",
  mixins: [menu],
  data: () => ({
    title: "",
    selectedItem: -1,
    drawer: null,
  }),
  methods: {
    home() {
      this.$router.push({ name: "Home" }).catch((err) => {
        // console.log(err);
      });
    },
  },
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

<style lang="css" scoped>
.link-m {
  cursor: pointer;
}
</style>