<script setup lang="ts">
  import { onMounted } from "vue";
  // @ts-ignore
  import FlipBook from "flipbook-js";

  onMounted(() => {
    new FlipBook("journal_1", {
      width: "100%",
      height: "671px",
      canClose: true,
      initialCall: true,
    });
  });
</script>

<template>
  <div class="book-viewer-first">
    <div class="container">
      <div class="book-viewer-first__wrapper">
        <div
          class="book-viewer-first__book c-flipbook"
          id="journal_1"
        >
          <div
            class="c-flipbook__page"
            v-for="index in 36"
          >
            <img
              class="book-viewer-first__img"
              :src="`images/journal/1/000199_000009_013508098-изображения-${index + 3}.jpg`"
              alt=""
            />
          </div>
        </div>
        <p class="book-viewer-first__info">
          Ежемесячный иллюстрированный детский журнал «Мирок» со стихотворениями С.А. Есенина «Пороша» и «Воробышки»,
          кн. 2 за 1914 г. (сокращ.), Москва, тип. Тов-ва Сытина
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use "@/assets/styles/core";
  @use "@/assets/styles/mixins";

  .book-viewer-first {
    position: relative;
    padding: core.$spacing-2 0;
    background: core.$color-alabaster;
    height: 764px;

    &__info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      max-width: 500px;
      margin: 0 auto;

      @include mixins.apply-text("caption");
      color: #646464;
    }

    &__book {
      margin: 0 auto;
    }
  }
</style>
