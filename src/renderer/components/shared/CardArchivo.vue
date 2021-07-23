<template>
  <v-card outlined class="mb-2">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-subtitle-2 mb-1">
          {{ file.name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ file.size + " KB " }} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="info" icon @click="saveAs">
        <v-icon>mdi-content-save-move</v-icon>
      </v-btn>
      <v-btn color="success" icon @click="openFile">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      <v-btn color="error" icon @click="deleteFile">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CardArchivo",
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  methods: {
    saveAs() {
      window.ipcRenderer.send("app:on-file-move", {
        filename: this.file.name,
        path: this.file.path,
      });

      
    },
    deleteFile() {
      window.ipcRenderer.send("app:on-file-delete", {
        filename: this.file.name,
        path: this.file.path,
      });

      this.$emit("delete", this.file.name);
    },
    openFile() {
      window.ipcRenderer.send("app:on-file-open", {
        filename: this.file.name,
        path: this.file.path,
      });
    },
  },
};
</script>
