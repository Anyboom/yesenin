<script setup lang="ts">
  import { onMounted } from "vue";
  // @ts-ignore
  import FlipBook from "flipbook-js";

  onMounted(() => {
    new FlipBook("journal_2", {
      width: "100%",
      height: "671px",
      canClose: true,
      initialCall: true,
    });
  });
</script>

<template>
  <div class="book-viewer-second">
    <div class="container">
      <div class="book-viewer-second__wrapper">
        <div
          class="book-viewer-second__book c-flipbook"
          id="journal_2"
        >
          <div
            class="c-flipbook__page"
            v-for="index in 35"
          >
            <img
              class="book-viewer-second__img"
              :src="`images/journal/2/${index}.png`"
              alt=""
            />
          </div>
        </div>
        <p class="book-viewer-second__info">
          Ежемесячный иллюстрированный детский журнал «Мирок» со стихотворением С.А. Есенина «Пасхальный благовест», кн.
          4 за 1914 г. (сокращ.), Москва, тип. Тов-ва Сытина.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @use "@/assets/styles/core";
  @use "@/assets/styles/mixins";

  .book-viewer-second {
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
