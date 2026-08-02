<script setup lang="ts">
import Desktop from './components/desktop/Desktop.vue'
import Taskbar from './components/taskbar/Taskbar.vue'
</script>

<template>
  <main class="os">
    <Desktop />
    <Taskbar />
  </main>
</template>


<style>
.os{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>