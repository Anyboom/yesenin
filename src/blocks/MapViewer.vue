<script setup lang="ts">
  import { onMounted, onUnmounted, ref, useTemplateRef } from "vue";

  const MIN_SCALE = 1;
  const MAX_SCALE = 100;
  const CONTAINER_WIDTH = 1224;
  const CONTAINER_HEIGHT = 772;

  const wrapperRef = useTemplateRef<HTMLDivElement>("mapWrapper");
  const imageRef = useTemplateRef<HTMLImageElement>("mapImage");

  const scale = ref(1);
  const position = ref({ x: 0, y: 0 });
  const isDragging = ref(false);
  const dragStart = ref({ x: 0, y: 0, posX: 0, posY: 0 });
  const imageDimensions = ref({ width: 0, height: 0 });

  const imageScaledWidth = () => imageDimensions.value.width * scale.value;
  const imageScaledHeight = () => imageDimensions.value.height * scale.value;

  function updateTransform() {
    if (!imageRef.value) return;

    imageRef.value.style.transform = `translate(${position.value.x}px, ${position.value.y}px) scale(${scale.value})`;
  }

  function clampPosition() {
    if (!imageRef.value || !imageDimensions.value.width) return;

    const scaledWidth = imageScaledWidth();
    const scaledHeight = imageScaledHeight();

    if (scaledWidth > CONTAINER_WIDTH) {
      const minX = CONTAINER_WIDTH - scaledWidth;
      const maxX = 0;
      position.value.x = Math.max(minX, Math.min(maxX, position.value.x));
    } else {
      position.value.x = (CONTAINER_WIDTH - scaledWidth) / 2;
    }

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

    if (wrapper) {
      wrapper.removeEventListener("mousedown", handleMouseDown);
      wrapper.removeEventListener("wheel", handleWheel);
    }

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  });
</script>

<template>
  <section
    id="map"
    class="map-viewer"
  >
    <div class="map-viewer__wrapper">
      <div class="map-viewer__inner">
        <div
          ref="mapWrapper"
          class="map-viewer__image-wrapper"
          :class="{ 'is-dragging': isDragging }"
        >
          <img
            ref="mapImage"
            src="/images/map-town.jpg"
            alt="Карта"
            class="map-viewer__image"
            @load="handleImageLoad"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @use "@/assets/styles/core";
  @use "@/assets/styles/mixins";

  .map-viewer {
    background: core.$color-alabaster;
    border: 4px solid core.$color-red-oxide;
    border-radius: core.$spacing-2;

    &__inner {
      width: 1224px;
      height: 770px;
      background: core.$color-red-oxide;
      overflow: hidden;
      position: relative;
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
