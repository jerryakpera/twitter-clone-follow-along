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
    </q-list>
  </div>
</template>

<script setup>
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
</script>
