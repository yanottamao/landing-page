<script setup>
import { useProfile } from '../composables/useProfile';

const { profile, language, setLanguage } = useProfile();
</script>

<template>
  <header class="sticky top-0 z-10 border-b border-green-200 bg-white/90 backdrop-blur-md">
    <nav class="mx-auto flex min-h-[70px] w-full max-w-6xl items-center gap-5 px-5" aria-label="Main navigation">
      <a class="text-xl font-extrabold text-green-700" href="#top">YO<span class="text-green-300">.</span></a>
      <div class="ml-auto hidden items-center gap-6 text-sm font-semibold text-muted md:flex">
        <a class="transition hover:text-green-500" href="#expertise">Expertise</a>
        <a class="transition hover:text-green-500" href="#training">Training</a>
        <a class="transition hover:text-green-500" href="#experience">Experience</a>
        <a class="transition hover:text-green-500" href="#education">Education</a>
        <a class="transition hover:text-green-500" href="#contact">Contact</a>
      </div>
      <div class="ml-auto flex items-center gap-3">
        <div class="inline-flex rounded-full border border-green-200 bg-white p-1 text-xs font-bold" role="group" aria-label="Language selection">
          <button
            v-for="option in ['id', 'en']" :key="option" class="language-button rounded-full px-3 py-1.5 transition"
            :class="language === option ? 'bg-green-500 text-white' : 'text-muted'"
            :aria-pressed="String(language === option)" type="button" @click="setLanguage(option)"
          >{{ option.toUpperCase() }}</button>
        </div>
        <a v-if="profile?.cv" class="inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700" :href="profile.cv" target="_blank" rel="noopener">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3v5h5"/><path d="M8 3h6l5 5v13H8z"/><path d="M10 12h7M10 16h7"/></svg>
          CV
        </a>
      </div>
    </nav>
  </header>
</template>
