<template>
  <v-card max-width="344" outlined>
    <div class="d-flex">
      <div class="flex-grow-0">
        <v-avatar class="ma-3" size="60" tile>
          <v-img src="@/renderer/assets/icons/excel.png"></v-img>
        </v-avatar>
      </div>
      <div class="flex-grow-1">
        <v-card-title class="text-body-2" v-text="file.name"></v-card-title>
        <v-card-subtitle
          :class="{
            'error--text': file.status == 'ERROR',
            'success--text': file.status == 'FINISH',
          }"
          >{{ file.message }}</v-card-subtitle
        >
      </div>
    </div>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        text
        color="error"
        @click="$emit('remove', i)"
        :loading="file.status == 'PROCCESS'"
        :disabled="file.status == 'PROCCESS'"
      >
        Eliminar
      </v-btn>
      <v-btn
        v-if="file.status != 'FINISH'"
        outlined
        text
        color="primary"
        @click="$emit('convertir', file)"
        :loading="file.status == 'PROCCESS'"
        :disabled="file.status == 'PROCCESS'"
      >
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
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
    i: {
      type: Number,
      required: true,
    },
  },
};
</script>