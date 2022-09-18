import { defineStore } from "pinia";
import moment from "moment";
import { db } from "src/boot/firebase";
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

export const useQweetsStore = defineStore("qweets", {
  state: () => ({
    qweets: [],
  }),

  actions: {
    async getQweets() {
      const q = query(collection(db, "qweets"), orderBy("date"));

      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const qweetChange = { ...change.doc.data(), _id: change.doc.id };
          qweetChange.relativeDate = moment(new Date(qweetChange.date)).from(
            moment()
          );

          if (change.type === "added") {
            this.qweets.unshift(qweetChange);
          }

          if (change.type === "modified") {
            const qweetIndex = this.getQweetIndex(qweetChange._id);
            Object.assign(this.qweets[qweetIndex], qweetChange);
          }

          if (change.type === "removed") {
            this.handleRemoveQweetFromUI(qweetChange._id);
          }
        });
      });
    },

    getQweetIndex(_id) {
      return this.qweets.findIndex((qweet) => qweet._id === _id);
    },

    async handleAddQweet(qweet) {
      try {
        await addDoc(collection(db, "qweets"), qweet);
      } catch (err) {
        if (process.env.DEV) {
          console.log(err);
        }
      }
    },

    async handleDeleteQweet(_id) {
      try {
        await deleteDoc(doc(db, "qweets", _id));
      } catch (err) {
        if (process.env.DEV) {
          console.log(err);
        }
      }
    },

    async handleLikeQweet(_id, update) {
      const qweetRef = doc(db, "qweets", _id);

      try {
        await updateDoc(qweetRef, update);
      } catch (err) {
        if (process.env.DEV) {
          console.log(err);
        }
      }
    },

    handleRemoveQweetFromUI(_id) {
      const qweetIndex = this.getQweetIndex(_id);
      this.qweets.splice(qweetIndex, 1);
    },
  },
});
