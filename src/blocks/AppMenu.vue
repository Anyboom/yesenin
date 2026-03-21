<script setup lang="ts"></script>

<template>
  <nav class="app-menu">
    <div class="container">
      <div class="app-menu__wrapper">
        <p class="app-menu__body">Как И.Д. Сытин открыл С.А. Есенина</p>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
  @use "@/assets/styles/core";
  @use "@/assets/styles/mixins";

  .app-menu {
    background: core.$color-red-oxide !important;

    &__wrapper {
      padding: core.$spacing-6 0;
    }

    &__body {
      text-align: center;
      font-family: "DIN", sans-serif !important;
      @include mixins.apply-text("heading-1");
      color: core.$color-white;
    }
  }
</style>
