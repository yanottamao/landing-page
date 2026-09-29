<script setup>
import { useProfile } from '../composables/useProfile';

const { shared, translations } = useProfile();
</script>

<template>
  <section class="px-5 py-16" id="certifications">
      <div class="mx-auto w-full max-w-6xl" v-animate>
      <h2 class="mb-8 text-2xl font-extrabold leading-tight sm:text-3xl">{{ translations.ui?.certifications }}</h2>
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="item in shared.certifications ?? []" :key="item.name" class="h-full rounded-3xl border border-green-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
          <h3 class="mb-1 text-base font-bold">{{ item.name }}</h3>
          <p v-if="[item.issuer, item.year].filter(Boolean).length" class="text-sm text-muted">{{ [item.issuer, item.year].filter(Boolean).join(' · ') }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
