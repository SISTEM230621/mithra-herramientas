<template>
  <div>
    <v-sheet id="drawer" color="white" elevation="1">
      <v-list disabled>
        <v-list-item>
          <v-list-item-title class="text-h6 text-center">
            Archivos
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-col>
        <card-archivo></card-archivo>
      </v-col>
    </v-sheet>
    <div id="page-content">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <div
              id="uploader"
              @click="selectFile"
              :class="{
                uploader: true,
                'drop-zone--over': overDropzone,
              }"
            >
              <span>Selecciona o arrastra un archivo</span>
              <input
                ref="select_file"
                accept=".xlsx, .xls"
                multiple
                type="file"
                class="drop-zone__input"
                @change="onFileSelect"
              />
            </div>
          </v-col>

          <v-col cols="6" v-for="(file, i) in files_selected" :key="i">
            <v-card max-width="344" outlined>
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-avatar class="ma-3" size="60" tile>
                  <v-img src="@/renderer/assets/icons/excel.png"></v-img>
                </v-avatar>
                <v-card-title
                  class="text-body-2"
                  v-text="file.name"
                ></v-card-title>
              </div>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outlined text color="error" @click="removeFile(i)">
                  Eliminar
                </v-btn>
                <v-btn outlined text color="primary" @click="convertir(file)">
                  Convertir
                </v-btn>
              </v-card-actions>

              <v-overlay
                :absolute="true"
                opacity="0.1"
                :value="file.status == 'PROCCESS'"
              >
                <v-progress-circular
                  indeterminate
                  color="error"
                  size="30"
                ></v-progress-circular>
              </v-overlay>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <dialog-info ref="dialog_info">
      <template v-slot:body-dialog>
        <v-card-title class="text-h6 grey lighten-2">
          Algunos archivos fueron omitidos
        </v-card-title>

        <v-list class="transparent">
          <v-list-item v-for="(file, i) in no_accepts" :key="i">
            <v-list-item-title>{{ file.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </dialog-info>
  </div>
</template>

<script>
import DialogInfo from "@/renderer/components/shared/DialogInfo.vue";
import CardArchivo from "@/renderer/components/conversor-sade/CardArchivo.vue";
const dragDrop = require("drag-drop");

export default {
  components: {
    CardArchivo,
    DialogInfo,
  },
  data: () => ({
    loading: false,
    overDropzone: false,
    files_selected: [],
    acceptFiles: ["xlsx", "xls"],
    no_accepts: [],
    status: {
      start: "START",
      inProccess: "PROCCESS",
      error: "ERROR",
      finish: "FINISH",
    },
  }),

  mounted() {
    dragDrop("#uploader", {
      onDrop: (files) => {
        this.addFiles(files);
      },
      onDragOver: () => {
        this.overDropzone = true;
      },
      onDragLeave: () => {
        this.overDropzone = false;
      },
    });
  },
  methods: {
    addFiles(files) {
      const _files = files.map((file) => {
        const type = file.name.split(".").pop();
        return {
          name: file.name,
          path: file.path,
          type,
          status: this.status.start,
        };
      });

      _files.filter((file) => {
        if (this.acceptFiles.includes(file.type)) {
          this.files_selected.push(file);
        }
      });

      this.no_accepts = _files.filter(
        (file) => !this.acceptFiles.includes(file.type)
      );

      if (this.no_accepts.length > 0) this.$refs.dialog_info.showDialog();
    },
    selectFile() {
      this.$refs.select_file.click();
    },
    onFileSelect(event) {
      const filesList = event.target.files;
      const files = Array.from(filesList);
      this.addFiles(files);
    },
    removeFile(i) {
      this.files_selected.splice(i, 1);
    },
    convertir(file) {
      file.status = this.status.inProccess;
      // window.ipcRenderer.invoke("app:on-fs-dialog-open").then(() => {
      //   console.log("Se eligio un dato");
      //   // ipcRenderer.invoke("app:get-files").then((files = []) => {
      //   //   dom.displayFiles(files);
      //   // });
      // });
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.uploader {
  // padding: 25px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  color: #cccccc;
  border: 3px dashed #0b3954;
  border-radius: 10px;
}

.drop-zone--over {
  border-style: solid;
}

.drop-zone__input {
  display: none;
}

#drawer {
  position: fixed;
  width: 300px;
  height: 100%;
  top: 50;
  right: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

#page-content {
  margin-right: 300px;
  margin-left: 0;
  width: calc(100% - 300px);
  height: calc(100% - 50px);
  -webkit-overflow-scrolling: touch;
}
</style>
