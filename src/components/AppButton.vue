<script setup lang="ts">
  const emit = defineEmits<{
    click: [];
  }>();

  const { disabled = false, href = undefined } = defineProps<{
    disabled?: boolean;
    href?: string;
    target?: "_blank" | "_parent" | "_top" | "_self";
  }>();

  function handleClick() {
    if (disabled) {
      return;
    }

    emit("click");
  }

  const tag = href ? "a" : "button";
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :target="target"
    class="button"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
  @use "@/assets/styles/mixins";
  @use "@/assets/styles/core";
  @use "sass:color";

  .button {
    text-transform: uppercase;
    border-radius: core.$spacing-1;
    background: core.$color-red-oxide;
    padding: core.$spacing-1;
    display: flex;
    place-items: center;

    font-size: 14px;

    color: core.$color-white;
    font-weight: 600;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    @include mixins.hover {
      &:not(:disabled) {
        background: color.adjust(core.$color-red-oxide, $lightness: -5%);
      }
    }
  }
</style>
