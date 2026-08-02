<script setup lang="ts">
import TaskbarApp from './TaskbarApp.vue';

const taskbarApps = [
    {
        name:"GitHub",
        src: "https://freepnglogo.com/images/all_img/github-logo-white-stroke-2a6c.png",
        shortcut: "C/sdb/cc"
    },
    {
        name:"File Explorer",
        src: "https://winaero.com/blog/wp-content/uploads/2018/12/file-explorer-folder-libraries-icon-18298.png",
        shortcut: "C/sdb/ccd"
    }
]

</script>

<template>
    <footer class="taskbar">
        <TaskbarApp 
            v-for="taskbarApp in taskbarApps"
            :key="taskbarApp.name"
            :taskbarApp="taskbarApp"
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