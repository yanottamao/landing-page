<script setup>
import { useProfile } from '../composables/useProfile';

const { shared, translations } = useProfile();
</script>

<template>
  <section class="px-5 py-16" id="experience">
      <div class="mx-auto w-full max-w-6xl" v-animate>
      <h2 class="mb-8 text-2xl font-extrabold leading-tight sm:text-3xl">{{ translations.ui?.experience }}</h2>
      <div class="relative grid gap-6 before:absolute before:bottom-1 before:left-2 before:top-1 before:w-0.5 before:bg-green-300">
        <article v-for="item in shared.experience ?? []" :key="item.id" class="relative pl-11 before:absolute before:left-0.5 before:top-3 before:h-4 before:w-4 before:rounded-full before:border-4 before:border-green-200 before:bg-green-500">
          <span class="block text-sm font-bold text-green-500">{{ translations.experience?.[item.id]?.period || item.period }}</span>
          <h3 class="mt-2 text-lg font-bold">{{ translations.experience?.[item.id]?.role || item.role }}</h3>
          <p class="text-sm text-muted">{{ item.company }}</p>
          <p class="mt-3 text-sm text-muted">{{ translations.experience?.[item.id]?.description || item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
