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
          <v-list-item prepend-icon="mdi-view-dashboard-edit-outline" title="Dashboard" value="dashboard">
            Dashboard
          </v-list-item>
        </RouterLink>
        <RouterLink to="/contacts">
          <v-list-item prepend-icon="mdi-contacts" title="Contacts" value="contacts">
            Contacts
          </v-list-item>
        </RouterLink>
        <RouterLink to="/notes">
          <v-list-item prepend-icon="mdi-note-edit" title="Notes" value="notes">
            Notes
          </v-list-item>
        </RouterLink>
        <RouterLink to="/reminder">
          <v-list-item prepend-icon="mdi-alarm-light" title="Reminder" value="reminder">
            Reminder
          </v-list-item>
        </RouterLink>
        <RouterLink to="/expenses">
          <v-list-item prepend-icon="mdi-cash" title="Expenses" value="expenses">
            Expenses
          </v-list-item>
        </RouterLink>
        <RouterLink to="/tasks">
          <v-list-item prepend-icon="mdi-calendar-check" title="Tasks" value="tasks">
            Tasks
          </v-list-item>
        </RouterLink>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped>
a {
  text-decoration: none;
  color: rgb(47, 121, 233);
  transition: 0.4s;
}
</style>
