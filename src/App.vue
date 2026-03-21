<script setup lang="ts">
  import AppHeader from "./blocks/AppHeader.vue";
  import AppMenu from "@/blocks/AppMenu.vue";
  import AboutProject from "@/blocks/AboutProject.vue";
  import MapViewer from "@/blocks/MapViewer.vue";
  import AppSources from "@/blocks/AppSources.vue";
  import ButtonToTop from "@/components/ButtonToTop.vue";
</script>

<template>
  <AppHeader />
  <AppMenu />
  <AboutProject />
  <MapViewer />
  <AppSources />
  <ButtonToTop />
</template>
