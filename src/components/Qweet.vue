<template>
  <q-item class="q-py-md">
    <q-item-section avatar top>
      <q-avatar size="xl">
        <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-subtitle1">
        <strong>Janet Borough</strong>
        <span class="text-grey-7 q-ml-sm">@janet__</span>
        <br class="lt-md" />
        <span class="text-caption text-grey-7">
          &bull; {{ qweet.relativeDate }}
        </span>
      </q-item-label>
      <q-item-label class="qweet-content text-body1">
        {{ qweet.content }}
      </q-item-label>

      <div class="row justify-between q-mt-sm qweet-icons">
        <q-btn color="grey-9" icon="las la-comment" flat round size="sm" />
        <q-btn color="grey-9" icon="las la-retweet" flat round size="sm" />
        <q-btn
          :color="qweet.liked ? 'pink' : 'grey-9'"
          :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart'"
          flat
          round
          size="sm"
          @click="likeQweet(qweet._id)"
        />
        <q-btn
          color="grey-9"
          icon="las la-trash"
          flat
          round
          size="sm"
          @click="deleteQweet(qweet._id)"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import moment from "moment";

const props = defineProps(["qweet"]);
const emit = defineEmits(["handleDeleteQweet", "handleLikeQweet"]);

const deleteQweet = (_id) => {
  emit("handleDeleteQweet", _id);
};

const likeQweet = (_id) => {
  emit("handleLikeQweet", _id, { liked: !props.qweet.liked });
};
</script>

<style></style>
