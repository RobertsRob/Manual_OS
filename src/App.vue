<script setup lang="ts">
import Desktop from './components/desktop/Desktop.vue'
import Taskbar from './components/taskbar/Taskbar.vue'
import LockScreen from './components/lockscreen/LockScreen.vue'
import { isManual, username } from './data/user.ts'

import { ref } from "vue"
import type { Application } from "./data/desktop.ts"


const zIndex = ref(1)
const openedApps = ref<Application[]>([])
const activeOS = ref(false)

function closeApp(app: Application) {
  openedApps.value = openedApps.value.filter(
    a => a.id !== app.id
  )
}

function increaseZ() {
  zIndex.value++
}

function handleUnlock(isMF: boolean, usern: string) {
  isManual.value = isMF
  username.value = usern
  activeOS.value = true
}

</script>

<template>
  <LockScreen :class="{ hidden: activeOS }" @unlock="handleUnlock" class="transitional" />
  <main class="os transitional" :class="{ visible: activeOS }">
    <Desktop :openedApps="openedApps" :zIndex="zIndex" @close="closeApp" @increaseZ="increaseZ" />
    <Taskbar :openedApps="openedApps" :zIndex="zIndex" @increaseZ="increaseZ" />
  </main>
</template>


<style scoped>
.os {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.transitional {
  transition:
    opacity 2s ease,
    visibility 2s ease;
}

.transitional.visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.transitional.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.lockScreen, .os {
  position: fixed;
  inset: 0;
}
</style>