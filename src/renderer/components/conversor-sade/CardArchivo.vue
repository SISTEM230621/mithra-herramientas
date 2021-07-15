<template>
  <v-card outlined>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-subtitle-2 mb-1">
          A21 PRESUPUESTO CONTRATO 025.xlsx
        </v-list-item-title>
        <v-list-item-subtitle>27 de Mayo de 1996 </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn color="secondary" text> Descargar </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="error" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CardArchivo",
};
</script>
