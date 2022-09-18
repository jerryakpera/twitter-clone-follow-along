<template>
  <q-item class="q-py-md">
    <q-item-section avatar top>
      <q-avatar size="xl" style="border: 1px solid #ccc">
        {{ initials }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-subtitle1">
        <strong>{{ qweet.fullname }}</strong>
        <span class="text-grey-7 q-ml-sm">
          {{ qweet.handle }}
        </span>
        <br class="lt-md" />
        <span class="text-caption text-grey-7">
          &bull; {{ qweet.relativeDate }}
        </span>
      </q-item-label>
      <q-item-label class="qweet-content text-body1">
        {{ qweet.content }}
      </q-item-label>

      <div class="row justify-between q-mt-sm qweet-icons">
        <q-btn
          color="grey-9"
          icon="las la-comment"
          flat
          round
          size="sm"
          disable
        >
          <q-tooltip> Reply </q-tooltip>
        </q-btn>

        <q-btn
          color="grey-9"
          icon="las la-retweet"
          flat
          round
          size="sm"
          disable
        >
          <q-tooltip> Reqweet </q-tooltip>
        </q-btn>

        <q-btn
          :color="qweet.liked ? 'pink' : 'grey-9'"
          :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
          flat
          round
          size="sm"
          @click="likeQweet(qweet._id)"
        >
          <q-tooltip> {{ qweet.liked ? "Unlike" : "Like" }} </q-tooltip>
        </q-btn>

        <q-btn
          color="grey-9"
          icon="las la-trash"
          flat
          round
          size="sm"
          @click="deleteQweet(qweet._id)"
        >
          <q-tooltip> Delete </q-tooltip>
        </q-btn>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import moment from "moment";

import { computed } from "vue";

const props = defineProps(["qweet"]);
const emit = defineEmits(["handleDeleteQweet", "handleLikeQweet"]);

const initials = computed(() => {
  const [first, last] = props.qweet.fullname.split(" ");

  return `${first[0]}${last[0]}`;
});

const deleteQweet = (_id) => {
  emit("handleDeleteQweet", _id);
};

const likeQweet = (_id) => {
  emit("handleLikeQweet", _id, { liked: !props.qweet.liked });
};
</script>

<style></style>
