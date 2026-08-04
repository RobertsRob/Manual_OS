<script setup lang="ts">
import TaskbarApp from './TaskbarApp.vue';
import { type Application } from '../../data/desktop.ts';

const props = defineProps<{
    openedApps: Application[]
    zIndex: number
}>()

function taskbarAppClick(app: Application){
    emit("increaseZ")
    props.openedApps.forEach(appOpened => {
        if(appOpened.id == app.id){
            app.zIndex = props.zIndex
            app.minimized = false
        }
    });
}

function highestZIndex(){
    if(props.openedApps.length === 0) return -1
    return Math.max(...props.openedApps.map(app => app.zIndex ?? 0))
}

const emit = defineEmits<{
    (e: 'increaseZ'): void
}>()

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