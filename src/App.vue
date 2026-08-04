<script setup lang="ts">
import Desktop from './components/desktop/Desktop.vue'
import Taskbar from './components/taskbar/Taskbar.vue'

import { ref } from "vue"
import type { Application } from "./data/desktop.ts"


const zIndex = ref(1)
const openedApps = ref<Application[]>([])

function closeApp(app: Application) {
  openedApps.value = openedApps.value.filter(
      a => a.id !== app.id
  )
}

function increaseZ() {
  zIndex.value++
}

</script>

<template>
  <main class="os">
    <Desktop :openedApps="openedApps" :zIndex="zIndex" @close="closeApp" @increaseZ="increaseZ" />
    <Taskbar :openedApps="openedApps" :zIndex="zIndex" @increaseZ="increaseZ" />
  </main>
</template>


<style>
.os{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>