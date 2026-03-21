<script setup lang="ts">
  import { onMounted, onUnmounted, ref, useTemplateRef } from "vue";

  // Константы
  const MIN_SCALE = 1;
  const MAX_SCALE = 5;
  const CONTAINER_WIDTH = 519;
  const CONTAINER_HEIGHT = 772;

  // Refs
  const wrapperRef = useTemplateRef<HTMLDivElement>("mapWrapper");
  const imageRef = useTemplateRef<HTMLImageElement>("mapImage");

  // Состояние
  const scale = ref(1);
  const position = ref({ x: 0, y: 0 });
  const isDragging = ref(false);
  const dragStart = ref({ x: 0, y: 0, posX: 0, posY: 0 });
  const imageDimensions = ref({ width: 0, height: 0 });

  // Вычисляемые значения
  const imageScaledWidth = () => imageDimensions.value.width * scale.value;
  const imageScaledHeight = () => imageDimensions.value.height * scale.value;

  // Методы
  function updateTransform() {
    if (!imageRef.value) return;

    imageRef.value.style.transform = `translate(${position.value.x}px, ${position.value.y}px) scale(${scale.value})`;
  }

  function clampPosition() {
    if (!imageRef.value || !imageDimensions.value.width) return;

    const scaledWidth = imageScaledWidth();
    const scaledHeight = imageScaledHeight();

    // Ограничение по X
    if (scaledWidth > CONTAINER_WIDTH) {
      const minX = CONTAINER_WIDTH - scaledWidth;
      const maxX = 0;
      position.value.x = Math.max(minX, Math.min(maxX, position.value.x));
    } else {
      position.value.x = (CONTAINER_WIDTH - scaledWidth) / 2;
    }

    // Ограничение по Y
    if (scaledHeight > CONTAINER_HEIGHT) {
      const minY = CONTAINER_HEIGHT - scaledHeight;
      const maxY = 0;
      position.value.y = Math.max(minY, Math.min(maxY, position.value.y));
    } else {
      position.value.y = (CONTAINER_HEIGHT - scaledHeight) / 2;
    }
  }

  function handleImageLoad() {
    if (!imageRef.value) return;

    imageDimensions.value = {
      width: imageRef.value.naturalWidth,
      height: imageRef.value.naturalHeight,
    };

    // Центрируем если изображение меньше контейнера
    if (imageDimensions.value.width < CONTAINER_WIDTH) {
      position.value.x = (CONTAINER_WIDTH - imageDimensions.value.width) / 2;
    }

    if (imageDimensions.value.height < CONTAINER_HEIGHT) {
      position.value.y = (CONTAINER_HEIGHT - imageDimensions.value.height) / 2;
    }

    updateTransform();
  }

  function handleMouseDown(e: MouseEvent) {
    if (e.button !== 0 || !wrapperRef.value) return;

    e.preventDefault();
    isDragging.value = true;
    wrapperRef.value.classList.add("dragging");

    dragStart.value = {
      x: e.clientX,
      y: e.clientY,
      posX: position.value.x,
      posY: position.value.y,
    };
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging.value) return;

    e.preventDefault();

    position.value.x = dragStart.value.posX + (e.clientX - dragStart.value.x);
    position.value.y = dragStart.value.posY + (e.clientY - dragStart.value.y);

    clampPosition();
    updateTransform();
  }

  function handleMouseUp() {
    if (!isDragging.value || !wrapperRef.value) return;

    isDragging.value = false;
    wrapperRef.value.classList.remove("dragging");
  }

  function handleWheel(e: WheelEvent) {
    if (!wrapperRef.value || !imageRef.value || !imageDimensions.value.width) return;

    e.preventDefault();

    const rect = wrapperRef.value.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Координаты мыши относительно изображения
    const imageX = (mouseX - position.value.x) / scale.value;
    const imageY = (mouseY - position.value.y) / scale.value;

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale.value + delta));

    if (newScale !== scale.value) {
      // Масштабируем относительно позиции мыши
      position.value.x = mouseX - imageX * newScale;
      position.value.y = mouseY - imageY * newScale;

      scale.value = newScale;
      clampPosition();
      updateTransform();
    }
  }

  // Жизненный цикл
  onMounted(() => {
    const wrapper = wrapperRef.value;
    if (!wrapper) return;

    // Добавляем обработчики
    wrapper.addEventListener("mousedown", handleMouseDown);
    wrapper.addEventListener("wheel", handleWheel, { passive: false });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  });

  onUnmounted(() => {
    const wrapper = wrapperRef.value;

    // Убираем обработчики
    if (wrapper) {
      wrapper.removeEventListener("mousedown", handleMouseDown);
      wrapper.removeEventListener("wheel", handleWheel);
    }

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  });
</script>

<template>
  <section class="map-viewer">
    <div class="container">
      <div class="map-viewer__wrapper">
        <h2 class="map-viewer__title">Карта</h2>

        <div class="map-viewer__inner">
          <div
            ref="mapWrapper"
            class="map-viewer__image-wrapper"
            :class="{ 'is-dragging': isDragging }"
          >
            <img
              ref="mapImage"
              src="/images/map-town.png"
              alt="Карта"
              class="map-viewer__image"
              @load="handleImageLoad"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @use "@/assets/styles/core";
  @use "@/assets/styles/mixins";

  .map-viewer {
    padding: core.$spacing-8 0;
    background: core.$color-alabaster;

    &__title {
      text-align: center;
      @include mixins.apply-text("heading-2");
      margin-bottom: core.$spacing-6;
    }

    &__inner {
      width: 519px;
      height: 770px;
      background: core.$color-red-oxide;
      border: 4px solid core.$color-red-oxide;
      border-radius: core.$spacing-2;
      overflow: hidden;
      position: relative;
      margin: 0 auto;
    }

    &__image-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      cursor: grab;
      user-select: none;

      &.is-dragging {
        cursor: grabbing;
      }
    }

    &__image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: contain;
      transform-origin: 0 0;
      pointer-events: none;
      will-change: transform;
    }
  }
</style>
