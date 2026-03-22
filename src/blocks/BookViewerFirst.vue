<script setup lang="ts">
  import { onMounted } from "vue";
  import FlipBook from "flipbook-js";

  onMounted(() => {
    new FlipBook("journal_1", {
      width: "100%",
      height: "454px",
      canClose: true,
      initialCall: true,
    });
  });
</script>

<template>
  <div class="book-viewer">
    <div class="container">
      <div class="book-viewer__wrapper">
        <div
          class="book-viewer__book c-flipbook"
          id="journal_1"
        >
          <div
            class="c-flipbook__page"
            v-for="index in 36"
          >
            <img
              class="book-viewer__img"
              :src="`images/journal/1/000199_000009_013508098-изображения-${index + 3}.jpg`"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @use "@/assets/styles/core";
  @use "@/assets/styles/mixins";

  .c-flipbook {
    position: static;
  }

  .book-viewer {
    position: relative;
    padding: core.$spacing-2 0;
    background: core.$color-alabaster;

    &__book {
      margin: 0 auto;
    }
  }
</style>
