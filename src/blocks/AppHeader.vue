<script setup lang="ts"></script>

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
  </header>
</template>

<style lang="scss">
  @use "@/assets/styles/core";

  .app-header {
    height: 100dvh;
    background: core.$color-alabaster;

    &__wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__image-wrapper {
      height: fit-content;
    }
  }
</style>
