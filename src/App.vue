<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <v-layout class="rounded">
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Sandra Adams"
          subtitle="sandra_a88@gmailcom"></v-list-item>
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
