<template>
  <q-page class="relative-position flex flex-center">
    <q-card flat style="min-width: 350px" bordered>
      <q-toolbar class="bg-primary text-white text-weight-bold">
        <q-toolbar-title>Sign in</q-toolbar-title>

        <q-space />

        <q-btn
          unelevated
          :label="loginMode ? 'Register' : 'Sign in'"
          size="sm"
          push
          color="white"
          text-color="primary"
          @click="loginMode = !loginMode"
        />
      </q-toolbar>

      <q-card-section class="q-pb-none q-mb-none">
        <q-input
          outlined
          rounded
          v-model="fullname"
          :rules="[isRequired]"
          label="Full name"
          v-if="!loginMode"
          dense
          ref="fullnameRef"
        />

        <q-input
          outlined
          rounded
          v-model="handle"
          :rules="[isRequired]"
          label="Handle"
          v-if="!loginMode"
          dense
          ref="handleRef"
        />

        <q-input
          outlined
          rounded
          v-model="email"
          :rules="[isRequired, isEmail]"
          label="Email"
          dense
          autofocus
          ref="emailRef"
        />

        <q-input
          outlined
          rounded
          v-model="password"
          :type="passwordType ? 'password' : 'text'"
          :rules="[isRequired]"
          label="Password"
          dense
          ref="passwordRef"
        >
          <template v-slot:append>
            <q-btn
              flat
              size="sm"
              :icon="passwordType ? 'las la-eye' : 'las la-eye-slash'"
              round
              @click="passwordType = !passwordType"
            />
          </template>
        </q-input>

        <q-input
          v-if="!loginMode"
          outlined
          rounded
          v-model="confirmpassword"
          :type="confirmPasswordType ? 'password' : 'text'"
          :rules="[isRequired, passwordsMatch]"
          label="Confirm password"
          dense
          ref="confirmpasswordRef"
        >
          <template v-slot:append>
            <q-btn
              flat
              size="sm"
              :icon="confirmPasswordType ? 'las la-eye' : 'las la-eye-slash'"
              round
              @click="confirmPasswordType = !confirmPasswordType"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions class="q-pa-md q-mt-none q-pt-none">
        <q-space />
        <q-btn
          v-if="loginMode"
          label="Sign in"
          color="primary"
          class="full-width"
          @click="handleSignInWithEmailAndPassword"
        />

        <q-btn
          v-else
          label="Register"
          color="primary"
          class="full-width"
          @click="handleRegisterInWithEmailAndPassword"
        />

        <q-btn
          :label="loginMode ? 'Sign in' : 'Register'"
          color="blue-10"
          class="full-width q-mt-sm"
          icon="lab la-google"
          @click="signInWithGoogle"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { auth } from "src/boot/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useUsersStore } from "src/stores/users-store";
import { useQweetsStore } from "src/stores/qweets-store";

const $q = useQuasar();
const router = useRouter();
const usersStore = useUsersStore();
const qweetsStore = useQweetsStore();

const email = ref("");
const handle = ref("");
const password = ref("");
const fullname = ref("");
const loginMode = ref(true);
const passwordType = ref(true);
const confirmpassword = ref("");
const confirmPasswordType = ref(true);

const emailRef = ref(null);
const handleRef = ref(null);
const fullnameRef = ref(null);
const passwordRef = ref(null);
const confirmpasswordRef = ref(null);

const isRequired = computed(() => (val) => !!val || "Field is required");

const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const isEmail = computed(
  () => (val) => emailRegex.test(val) || "Enter a valid email address"
);
const passwordsMatch = computed(
  () => (val) => val.trim() === password.value || "Passwords must match"
);

const handleSignInWithEmailAndPassword = async () => {
  $q.loading.show();

  try {
    const details = {
      email: email.value,
      password: password.value,
    };

    await usersStore.login(details);

    await qweetsStore.getQweets();
    router.push("/");
  } catch (err) {
    console.log({ err });
    $q.notify({
      message: err,
      color: "negative",
    });
  }

  $q.loading.hide();
};

const validateRegistrationForm = () => {
  fullnameRef.value.validate();
  handleRef.value.validate();
  emailRef.value.validate();
  passwordRef.value.validate();
  confirmpasswordRef.value.validate();

  if (
    fullnameRef.value.hasError ||
    handleRef.value.hasError ||
    emailRef.value.hasError ||
    passwordRef.value.hasError ||
    confirmpasswordRef.value.hasError
  ) {
    return false;
  }

  return true;
};

const handleRegisterInWithEmailAndPassword = async () => {
  const formIsValid = validateRegistrationForm();
  if (!formIsValid) return;

  $q.loading.show();

  try {
    const details = {
      fullname: fullname.value.trim(),
      handle: handle.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
      confirmpassword: confirmpassword.value.trim(),
    };

    const currentUser = await usersStore.register(details);
    usersStore.user = currentUser;

    await qweetsStore.getQweets();
    router.push("/");
  } catch (err) {
    $q.notify({
      message: err,
      color: "negative",
    });
  }

  $q.loading.hide();
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(async () => {
      await qweetsStore.getQweets();
      router.push("/");
    })
    .catch((err) => {
      console.log("Sign in with Google error");
      console.log(err);
    });
};
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
