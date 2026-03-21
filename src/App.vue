<script setup lang="ts">
  import AppHeader from "./blocks/AppHeader.vue";
  import AboutProject from "@/blocks/AboutProject.vue";
  import MapViewer from "@/blocks/MapViewer.vue";
  import AppSources from "@/blocks/AppSources.vue";
  import ButtonToTop from "@/components/ButtonToTop.vue";
  import AppFooter from "@/blocks/AppFooter.vue";
</script>

<template>
  <AppHeader />
  <AboutProject />
  <MapViewer />
  <AppSources />
  <ButtonToTop />
  <AppFooter />
</template>
