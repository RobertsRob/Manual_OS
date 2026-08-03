<script setup lang="ts">

import { ref, type App, onMounted, onUnmounted } from 'vue'
import Wallpaper from './Wallpaper.vue'
import Icons from './Icons.vue'
import Window from './Window.vue'
import type { Application } from "../../data/desktop"
import { applications } from "../../data/desktop"

const openedApps = ref<Application[]>([])
let zIndex = 1
let id = 0

function openApp(app: Application) {
    openedApps.value.push({
        ...app,
        id: id++,
        zIndex: zIndex++,
        position: [...app.position] as [number, number],
        size: [...app.size] as [number, number]
    })
}

function closeApp(app: Application) {
    openedApps.value = openedApps.value.filter(
        a => a.id !== app.id
    )
}

function bringToTheFront(app: Application) {
    app.zIndex = zIndex++
}

function bringToTheBack(app: Application) {
    app.zIndex = -1
}

function maximize(app: Application) {
  bringToTheFront(app)

  const taskbarHeight = Math.min(
      Math.max(window.innerHeight * 0.05, 40),
      70
  )

  app.position = [0, 0]
  app.size = [
      window.innerWidth,
      window.innerHeight - taskbarHeight
  ]
}

function part_screen(app: Application){
  bringToTheFront(app)
  const originalApp = applications.find(
    a => a.name === app.name
  )

  if (originalApp) {
    app.size = [
      originalApp.size[0],
      originalApp.size[1]
    ]
  }
}


</script>

<template>
  <section class="desktop">
    <Wallpaper />
    <Icons @open="openApp"/>

    <Window 
      v-for="app in openedApps"
      :key="app.id"
      :title="app.name"
      :icon="app.src"
      :size="app.size"
      :zIndex="app.zIndex"
      :component="app.component"
      :position="app.position"
      @close="closeApp(app)"
      @minimize="bringToTheBack(app)"
      @full_screen="maximize(app)"
      @part_screen="part_screen(app)"
      @mousedown="bringToTheFront(app)"
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