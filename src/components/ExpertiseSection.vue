<script setup>
import { useProfile } from '../composables/useProfile';

const { shared, translations } = useProfile();
</script>

<template>
  <section class="px-5 py-16" id="expertise">
      <div class="mx-auto w-full max-w-6xl" v-animate>
      <h2 class="mb-8 text-2xl font-extrabold leading-tight sm:text-3xl">{{ translations.ui?.expertise }}</h2>
      <div class="flex flex-wrap gap-3">
        <span v-for="item in shared.expertise ?? []" :key="item" class="rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-700 transition duration-300 hover:-translate-y-0.5 hover:border-green-300 hover:shadow-soft">{{ item }}</span>
      </div>
    </div>
  </section>
</template>
