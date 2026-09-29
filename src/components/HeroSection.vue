<script setup>
import { useProfile } from '../composables/useProfile';

const { profile, shared, translations } = useProfile();
</script>

<template>
  <section class="px-5 py-16 md:py-24" id="top">
    <div class="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[minmax(0,1fr)_320px] md:items-center">
      <div v-animate>
        <p class="inline-block rounded-full border border-green-300 bg-green-200 px-4 py-2 text-xs font-bold text-green-700">
          {{ translations.status || shared.status }}
        </p>
        <h1 class="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{{ shared.name }}</h1>
        <p class="mt-4 text-base font-bold text-green-500">{{ [shared.title, shared.tagline].filter(Boolean).join(' · ') }}</p>
        <p class="mt-5 max-w-2xl text-base text-muted sm:text-lg">{{ translations.summary || shared.summary }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a class="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-green-500 px-5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-green-700" href="#contact">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg>
            {{ translations.ui?.getInTouch }}
          </a>
          <a v-if="shared.cv" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-green-500 px-5 font-bold text-green-500 transition hover:-translate-y-0.5 hover:bg-green-200 hover:text-green-700" :href="shared.cv" target="_blank" rel="noopener">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></svg>
            {{ translations.ui?.downloadProfile }}
          </a>
        </div>
      </div>
      <div class="mx-auto w-full max-w-sm rounded-3xl border border-green-200 bg-white p-6 text-center shadow-soft" v-animate>
        <div class="mx-auto mb-5 h-44 w-44 overflow-hidden rounded-full border-4 border-green-200">
          <img class="h-full w-full object-cover transition duration-500 hover:scale-105" srcset="/assets/img/yanottama-384-9eab10230624.webp 384w, /assets/img/yanottama-768-9eab10230624.webp 768w, /assets/img/yanottama-1200-9eab10230624.webp 1200w" sizes="(min-width: 768px) 320px, 176px" :src="shared.photo" :alt="`Foto profil ${shared.name}`" width="176" height="176" fetchpriority="high" decoding="async">
        </div>
        <p class="text-sm text-muted">{{ shared.location }}</p>
        <div class="mt-4 flex flex-wrap justify-center gap-4 text-sm font-semibold [&_a]:text-muted [&_a]:transition [&_a]:hover:text-green-500">
          <a v-for="link in shared.contact?.links ?? []" :key="link.url" :href="link.url" target="_blank" rel="noopener">{{ link.label }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
