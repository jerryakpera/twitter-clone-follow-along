<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <NewQweet @addQweet="qweetsStore.handleAddQweet" v-if="user" />

      <q-separator size="10px" color="grey-2" class="divider" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <Qweet
            v-for="qweet in qweets"
            :key="qweet._id"
            :qweet="qweet"
            @handleDeleteQweet="qweetsStore.handleDeleteQweet"
            @handleLikeQweet="qweetsStore.handleLikeQweet"
          />
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script setup>
import Qweet from "src/components/Qweet.vue";
import NewQweet from "src/components/NewQweet.vue";

import { computed, onMounted } from "vue";
import { useUsersStore } from "src/stores/users-store";
import { useQweetsStore } from "src/stores/qweets-store";

const usersStore = useUsersStore();
const qweetsStore = useQweetsStore();

const user = computed(() => usersStore.user);
const qweets = computed(() => qweetsStore.qweets);

onMounted(async () => {
  await qweetsStore.getQweets();
});
</script>

<style lang="scss">
.divider {
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: $grey-4;
}

.qweet-content {
  white-space: pre-line;
}

.qweet-icons {
  margin-left: -5px;
}
</style>
