<template>
  <q-layout view="lHr lpR lFr">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <span class="gt-sm"> {{ $route.name }} </span>
          <q-icon
            name="las la-feather-alt"
            size="sm"
            color="primary"
            class="q-pa-md lt-md header-icon"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="283"
    >
      <LeftDrawer />
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      bordered
      :width="350"
      v-if="user"
    >
      <RightDrawer />
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import LeftDrawer from "src/components/LeftDrawer.vue";
import RightDrawer from "src/components/RightDrawer.vue";

import { useUsersStore } from "src/stores/users-store";

import { computed, ref } from "vue";

const usersStore = useUsersStore();
const user = computed(() => usersStore.user);

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style lang="scss">
.header-icon {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
