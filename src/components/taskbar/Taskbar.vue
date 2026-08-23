<script setup lang="ts">
import TaskbarApp from './TaskbarApp.vue';
import { type Application } from '../../data/desktop.ts';
// import { openApp } from '../../data/desktop'
// import { closeApp } from '../../data/desktop'
import { increaseZ } from '../../data/desktop'
import { zIndex } from '../../data/desktop'
import { openedApps } from '../../data/desktop'
import ManualOSLogo from "../../assets/ManualOS_nbg.png"


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

</script>

<template>
    <footer class="taskbar">
        <div class="start">
            <div class="start_button">
                <img class="start_button_image" :src="ManualOSLogo" alt="start button image">
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
        <div class="time">

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
.start_button{
    height: clamp(40px, 5vh, 70px);
    width: clamp(40px, 5vh, 70px);
    aspect-ratio: calc(1 / 1);
}
.start_button_image{
    
}
</style>