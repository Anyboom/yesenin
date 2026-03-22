<script setup lang="ts">
  import { onMounted } from "vue";
  import FlipBook from "flipbook-js";

  onMounted(() => {
    new FlipBook("journal_2", {
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
          id="journal_2"
        >
          <div
            class="c-flipbook__page"
            v-for="index in 35"
          >
            <img
              class="book-viewer__img"
              :src="`images/journal/2/${index}.png`"
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
