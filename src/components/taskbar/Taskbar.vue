<script setup lang="ts">
import TaskbarApp from './TaskbarApp.vue';
import { type Application } from '../../data/desktop.ts';
// import { openApp } from '../../data/desktop'
// import { closeApp } from '../../data/desktop'
import { increaseZ } from '../../data/desktop'
import { zIndex } from '../../data/desktop'
import { openedApps } from '../../data/desktop'


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
        <TaskbarApp 
            v-for="taskbarApp in openedApps"
            :key="taskbarApp.name"
            :taskbarApp="taskbarApp"
            @mousedown="taskbarAppClick(taskbarApp)"
            :active="taskbarApp.zIndex === highestZIndex()"
        />
    </footer>
</template>

<style scoped>
.taskbar {
    display: flex;
    width: 100%;
    height: clamp(40px, 5vh, 70px);
    user-select: none;
}
</style>