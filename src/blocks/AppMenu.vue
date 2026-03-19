<script setup lang="ts"></script>

<template>
  <nav class="app-menu">
    <div class="container">
      <div class="app-menu__wrapper">
        <ul class="app-menu__list">
          <li class="app-menu__item">
            <a
              href="#"
              class="app-menu__link"
            >
              Ссылка
            </a>
          </li>
          <li class="app-menu__item">
            <a
              href="#"
              class="app-menu__link"
            >
              Ссылка
            </a>
          </li>
          <li class="app-menu__item">
            <a
              href="#"
              class="app-menu__link"
            >
              Ссылка
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
  @use "@/assets/styles/core";
  @use "@/assets/styles/mixins";

  .app-menu {
    background: core.$color-red-oxide;

    &__wrapper {
      padding: core.$spacing-3 0;
    }

    &__list {
      display: flex;
      gap: core.$spacing-4;
      justify-content: center;
    }

    &__link {
      color: core.$color-alabaster;
      border-bottom: 2px solid transparent;

      @include mixins.hover {
        border-bottom: 2px solid core.$color-alabaster;
      }
    }
  }
</style>
