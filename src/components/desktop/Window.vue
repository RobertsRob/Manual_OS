<script setup lang="ts">
import { ref } from 'vue';
import type { Component } from 'vue';

defineProps<{
    title: string
    icon: string
    component: Component
}>()

const dragging = ref(false)
const position = ref([100, 100])
const startPos = ref([0, 0])
const startWindowPos = ref([0, 0])

function move(event: MouseEvent) {
    console.log(1)
    if(dragging.value){
        position.value[0] = startWindowPos.value[0] + event.clientX - startPos.value[0]
        position.value[1] = startWindowPos.value[1] + event.clientY - startPos.value[1]
    }
}

function startDrag(event: MouseEvent) {
    console.log(223)
    dragging.value = true
    startPos.value = [
        event.clientX ,
        event.clientY 
    ]
    startWindowPos.value = [
        position.value[0],
        position.value[1]
    ]

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', stopDrag)
}

function stopDrag() {
    dragging.value = false

    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', stopDrag)
}

</script>

<template>
    <div class="window"
    :style="{
        left: `${position[0]}px`,
        top: `${position[1]}px`,
    }">
        <header>
            <div class="left_part" @mousedown="startDrag($event)">
                <img  :src="icon" :alt="title" class="icon_app" draggable="false">
                {{ title }}
            </div>
        </header>
        <component :is="component"/>
    </div>
</template>

<style scoped>
header{
    display: flex;
    background-color: #414040d8;
    text-align: left;
    height: 30px;
    border-radius: 6px 6px 0 0;
}
.left_part{
    display: flex;
    width: 80%;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: white;
}
.icon_app{
    height: 18px;
    width: auto;
    aspect-ratio: 1 / 1;
    margin-left: 4px;
}
.window {
    position: absolute;
    top: 100px;
    left: 100px;
    width: 800px;
    height: 600px;
    background: rgba(58, 58, 58, 0.473);
    border-radius: 6px;
}
</style>