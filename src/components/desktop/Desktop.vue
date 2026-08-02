<script setup lang="ts">
// import { ref } from 'vue'
import Wallpaper from './Wallpaper.vue'
import Icons from './Icons.vue'

// const count = ref(0)

// function increase() {
//   count.value++;
// }
</script>

<template>
  <section class="desktop">
    <Wallpaper />
    <Icons />
  </section>
</template>

<style scoped>
.desktop {
  user-select: none;
  position: relative;
  width: 100%;
  height: calc(100vh - clamp(40px, 5vh, 70px));
  overflow: hidden;
}
.desktop :deep(.wallpaper) {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.desktop :deep(.icons) {
  position: relative;
  z-index: 1;
}
</style>