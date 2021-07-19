<template>
  <v-container fluid class="">
    <v-row>
      <v-col cols="12" sm="6" v-for="(m, i) in menu" :key="i">
        <card-herramienta :menu="m"></card-herramienta>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import menu from "@/renderer/mixins/menu.js";
import CardHerramienta from "@/renderer/components/shared/CardHerramienta.vue";
export default {
  mixins: [menu],
  components: {
    CardHerramienta,
  },
  name: "Home",
};
</script>
