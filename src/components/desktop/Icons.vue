<script setup lang="ts">
import Icon from './Icon.vue'

const icons = [
    {
    name: "Trash bin",
    src: "https://cdn-icons-png.flaticon.com/512/4021/4021663.png",
    shortcut: "C/abc/abcd",
    position: [0, 0]
    },
    {
    name: "Google Chrome",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/3840px-Google_Chrome_icon_%28February_2022%29.svg.png",
    shortcut: "C/abc/abc",
    position: [0, 9.5]
    }
]
</script>

<template>
    <div class="icons">
        <Icon 
            v-for="icon in icons"
            :key="icon.name"
            :icon="icon" 
        />
    </div>
</template>

<style scoped>
    .icons{
        width: 100%;
        height: 100%;
    }
</style>