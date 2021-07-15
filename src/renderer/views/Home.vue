<template>
  <v-container fluid class="">
    <v-row>
      <v-col v-for="n in 1" :key="n" cols="12" sm="6">
        <v-card hover>
          <v-card-title class="text-h6 font-weight-bold error--text">
            Conversor A SADE Mithra
          </v-card-title>
          <v-card-subtitle
            v-text="
              'Convierte tu catalogo de Neodata a SADE totalmente compatible con nuestro sistema de estimaciones.'
            "
          ></v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="primary"
              @click="$router.push({ name: 'ConversorNeodata' })"
              class="ml-2 mt-5"
              outlined
              rounded
              small
            >
              Aplicación
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
};
</script>
