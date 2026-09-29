<script setup>
import { computed } from 'vue';
import { useProfile } from '../composables/useProfile';

const { shared, translations } = useProfile();
const cta = computed(() => ({ ...shared.value.contact?.cta, ...translations.value.cta }));
const ctaIcons = {
  email: '<path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/>',
  whatsapp: '<path d="M21 12a9 9 0 1 1-4.4-7.7L21 4l-.9 4.4A9 9 0 0 1 21 12z"/><path d="M9 10c0 3 2 5 5 5"/>',
  file: '<path d="M14 3v5h5"/><path d="M8 3h6l5 5v13H8z"/><path d="M10 12h7M10 16h7"/>'
};
const actions = computed(() => [cta.value.primary, cta.value.secondary].filter(Boolean).map((action, index) => {
  const url = action.url?.toLowerCase() ?? '';
  const icon = url.startsWith('mailto:') ? ctaIcons.email : url.startsWith('https://wa.me/') ? ctaIcons.whatsapp : ctaIcons.file;
  return { ...action, icon };
}));
</script>

<template>
  <section class="px-5 py-16" id="contact">
      <div class="mx-auto w-full max-w-6xl" v-animate>
      <div class="grid gap-7 rounded-[32px] border border-green-300 bg-gradient-to-br from-white to-green-100 p-7 shadow-soft md:grid-cols-[minmax(0,1.4fr)_minmax(240px,0.8fr)] md:items-center md:p-14">
        <div>
          <p class="inline-block rounded-full border border-green-300 bg-green-200 px-4 py-2 text-xs font-bold text-green-700">{{ cta.eyebrow }}</p>
          <h2 class="mb-4 mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{{ cta.heading }}</h2>
          <p class="mb-7 max-w-xl text-base text-muted">{{ cta.description }}</p>
          <div class="flex flex-wrap gap-3">
            <a v-for="(action, index) in actions" :key="action.url" :class="index === 0 ? 'bg-green-500 text-white hover:bg-green-700' : 'border border-green-500 text-green-500 hover:bg-green-200 hover:text-green-700'" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 font-bold transition hover:-translate-y-0.5" :href="action.url" target="_blank" rel="noopener">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="action.icon" />
              <span>{{ action.label }}</span>
            </a>
          </div>
        </div>
        <div class="rounded-3xl border border-green-200 bg-white/80 p-6">
          <p class="mb-5">
            <span class="block text-xs font-bold uppercase tracking-widest text-muted">{{ translations.ui?.email }}</span>
            <a class="font-semibold text-green-700 transition hover:text-green-500" :href="`mailto:${shared.contact?.email}`">{{ shared.contact?.email }}</a>
          </p>
          <p class="mb-5">
            <span class="block text-xs font-bold uppercase tracking-widest text-muted">{{ translations.ui?.phone }}</span>
            <a class="font-semibold text-green-700 transition hover:text-green-500" :href="`tel:${shared.contact?.phone?.replace(/[^\d+]/g, '')}`">{{ shared.contact?.phone }}</a>
          </p>
          <div class="mt-1 flex flex-wrap justify-start gap-4 text-sm font-semibold [&_a]:text-muted [&_a]:transition [&_a]:hover:text-green-500">
            <a v-for="link in shared.contact?.links ?? []" :key="link.url" :href="link.url" target="_blank" rel="noopener">{{ link.label }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
