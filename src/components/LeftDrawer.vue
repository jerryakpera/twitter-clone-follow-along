<template>
  <div>
    <q-icon
      name="las la-feather-alt"
      size="lg"
      color="primary"
      class="q-pa-md"
    />
    <q-list>
      <q-item
        v-for="item in links"
        :key="item.text"
        clickable
        v-ripple
        :to="item.url"
        exact
      >
        <q-item-section avatar>
          <q-icon :name="item.icon" size="md" />
        </q-item-section>

        <q-item-section class="text-body1 text-weight-bold">
          {{ item.text }}
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple exact to="/login" v-if="!usersStore.user">
        <q-item-section avatar>
          <q-icon name="las la-sign-in-alt" size="md" />
        </q-item-section>

        <q-item-section class="text-body1 text-weight-bold">
          Sign in
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple exact @click="logout" v-if="usersStore.user">
        <q-item-section avatar>
          <q-icon name="las la-sign-out-alt" size="md" />
        </q-item-section>

        <q-item-section class="text-body1 text-weight-bold">
          Sign out
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { auth } from "src/boot/firebase";
import { signOut } from "@firebase/auth";
import { useUsersStore } from "src/stores/users-store";
import { useQweetsStore } from "src/stores/qweets-store";

const router = useRouter();
const usersStore = useUsersStore();
const qweetsStore = useQweetsStore();

const links = [
  {
    text: "Home",
    icon: "las la-home",
    url: "/",
  },
  {
    text: "About",
    icon: "las la-info",
    url: "/about",
  },
];

const logout = async () => {
  try {
    await signOut(auth);

    usersStore.user = null;
    qweetsStore.qweets = [];

    router.push("/login");
  } catch (err) {
    throw err;
  }
};
</script>
