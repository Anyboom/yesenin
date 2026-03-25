<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";
  import { Vue3Lottie } from "vue3-lottie";
  // @ts-ignore
  import CursorRotate from "@/components/CursorRotate.vue";

  interface Props {
    frontImage: string;
    thumbnailImage?: string;
    alt?: string;
    thumbnailWidth?: string;
    thumbnailHeight?: string;
    modalWidth?: string;
    modalHeight?: string;
    first?: boolean;
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
    if (isDragging.value) {
      return;
    }

    isModalOpen.value = false;
    document.body.style.overflow = "";
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
    setTimeout(() => {
      isDragging.value = false;
    }, 10);
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
    setTimeout(() => {
      isDragging.value = false;
    }, 10);
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

  const icon = {
    "v": "5.6.5",
    "fr": 24,
    "ip": 0,
    "op": 28,
    "w": 30,
    "h": 30,
    "nm": "cursor",
    "ddd": 0,
    "assets": [],
    "layers": [
      {
        "ddd": 0,
        "ind": 1,
        "ty": 4,
        "nm": "Click",
        "sr": 1,
        "ks": {
          "o": {
            "a": 1,
            "k": [
              { "i": { "x": [0.667], "y": [1] }, "o": { "x": [0.333], "y": [0] }, "t": 12, "s": [100] },
              { "t": 23, "s": [0] },
            ],
            "ix": 11,
          },
          "r": { "a": 0, "k": 0, "ix": 10 },
          "p": { "a": 0, "k": [6.394, 7.037, 0], "ix": 2 },
          "a": { "a": 0, "k": [-13.781, -18.969, 0], "ix": 1 },
          "s": { "a": 0, "k": [89.198, 89.198, 100], "ix": 6 },
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "d": 1,
                "ty": "el",
                "s": {
                  "a": 1,
                  "k": [
                    {
                      "i": { "x": [0.667, 0.667], "y": [1, 1] },
                      "o": { "x": [0.333, 0.333], "y": [0, 0] },
                      "t": 11,
                      "s": [0, 0],
                    },
                    { "t": 24, "s": [10, 10] },
                  ],
                  "ix": 2,
                },
                "p": { "a": 0, "k": [0, 0], "ix": 3 },
                "nm": "Ellipse Path 1",
                "mn": "ADBE Vector Shape - Ellipse",
                "hd": false,
              },
              {
                "ty": "st",
                "c": { "a": 0, "k": [0.3647, 0.0863, 0.0863, 1], "ix": 3 },
                "o": { "a": 0, "k": 100, "ix": 4 },
                "w": { "a": 0, "k": 2, "ix": 5 },
                "lc": 1,
                "lj": 1,
                "ml": 4,
                "bm": 0,
                "nm": "Stroke 1",
                "mn": "ADBE Vector Graphic - Stroke",
                "hd": false,
              },
              {
                "ty": "tr",
                "p": { "a": 0, "k": [-14.377, -20.615], "ix": 2 },
                "a": { "a": 0, "k": [0, 0], "ix": 1 },
                "s": { "a": 0, "k": [100, 100], "ix": 3 },
                "r": { "a": 0, "k": 0, "ix": 6 },
                "o": { "a": 0, "k": 100, "ix": 7 },
                "sk": { "a": 0, "k": 0, "ix": 4 },
                "sa": { "a": 0, "k": 0, "ix": 5 },
                "nm": "Transform",
              },
            ],
            "nm": "Ellipse 1",
            "np": 3,
            "cix": 2,
            "bm": 0,
            "ix": 1,
            "mn": "ADBE Vector Group",
            "hd": false,
          },
        ],
        "ip": 11,
        "op": 28,
        "st": 0,
        "bm": 0,
      },
      {
        "ddd": 0,
        "ind": 2,
        "ty": 4,
        "nm": "cursor Outlines",
        "sr": 1,
        "ks": {
          "o": { "a": 0, "k": 100, "ix": 11 },
          "r": { "a": 0, "k": 0, "ix": 10 },
          "p": {
            "a": 1,
            "k": [
              {
                "i": { "x": 0.833, "y": 0.833 },
                "o": { "x": 0.167, "y": 0.167 },
                "t": 3,
                "s": [15, 15, 0],
                "to": [-0.667, 0, 0],
                "ti": [0.667, 0, 0],
              },
              {
                "i": { "x": 0.833, "y": 0.833 },
                "o": { "x": 0.167, "y": 0.167 },
                "t": 10,
                "s": [11, 15, 0],
                "to": [0, 0, 0],
                "ti": [0, 0, 0],
              },
              {
                "i": { "x": 0.833, "y": 0.833 },
                "o": { "x": 0.167, "y": 0.167 },
                "t": 14,
                "s": [11, 15, 0],
                "to": [0.667, 0, 0],
                "ti": [-0.667, 0, 0],
              },
              { "t": 24, "s": [15, 15, 0] },
            ],
            "ix": 2,
          },
          "a": { "a": 0, "k": [15, 15, 0], "ix": 1 },
          "s": {
            "a": 1,
            "k": [
              {
                "i": { "x": [0.833, 0.833, 0.833], "y": [0.833, 0.833, 0.833] },
                "o": { "x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167] },
                "t": 7,
                "s": [100, 100, 100],
              },
              {
                "i": { "x": [0.833, 0.833, 0.833], "y": [0.833, 0.833, 0.833] },
                "o": { "x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167] },
                "t": 12,
                "s": [80, 80, 100],
              },
              { "t": 18, "s": [100, 100, 100] },
            ],
            "ix": 6,
          },
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "ind": 0,
                "ty": "sh",
                "ix": 1,
                "ks": {
                  "a": 0,
                  "k": {
                    "i": [
                      [0.204, 0.183],
                      [0, 0],
                      [0, 0],
                      [0.015, 0.013],
                      [0, 0],
                      [0, 0],
                      [0.237, 0],
                      [0, -0.552],
                      [0, 0],
                      [-0.552, 0],
                      [-0.183, 0.204],
                      [0, 0],
                      [0, 0],
                      [0, 0],
                      [-0.732, 0.333],
                      [0.327, 0.723],
                      [0, 0],
                      [0, 0],
                      [0, 0.552],
                    ],
                    "o": [
                      [0, 0],
                      [0, 0],
                      [-0.014, -0.015],
                      [0, 0],
                      [0, 0],
                      [-0.172, -0.137],
                      [-0.552, 0],
                      [0, 0],
                      [0, 0.552],
                      [0.295, 0],
                      [0, 0],
                      [0, 0],
                      [0, 0],
                      [0.319, 0.738],
                      [0.721, -0.328],
                      [0, 0],
                      [0, 0],
                      [0.553, 0],
                      [0, -0.296],
                    ],
                    "v": [
                      [6.662, 0.169],
                      [6.664, 0.163],
                      [-5.276, -11.775],
                      [-5.318, -11.818],
                      [-5.369, -11.87],
                      [-5.383, -11.863],
                      [-6, -12.094],
                      [-7, -11.094],
                      [-7, 5.906],
                      [-6, 6.906],
                      [-5.263, 6.568],
                      [-5.257, 6.572],
                      [-2.08, 3.027],
                      [1.383, 11.023],
                      [3.298, 11.762],
                      [4.013, 9.861],
                      [0.44, 1.947],
                      [6, 1.906],
                      [7, 0.906],
                    ],
                    "c": true,
                  },
                  "ix": 2,
                },
                "nm": "Path 1",
                "mn": "ADBE Vector Shape - Group",
                "hd": false,
              },
              {
                "ty": "fl",
                "c": { "a": 0, "k": [0.3647, 0.0863, 0.0863, 1], "ix": 4 },
                "o": { "a": 0, "k": 100, "ix": 5 },
                "r": 1,
                "bm": 0,
                "nm": "Fill 1",
                "mn": "ADBE Vector Graphic - Fill",
                "hd": false,
              },
              {
                "ty": "tr",
                "p": { "a": 0, "k": [15, 15.094], "ix": 2 },
                "a": { "a": 0, "k": [0, 0], "ix": 1 },
                "s": { "a": 0, "k": [100, 100], "ix": 3 },
                "r": { "a": 0, "k": 0, "ix": 6 },
                "o": { "a": 0, "k": 100, "ix": 7 },
                "sk": { "a": 0, "k": 0, "ix": 4 },
                "sa": { "a": 0, "k": 0, "ix": 5 },
                "nm": "Transform",
              },
            ],
            "nm": "Group 1",
            "np": 2,
            "cix": 2,
            "bm": 0,
            "ix": 1,
            "mn": "ADBE Vector Group",
            "hd": false,
          },
        ],
        "ip": 0,
        "op": 28,
        "st": 0,
        "bm": 0,
      },
    ],
    "markers": [],
  };

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
      <Vue3Lottie
        v-if="first"
        class="photo-3d-wrapper__icon-lottie"
        :animationData="icon"
        :height="64"
        :width="64"
      />
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isModalOpen"
          class="photo-3d-modal"
          :style="{
            '--modalHeight': modalHeight,
            '--modalWidth': modalWidth,
          }"
        >
          <div class="photo-3d-modal__content">
            <div
              ref="photo3dRef"
              class="photo-3d-modal__container"
              :class="{ 'photo-3d-modal__container--grabbing': isDragging }"
              v-click-away="closeModal"
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
            <CursorRotate
              v-if="first"
              class="photo-3d-wrapper__icon-lottie-inner"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
  .photo-3d-wrapper {
    display: inline-block;
    position: relative;

    &__icon-lottie {
      position: absolute;
      bottom: -30px;
      right: 0;
    }

    &__icon-lottie-inner {
      position: absolute;
      right: 35%;
      bottom: 36%;
      width: 100px;
    }

    &__thumbnail {
      cursor: pointer;
      border-radius: 12px;
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
      border-radius: 12px;
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
      position: relative;
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
      border-radius: 12px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);

      &--front {
        background: #fff;
      }

      &--back {
        transform: rotateY(180deg);
        background-image: url("/images/blocks/fallback.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
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
