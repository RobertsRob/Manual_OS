<script setup lang="ts">
import Desktop from './components/desktop/Desktop.vue'
import Taskbar from './components/taskbar/Taskbar.vue'
import LockScreen from './components/lockscreen/LockScreen.vue'
import { isManual, username, booting_screen, booting_output_type_indx } from './data/user.ts'
import BootingScreen from './components/bootingscreen/BootingScreen.vue'

import { ref } from "vue"

const activeOS = ref(false)
// const booted = ref(true)

function handleUnlock(isMF: boolean, usern: string) {
  isManual.value = isMF
  username.value = usern
  activeOS.value = true
}

</script>

<template>
  <div class="booting_screen" :class="{hidden: !booting_screen}">
    <BootingScreen :outputTypeIndx="booting_output_type_indx"/>
  </div>
  <div class="os" :class="{ visible: !booting_screen }">
    <LockScreen :class="{ hidden: activeOS }" @unlock="handleUnlock" class="transitional" />
    <main class="os_pl transitional" :class="{ visible: activeOS }">
      <Desktop />
      <Taskbar />
    </main>
  </div>
  
</template>


<style scoped>
.os, .os_pl {
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

.transitional.visible, .os.visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.transitional.hidden, .booting_screen.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.lockScreen, .os_pl, .booting_screen {
  position: fixed;
  inset: 0;
}
</style>