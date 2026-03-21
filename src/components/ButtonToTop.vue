<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";
  import AppButton from "@/components/AppButton.vue";
  import { Icon } from "@iconify/vue";

  const showButton = ref(false);

  const checkScrollPosition = () => {
    showButton.value = window.scrollY > document.body.clientHeight / 3;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  onMounted(() => {
    window.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", checkScrollPosition);
  });
</script>

<template>
  <transition name="fade">
    <AppButton
      v-if="showButton"
      @click="scrollToTop"
      class="scroll-to-top"
    >
      <Icon
        icon="fa7-solid:chevron-up"
        width="24"
        height="24"
      />
    </AppButton>
  </transition>
</template>

<style lang="scss">
  @use "@/assets/styles/core";

  .scroll-to-top {
    position: fixed;
    right: core.$spacing-2;
    bottom: core.$spacing-2;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
