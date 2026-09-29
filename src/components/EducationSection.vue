<script setup>
import { useProfile } from '../composables/useProfile';

const { shared, translations } = useProfile();
</script>

<template>
  <section class="bg-green-100 px-5 py-16" id="education">
      <div class="mx-auto w-full max-w-6xl" v-animate>
      <h2 class="mb-8 text-2xl font-extrabold leading-tight sm:text-3xl">{{ translations.ui?.education }}</h2>
      <div class="relative grid gap-6 before:absolute before:bottom-1 before:left-2 before:top-1 before:w-0.5 before:bg-green-300">
        <article v-for="item in shared.education ?? []" :key="item.id" class="relative pl-11 before:absolute before:left-0.5 before:top-3 before:h-4 before:w-4 before:rounded-full before:border-4 before:border-green-200 before:bg-green-500">
          <span class="block text-sm font-bold text-green-500">{{ translations.education?.[item.id]?.period || item.period }}</span>
          <h3 class="mt-2 text-lg font-bold">{{ translations.education?.[item.id]?.institution || item.institution }}</h3>
          <p class="mt-1 text-sm text-muted">{{ translations.education?.[item.id]?.qualification || item.qualification }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
