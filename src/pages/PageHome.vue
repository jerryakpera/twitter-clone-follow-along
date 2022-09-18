<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <NewQweet @addQweet="handleNewQweet" />

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
            @handleDeleteQweet="handleDeleteQweet"
            @handleLikeQweet="handleLikeQweet"
          />
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script setup>
import moment from "moment";
import db from "src/boot/firebase";
import {
  doc,
  query,
  addDoc,
  orderBy,
  deleteDoc,
  updateDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";

import Qweet from "src/components/Qweet.vue";
import NewQweet from "src/components/NewQweet.vue";

import { onMounted, ref } from "vue";

const qweets = ref([]);

const handleNewQweet = async (qweet) => {
  try {
    await addDoc(collection(db, "qweets"), qweet);
  } catch (err) {
    console.log(err);
  }
};

const handleDeleteQweet = async (_id) => {
  try {
    await deleteDoc(doc(db, "qweets", _id));
  } catch (err) {
    console.log(err);
  }
};

const handleLikeQweet = async (_id, update) => {
  const qweetRef = doc(db, "qweets", _id);

  try {
    await updateDoc(qweetRef, update);
  } catch (err) {
    console.log(err);
  }
};

const getQweetIndex = (_id) => {
  return qweets.value.findIndex((qweet) => qweet._id === _id);
};

const handleRemoveQweetFromUI = (_id) => {
  const qweetIndex = getQweetIndex(_id);
  qweets.value.splice(qweetIndex, 1);
};

const getQweets = async () => {
  const q = query(collection(db, "qweets"), orderBy("date", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const qweetChange = { ...change.doc.data(), _id: change.doc.id };
      qweetChange.relativeDate = moment(new Date(qweetChange.date)).from(
        moment()
      );

      if (change.type === "added") {
        qweets.value.unshift(qweetChange);
      }

      if (change.type === "modified") {
        const qweetIndex = getQweetIndex(qweetChange._id);
        Object.assign(qweets.value[qweetIndex], qweetChange);
      }

      if (change.type === "removed") {
        handleRemoveQweetFromUI(qweetChange._id);
      }
    });
  });
};

onMounted(async () => {
  await getQweets();
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
