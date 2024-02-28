<script setup lang="ts">
console.log('main');
</script>

<template>
  <v-container fluid fill-height class="ma-0 pa-6">
    <v-row>
      <v-col cols="4" style="border: 1px solid red;">
        column
      </v-col>
      <v-col cols="8" style="border: 1px solid green;">
        <v-row style="border: 1px solid orange;">row1</v-row>
        <v-row style="border: 1px solid orchid;">row2</v-row>
      </v-col>
    </v-row>
  </v-container>
  <div class="dashboard-wrapper">

  </div>
</template>
<style scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
  border: 1px solid red;

}
</style>
