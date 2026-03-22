<script setup lang="ts">
  import AppMenu from "@/blocks/AppMenu.vue";
</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="app-header__wrapper">
        <div class="app-header__image-wrapper">
          <img
            src="/images/header-logo.png"
            alt="Логотип"
          />
        </div>
      </div>
    </div>
    <AppMenu />
  </header>
</template>

<style lang="scss">
  @use "@/assets/styles/core";

  .app-header {
    height: 100dvh;
    background: core.$color-alabaster;
    padding-bottom: core.$spacing-8;
    display: flex;
    flex-direction: column;

    &__wrapper {
      flex: 1;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    &__image-wrapper {
      height: fit-content;
    }
  }
</style>
