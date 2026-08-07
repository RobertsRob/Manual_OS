<script setup lang="ts">

// import { ref } from 'vue'
import Wallpaper from './Wallpaper.vue'
import Icons from './Icons.vue'
import Window from './Window.vue'
import type { Application } from "../../data/desktop"
import { applications } from "../../data/desktop"

// const openedApps = ref<Application[]>([])
const props = defineProps<{
  openedApps: Application[]
  zIndex: number
}>()

let id = 0

function openApp(app: Application) {
  emit('increaseZ')
  props.openedApps.push({
    ...app,
    id: id++,
    zIndex: props.zIndex,
    position: [...app.position] as [number, number],
    size: [...app.size] as [number, number]
  })
}

const emit = defineEmits<{
  (e: 'close', app: Application): void
  (e: 'increaseZ'): void
}>()

function bringToTheFront(app: Application) {
  emit('increaseZ')
  app.zIndex = props.zIndex
}

function bringToTheBack(app: Application) {
  app.minimized = true
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

function highestZIndex(){
    if(props.openedApps.length === 0) return -1
    return Math.max(...props.openedApps.map(app => app.zIndex ?? 0))
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
      :active="app.zIndex === highestZIndex()"
      @close="emit('close', app)"
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