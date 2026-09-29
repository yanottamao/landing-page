<script setup>
import { useProfile } from '../composables/useProfile';

const { shared } = useProfile();
</script>

<template>
  <footer class="border-t border-green-200 bg-white px-5 py-6 text-sm text-muted">
    <div class="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2">
      <span>{{ shared.name }}</span>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </div>
  </footer>
</template>
