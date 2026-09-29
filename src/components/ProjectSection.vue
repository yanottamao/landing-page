<script setup>
import { useProfile } from '../composables/useProfile';

const { shared, translations } = useProfile();
</script>

<template>
  <section v-if="(shared.projects ?? []).length" class="px-4 py-16 sm:px-5" id="projects">
    <div class="mx-auto w-full max-w-6xl" v-animate>
      <h2 class="mb-6 text-2xl font-extrabold leading-tight sm:mb-8 sm:text-3xl">{{ translations.ui?.projects }}</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:gap-6">
        <article v-for="item in shared.projects" :key="item.id ?? item.title" class="flex h-full flex-col overflow-hidden rounded-3xl border border-green-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-soft">
          <img v-if="item.image" class="h-40 w-full object-cover sm:h-44 xl:h-48" :src="item.image" :alt="item.title" width="416" height="176" loading="lazy" decoding="async">
          <div class="flex flex-1 flex-col p-5 sm:p-6">
            <h3 class="mb-2 text-base font-bold sm:text-lg">{{ item.title }}</h3>
            <p class="text-sm text-muted">{{ item.description }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="tag in item.tags ?? []" :key="tag" class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">{{ tag }}</span>
            </div>
            <a v-if="item.url" class="mt-auto inline-block pt-4 text-sm font-bold text-green-500 transition hover:text-green-700" :href="item.url" target="_blank" rel="noopener">{{ translations.ui?.viewProject }}</a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
