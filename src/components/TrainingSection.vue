<script setup>
import { useProfile } from '../composables/useProfile';

const { shared, translations } = useProfile();
const icons = {
  office: '<path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h5"/>',
  design: '<path d="M12 3 3 21l18-8-9-10z"/><path d="M12 7v10"/>',
  code: '<path d="m8 8-5 4 5 4"/><path d="m16 8 5 4-5 4"/><path d="m13 5-2 14"/>',
  network: '<circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v4m0 0H8m4 0h4M8 19h8"/>'
};
</script>

<template>
  <section class="bg-green-100 px-5 py-16" id="training">
      <div class="mx-auto w-full max-w-6xl" v-animate>
      <h2 class="mb-8 text-2xl font-extrabold leading-tight sm:text-3xl">{{ translations.ui?.training }}</h2>
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="item in shared.training ?? []" :key="item.id" class="h-full rounded-3xl border border-green-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
          <svg class="mb-4 h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="icons[item.icon] || icons.code" />
          <h3 class="mb-3 text-lg font-bold">{{ translations.training?.[item.id]?.title || item.title }}</h3>
          <ul class="space-y-1 text-sm text-muted">
            <li v-for="entry in translations.training?.[item.id]?.items || item.items" :key="entry">{{ entry }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
