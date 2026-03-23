<template>
  <div class="demo-spin">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width="90px"
      height="90px"
      class="icon"
      id="obj_3"
      fill="#5D1616"
    >
      <path
        d="M 9 3 A 1 1 0 0 0 8 4 L 8 21 A 1 1 0 0 0 9 22 A 1 1 0 0 0 9.796875 21.601562 L 12.919922 18.119141 L 16.382812 26.117188 C 16.701812 26.855187 17.566828 27.188469 18.298828 26.855469 C 19.020828 26.527469 19.340672 25.678078 19.013672 24.955078 L 15.439453 17.039062 L 21 17 A 1 1 0 0 0 22 16 A 1 1 0 0 0 21.628906 15.222656 L 9.7832031 3.3789062 A 1 1 0 0 0 9 3 z"
      />
    </svg>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted, ref } from "vue";

  const arrSin = new Array(360);
  const arrCos = new Array(360);

  for (let i = 0; i < 360; i++) {
    arrSin[i] = Math.sin((i * Math.PI) / 180);
    arrCos[i] = Math.cos((i * Math.PI) / 180);
  }

  const state = ref({
    x: 0,
    y: 0,
    r: 10,
    deg: 0,
    rinc: 1,
  });

  let animationFrameId = null;
  let lastTimestamp = 0;
  const intervalMs = 50;

  const animate = (timestamp) => {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
      return;
    }

    const elapsed = timestamp - lastTimestamp;

    if (elapsed >= intervalMs) {
      lastTimestamp = timestamp;

      const obj = document.getElementById("obj_3");
      if (obj) {
        const y = state.value.r * arrSin[state.value.deg];
        const x = state.value.r * arrCos[state.value.deg];

        obj.style.left = x + "px";
        obj.style.top = y + state.value.r + 10 + "px";
      }

      if (state.value.deg % 50 === 0) {
        state.value.r += state.value.rinc;
      }

      if (state.value.r > 50 || state.value.r < 10) {
        state.value.rinc *= -1;
        state.value.r += state.value.rinc;
      }

      state.value.deg += 12;
      if (state.value.deg >= 360) {
        state.value.deg = 0;
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    state.value = {
      x: 0,
      y: 0,
      r: 40,
      deg: 60,
      rinc: 1,
    };
    lastTimestamp = 0;
    animationFrameId = requestAnimationFrame(animate);
  };

  onMounted(() => {
    startAnimation();
  });

  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
</script>

<style scoped>
  .icon {
    position: absolute;
  }
</style>
