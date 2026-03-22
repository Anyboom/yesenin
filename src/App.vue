<script setup lang="ts">
  import AppHeader from "./blocks/AppHeader.vue";
  import AboutProject from "@/blocks/AboutProject.vue";
  import AppSources from "@/blocks/AppSources.vue";
  import ButtonToTop from "@/components/ButtonToTop.vue";
  import AppFooter from "@/blocks/AppFooter.vue";
  import AppContent from "@/blocks/AppContent.vue";
</script>

<template>
  <AppHeader />
  <AppContent />
  <AboutProject />
  <AppSources />
  <ButtonToTop />
  <AppFooter />
</template>
