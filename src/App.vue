<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';

const rail = ref<boolean>(true);
const drawer = ref<boolean>(true);
</script>

<template>
  <v-layout class="rounded">
    <v-navigation-drawer permanent :rail="rail" v-model="drawer" @click="rail = false">
      <v-list>
        <v-list-item prepend-avatar=" " title="Sandra Adams" subtitle="sandra_a88@gmailcom">
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <RouterLink to="/">
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles">
            Home
          </v-list-item>
        </RouterLink>
        <RouterLink to="/about">
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared">
            About
          </v-list-item>
        </RouterLink>
        <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
