<script setup>
import SiteHeader from './components/SiteHeader.vue';
import HeroSection from './components/HeroSection.vue';
import ExpertiseSection from './components/ExpertiseSection.vue';
import TrainingSection from './components/TrainingSection.vue';
import ExperienceSection from './components/ExperienceSection.vue';
import EducationSection from './components/EducationSection.vue';
import CertificationSection from './components/CertificationSection.vue';
import ProjectSection from './components/ProjectSection.vue';
import LanguageSection from './components/LanguageSection.vue';
import ContactSection from './components/ContactSection.vue';
import SiteFooter from './components/SiteFooter.vue';
import { useProfile } from './composables/useProfile';

const { profile } = useProfile();
</script>

<template>
  <template v-if="profile">
    <SiteHeader />
    <main>
      <HeroSection />
      <ExpertiseSection />
      <TrainingSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationSection />
      <ProjectSection />
      <LanguageSection />
      <ContactSection />
    </main>
    <SiteFooter />
  </template>
</template>
