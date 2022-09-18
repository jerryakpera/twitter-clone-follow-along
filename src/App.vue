<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import { auth } from "src/boot/firebase";

import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "./stores/users-store";

const router = useRouter();
const usersStore = useUsersStore();

const handleFetchUser = async () => {
  try {
    auth.onAuthStateChanged(async (user) => {
      if (user === null) {
        usersStore.user = null;
      } else {
        usersStore.user = user;

        if (router.isReady() && router.currentRoute.value.path === "/login") {
          router.push("/");
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

onBeforeMount(async () => {
  await handleFetchUser();
});
</script>
