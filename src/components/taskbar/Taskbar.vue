<script setup lang="ts">
import TaskbarApp from './TaskbarApp.vue';
import { type Application } from '../../data/desktop.ts';
// import { openApp } from '../../data/desktop'
// import { closeApp } from '../../data/desktop'
import { increaseZ } from '../../data/desktop'
import { zIndex } from '../../data/desktop'
import { openedApps } from '../../data/desktop'
import ManualOSLogo from "../../assets/ManualOS_nbg.png"
import { ref, onMounted, onUnmounted } from 'vue';

const time = ref('')
const date = ref('')

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

function taskbarAppClick(app: Application){
    increaseZ()
    openedApps.value.forEach(appOpened => {
        if(appOpened.id == app.id){
            app.zIndex = zIndex.value
            app.minimized = false
        }
    });
}

function highestZIndex(){
    if(openedApps.value.length === 0) return -1
    return Math.max(...openedApps.value.map(app => app.zIndex ?? 0))
}

function updateDateTime() {
  const now = new Date()

  time.value = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(now).replace(/\//g, ':')

  date.value = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(now).replace(/\//g, ':')
}

let interval: ReturnType<typeof setInterval>

onMounted(() => {
  updateDateTime()
  interval = setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

</script>

<template>
    <footer class="taskbar">
        <div class="start">
            <div class="start_button">
                <img class="start_button_image" :src="ManualOSLogo" alt="start button image" draggable="false">
            </div>
        </div>
        <div class="taskbar_apps">
            <TaskbarApp 
                v-for="taskbarApp in openedApps"
                :key="taskbarApp.name"
                :taskbarApp="taskbarApp"
                @mousedown="taskbarAppClick(taskbarApp)"
                :active="taskbarApp.zIndex === highestZIndex()"
            />  
        </div>
        <div class="time font_date_time">
            {{time}}
            {{date}}
        </div>
    </footer>
</template>

<style scoped>
.taskbar {
    display: flex;
    width: 100%;
    height: clamp(40px, 5vh, 70px);
    user-select: none;
}
.start_button {
    height: clamp(40px, 5vh, 70px);
    width: clamp(40px, 5vh, 70px);
    aspect-ratio: 1 / 1;

    display: flex;
    align-items: center;
    justify-content: center;
}

.start_button_image {
    height: 80%;
    width: 80%;
    object-fit: contain;
}
.taskbar_apps{
    display: flex;
    width: calc(94% - clamp(40px, 5vh, 70px));
    height: clamp(40px, 5vh, 70px);
    user-select: none;
    /* background-color: #fff; */
}
.time{
    display: flex;
    height: clamp(40px, 5vh, 70px);
    user-select: none;
    width: clamp(100px, 9vw, 140px);
    /* background-color: #78f07a; */
    overflow: hidden;
}
.font_date_time{
    display: block;
    color: white;
    font-family: "DejaVu Sans Mono", "Liberation Mono", "Ubuntu Mono", "Noto Sans Mono", monospace;
    font-size: 1.5vh;
    line-height: 2.5vh;
}
</style>