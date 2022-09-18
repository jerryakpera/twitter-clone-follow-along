import { defineStore } from "pinia";
import { auth } from "../boot/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const useUsersStore = defineStore("users", {
  state: () => ({
    user: null,
    profile: null,
  }),

  getters: {},

  actions: {
    async register({ email, password }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
        switch (err.code) {
          case "auth/email-already-in-use":
            throw "Email already in use";
            break;

          case "auth/invalid-email":
            throw "Invalid email";
            break;

          case "auth/operation-not-allowed":
            throw "Forbidden";
            break;

          case "auth/weak-password":
            throw "Password not strong enough";
            break;

          case "auth/admin-restricted-operation":
            throw "Admin restricted operation";
            break;

          default:
            throw "Something went wrong";
        }
      }

      return auth.currentUser;
    },

    async login({ email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        switch (err.code) {
          case "auth/user-not-found":
            throw "User not found";
            break;

          case "auth/wrong-password":
            throw "Wrong password";
            break;

          case "auth/invalid-password":
            throw "Wrong password";
            break;

          default:
            throw "Something went wrong";
        }
      }

      this.user = auth.currentUser;
    },
  },
});
