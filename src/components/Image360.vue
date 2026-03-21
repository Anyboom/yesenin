<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";

  interface Props {
    frontImage: string;
    thumbnailImage?: string;
    alt?: string;
    thumbnailWidth?: string;
    thumbnailHeight?: string;
    modalWidth?: string;
    modalHeight?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    alt: "Фото",
    thumbnailWidth: "300px",
    thumbnailHeight: "300px",
    modalWidth: "80vw",
    modalHeight: "80vh",
  });

  const sensitive = 0.3;

  const isModalOpen = ref(false);
  const photo3dRef = ref<HTMLElement | null>(null);

  const isDragging = ref(false);
  let startX = 0;
  let startY = 0;
  let rotateX = 0;
  let rotateY = 0;
  let lastX = 0;
  let lastY = 0;

  const updateTransform = (): void => {
    if (photo3dRef.value) {
      photo3dRef.value.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const resetRotation = (): void => {
    rotateX = 0;
    rotateY = 0;
    lastX = 0;
    lastY = 0;
    updateTransform();
  };

  const openModal = (): void => {
    isModalOpen.value = true;
    document.body.style.overflow = "hidden";
    // Небольшая задержка для корректного отображения
    setTimeout(() => {
      resetRotation();
    }, 10);
  };

  const closeModal = (): void => {
    isModalOpen.value = false;
    document.body.style.overflow = "";
    resetRotation();
  };

  const handleMouseDown = (e: MouseEvent): void => {
    if (e.button !== 0) return;
    e.preventDefault();
    isDragging.value = true;
    startX = e.clientX;
    startY = e.clientY;
    lastX = rotateX;
    lastY = rotateY;
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!isDragging.value) return;
    e.preventDefault();
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    rotateY = lastY + dx * sensitive;
    rotateX = lastX - dy * sensitive;
    updateTransform();
  };

  const handleMouseUp = (): void => {
    isDragging.value = false;
  };

  const handleTouchStart = (e: TouchEvent): void => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      isDragging.value = true;
      startX = touch.clientX;
      startY = touch.clientY;
      lastX = rotateX;
      lastY = rotateY;
    }
  };

  const handleTouchMove = (e: TouchEvent): void => {
    if (!isDragging.value || e.touches.length !== 1) return;
    e.preventDefault();
    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    rotateY = lastY + dx * sensitive;
    rotateX = lastX - dy * sensitive;
    updateTransform();
  };

  const handleTouchEnd = (): void => {
    isDragging.value = false;
  };

  onMounted(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
    window.removeEventListener("touchcancel", handleTouchEnd);
    document.body.style.overflow = "";
  });

  defineExpose({
    openModal,
    closeModal,
    resetRotation,
  });
</script>

<template>
  <div class="photo-3d-wrapper">
    <div
      class="photo-3d-wrapper__thumbnail"
      @click="openModal"
    >
      <img
        class="photo-3d-wrapper__image"
        :src="thumbnailImage || frontImage"
        :alt="alt"
      />
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isModalOpen"
          class="photo-3d-modal"
          @click="closeModal"
          :style="{
            '--modalHeight': modalHeight,
            '--modalWidth': modalWidth,
          }"
        >
          <div
            class="photo-3d-modal__content"
            @click.stop
          >
            <div
              ref="photo3dRef"
              class="photo-3d-modal__container"
              :class="{ 'photo-3d-modal__container--grabbing': isDragging }"
              @mousedown="handleMouseDown"
              @touchstart="handleTouchStart"
            >
              <div class="photo-3d-modal__face photo-3d-modal__face--front">
                <img
                  class="photo-3d-modal__image"
                  :src="frontImage"
                  :alt="alt"
                  draggable="false"
                />
              </div>

              <div class="photo-3d-modal__face photo-3d-modal__face--back" />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
  .photo-3d-wrapper {
    display: inline-block;

    &__thumbnail {
      cursor: pointer;
      border-radius: 20px;
      overflow: hidden;
      transition: transform 0.3s ease;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

      &:hover {
        transform: scale(1.02);
      }
    }

    &__image {
      width: v-bind("props.thumbnailWidth");
      height: v-bind("props.thumbnailHeight");
      object-fit: cover;
      display: block;
    }
  }

  .photo-3d-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    cursor: pointer;

    &__content {
      cursor: default;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__container {
      position: relative;
      max-width: 1000px;
      max-height: 800px;
      width: var(--modalWidth);
      height: var(--modalHeight);
      transform-style: preserve-3d;
      cursor: grab;
      touch-action: none;

      &--grabbing {
        cursor: grabbing;
      }
    }

    &__face {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: 20px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);

      &--front {
        background: #fff;
      }

      &--back {
        transform: rotateY(180deg);
        background: red;
      }
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      pointer-events: none;
    }
  }

  // Анимации
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

  // Адаптация для мобильных
  @media (max-width: 768px) {
    .photo-3d-modal {
      &__container {
        width: 90vw !important;
        height: 70vh !important;
      }
    }
  }
</style>
