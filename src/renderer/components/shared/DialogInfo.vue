<template>
  <div class="text-center">
    <v-dialog width="500" v-model="dialog">
      <v-card>
        <slot name="body-dialog"></slot>

        <v-card-actions>
          <slot name="actions">
            <v-spacer></v-spacer>
            <v-btn color="pantone" text @click="hideDialog"> Aceptar </v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
    hideDialog() {
      this.dialog = false;
    },
  },
};
</script>
