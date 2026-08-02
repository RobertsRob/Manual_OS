<script setup lang="ts">

import { ref } from 'vue'
import Wallpaper from './Wallpaper.vue'
import Icons from './Icons.vue'
import Window from './Window.vue'
import type { Application } from "../../data/desktop"

const openedApps = ref<Application[]>([])

function openApp(app: Application) {
  console.log("Desktop opening:", app.name)
  
  openedApps.value.push(app)
}

</script>

<template>
  <section class="desktop">
    <Wallpaper />
    <Icons @open="openApp"/>

    <Window 
      v-for="app in openedApps"
      :key="app.name"
      :title="app.name"
      :icon="app.src"
      :component="app.component"
    />
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
.desktop :deep(.window) {
  z-index: 5;
}
</style>