<template>
  <div>
    <q-input
      color="teal"
      outlined
      rounded
      v-model="text"
      placeholder="search"
      dense
      class="q-ma-sm"
    >
      <template v-slot:prepend>
        <q-icon name="las la-search" />
      </template>
    </q-input>

    <q-list separator padding>
      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-grey">Football</q-item-label>
          <q-item-label class="text-weight-bold"
            >Lorem, ipsum dolor.</q-item-label
          >
          <q-item-label caption
            >Secondary line text. Lorem ipsum dolor sit amet, consectetur
            adipiscit elit.</q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-grey">Football</q-item-label>
          <q-item-label class="text-weight-bold"
            >Lorem, ipsum dolor.</q-item-label
          >
          <q-item-label caption
            >Secondary line text. Lorem ipsum dolor sit amet, consectetur
            adipiscit elit.</q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-pa-md">
        <q-item-section>
          <q-item-label overline class="text-grey">Football</q-item-label>
          <q-item-label class="text-weight-bold"
            >Lorem, ipsum dolor.</q-item-label
          >
          <q-item-label caption
            >Secondary line text. Lorem ipsum dolor sit amet, consectetur
            adipiscit elit.</q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref } from "vue";

const text = ref("");
</script>
