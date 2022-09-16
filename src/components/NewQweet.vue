<template>
  <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
    <div class="col">
      <q-input
        v-model="newQweetContent"
        placeholder="What's happening?"
        maxlength="280"
        bottom-slots
        counter
        autogrow
        type="textarea"
        autofocus
        class="text-body1 new-qweet"
      >
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
          </q-avatar>
        </template>
      </q-input>
    </div>
    <div class="col col-shrink">
      <q-btn
        @click="addNewQweet"
        color="primary"
        label="Qweet"
        no-caps
        size="sm"
        unelevated
        rounded
        :disable="!newQweetContent"
        class="q-mb-lg"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["addQweet"]);

const newQweetContent = ref("");

const addNewQweet = () => {
  const qweet = {
    content: newQweetContent.value.trim(),
    date: Date.now(),
    liked: false,
  };

  newQweetContent.value = "";
  emit("addQweet", qweet);
};
</script>

<style lang="scss">
.new-qweet {
  textarea {
    line-height: 1.4 !important;
    overflow: hidden;
  }
}
</style>
