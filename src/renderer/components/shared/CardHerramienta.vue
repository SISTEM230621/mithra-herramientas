<template>
  <v-card hover>
    <v-card-title class="text-h6 font-weight-bold error--text">
      {{ menu.title }}
    </v-card-title>
    <v-card-subtitle>{{ menu.description }}</v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="primary"
        @click="ir"
        class="ml-2 mt-5"
        outlined
        rounded
        small
      >
        Aplicación
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ir() {
      this.$router.push({ name: this.menu.name_route }).catch((err) => {
        // console.log(err);
      });
    },
  },
};
</script>