import { computed, ref, watch } from 'vue';
import profileData from '../data/profile.js';

const profile = ref(profileData);
const language = ref('id');
const storageKey = 'preferred-language';

const savedLanguage = (() => {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
})();

const availableLanguages = Object.keys(profileData.translations ?? {});

language.value = availableLanguages.includes(savedLanguage) ? savedLanguage
  : availableLanguages.includes(profileData.defaultLanguage) ? profileData.defaultLanguage : 'id';

function translationPath(path) {
  return path.split('.').reduce((current, key) => current?.[key], profile.value?.translations?.[language.value]);
}

export function useProfile() {
  const translations = computed(() => profile.value?.translations?.[language.value] ?? {});
  const shared = computed(() => profile.value ?? {});

  function setLanguage(nextLanguage) {
    language.value = nextLanguage;
    try {
      localStorage.setItem(storageKey, nextLanguage);
    } catch (storageError) {
      console.warn('Language preference could not be saved.', storageError);
    }
  }

  watch(language, () => {
    document.documentElement.lang = language.value;
    document.title = translationPath('meta.title') || 'Yanottama Oktabrian';
  }, { immediate: true });

  return { profile, shared, translations, language, setLanguage, translationPath };
}
