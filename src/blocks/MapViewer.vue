<script setup lang="ts">
  import { onMounted, onUnmounted, ref, useTemplateRef, computed } from "vue";

  const MIN_SCALE = 1;
  const MAX_SCALE = 100;
  const CONTAINER_WIDTH = 1224;
  const CONTAINER_HEIGHT = 772;

  const DEFAULT_SCALE = 10;
  const DEFAULT_POSITION = { x: -5310.990625856228, y: -5015.598696339521 };

  const wrapperRef = useTemplateRef<HTMLDivElement>("mapWrapper");
  const imageRef = useTemplateRef<HTMLImageElement>("mapImage");

  const scale = ref(DEFAULT_SCALE);
  const position = ref(DEFAULT_POSITION);
  const isDragging = ref(false);
  const dragStart = ref({ x: 0, y: 0, posX: 0, posY: 0 });
  const imageDimensions = ref({ width: 0, height: 0 });

  const actualImageSize = ref({ width: 0, height: 0 });
  const imageOffset = ref({ x: 0, y: 0 }); // Отступы из-за object-fit: contain

  interface MapLocation {
    id: number;
    x: number;
    y: number;
  }

  const locations = ref<MapLocation[]>([
    {
      id: 1,
      x: 9000,
      y: 8000,
    },
  ]);

  const activeLocation = ref<MapLocation | null>(null);
  const markersContainerRef = useTemplateRef<HTMLDivElement>("markersContainer");

  // Трансформация для контейнера маркеров
  const markersTransform = computed(() => {
    return `translate(${position.value.x}px, ${position.value.y}px) scale(${scale.value})`;
  });

  // Получаем позицию иконки с учетом отступов
  const getIconPosition = (location: MapLocation) => {
    // Координаты в пикселях относительно оригинального изображения
    // Нужно преобразовать их с учетом масштаба фактического изображения
    const scaleX = actualImageSize.value.width / imageDimensions.value.width;
    const scaleY = actualImageSize.value.height / imageDimensions.value.height;

    // Координаты на фактическом изображении
    const actualX = location.x * scaleX;
    const actualY = location.y * scaleY;

    return {
      left: `${actualX}px`,
      top: `${actualY}px`,
    };
  };

  // Вычисляем реальные размеры изображения после object-fit: contain
  function calculateActualImageSize() {
    if (!imageDimensions.value.width || !imageDimensions.value.height) {
      return { width: 0, height: 0 };
    }

    const imageAspect = imageDimensions.value.width / imageDimensions.value.height;
    const containerAspect = CONTAINER_WIDTH / CONTAINER_HEIGHT;

    let actualWidth, actualHeight;

    if (imageAspect > containerAspect) {
      actualWidth = CONTAINER_WIDTH;
      actualHeight = CONTAINER_WIDTH / imageAspect;
    } else {
      actualHeight = CONTAINER_HEIGHT;
      actualWidth = CONTAINER_HEIGHT * imageAspect;
    }

    return { width: actualWidth, height: actualHeight };
  }

  // Вычисляем отступы изображения в контейнере
  function calculateImageOffset() {
    return {
      x: (CONTAINER_WIDTH - actualImageSize.value.width) / 2,
      y: (CONTAINER_HEIGHT - actualImageSize.value.height) / 2,
    };
  }

  function updateTransform() {
    if (!imageRef.value) return;
    imageRef.value.style.transform = `translate(${position.value.x}px, ${position.value.y}px) scale(${scale.value})`;

    if (markersContainerRef.value) {
      markersContainerRef.value.style.transform = markersTransform.value;
    }
  }

  function handleImageLoad() {
    if (!imageRef.value) return;

    imageDimensions.value = {
      width: imageRef.value.naturalWidth,
      height: imageRef.value.naturalHeight,
    };

    actualImageSize.value = calculateActualImageSize();
    imageOffset.value = calculateImageOffset();

    scale.value = DEFAULT_SCALE;
    position.value = DEFAULT_POSITION;

    updateTransform();

    console.log("Image loaded:", {
      original: imageDimensions.value,
      actual: actualImageSize.value,
      offset: imageOffset.value,
    });
  }

  function handleMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest(".map-viewer__location-marker")) return;

    if (e.button !== 0 || !wrapperRef.value) return;

    e.preventDefault();
    isDragging.value = true;
    wrapperRef.value.classList.add("dragging");

    activeLocation.value = null;

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

    updateTransform();
  }

  function handleMouseUp() {
    if (!isDragging.value || !wrapperRef.value) return;

    isDragging.value = false;
    wrapperRef.value.classList.remove("dragging");
  }

  function handleWheel(e: WheelEvent) {
    if (!wrapperRef.value || !imageRef.value || !actualImageSize.value.width) return;

    e.preventDefault();

    const rect = wrapperRef.value.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const imageOffsetX = (CONTAINER_WIDTH - actualImageSize.value.width) / 2;
    const imageOffsetY = (CONTAINER_HEIGHT - actualImageSize.value.height) / 2;

    const mouseRelativeToImageX = mouseX - imageOffsetX;
    const mouseRelativeToImageY = mouseY - imageOffsetY;

    if (
      mouseRelativeToImageX >= 0 &&
      mouseRelativeToImageX <= actualImageSize.value.width &&
      mouseRelativeToImageY >= 0 &&
      mouseRelativeToImageY <= actualImageSize.value.height
    ) {
      const imageX = (mouseRelativeToImageX - position.value.x) / scale.value;
      const imageY = (mouseRelativeToImageY - position.value.y) / scale.value;

      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      let newScale = scale.value + delta;

      newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
      newScale = Math.round(newScale * 100) / 100;

      if (newScale !== scale.value) {
        const newX = mouseRelativeToImageX - imageX * newScale;
        const newY = mouseRelativeToImageY - imageY * newScale;

        position.value.x = newX;
        position.value.y = newY;
        scale.value = newScale;

        updateTransform();
      }
    }
  }

  function handleLocationClick(location: MapLocation, event: MouseEvent) {
    event.stopPropagation();
    activeLocation.value = activeLocation.value?.id === location.id ? null : location;
  }

  onMounted(() => {
    const wrapper = wrapperRef.value;
    if (!wrapper) return;

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

          <div
            ref="markersContainer"
            class="map-viewer__markers-container"
            :style="{ transform: markersTransform }"
          >
            <div
              v-for="location in locations"
              :key="location.id"
              class="map-viewer__location-marker"
              :style="getIconPosition(location)"
              @click.stop="handleLocationClick(location, $event)"
            >
              <div class="map-viewer__marker-icon">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    fill="#5D1616"
                    stroke="#5D1616"
                    stroke-width="2"
                  />
                  <circle
                    cx="12"
                    cy="9"
                    r="3"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
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
      overflow: hidden;

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

    &__markers-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform-origin: 0 0;
      will-change: transform;
      pointer-events: none;
    }

    &__location-marker {
      position: absolute;
      cursor: pointer;
      transform: translate(-50%, -50%);
      z-index: 10;
      pointer-events: auto;
      transition: transform 0.2s ease;

      &:hover {
        transform: translate(-50%, -50%) scale(1.1);
      }
    }

    &__marker-icon {
      position: relative;

      svg {
        transition: all 0.2s ease;
        display: block;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
      }
    }
  }
</style>
