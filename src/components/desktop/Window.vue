<script setup lang="ts">
import { ref } from 'vue';
import type { Component } from 'vue';
import fullPartImage from "../../assets/full_part.png"
import minimize from "../../assets/minimize.png"
import closeImage from "../../assets/close.png"

const props = defineProps<{
    title: string
    icon: string
    size: [number, number]
    position: [number, number]
    zIndex?: number
    component: Component
    active: boolean
}>()

const dragging = ref(false)
const position = ref(props.position)
const startPos = ref([0, 0])
const startWindowPos = ref([0, 0])
const isMaximized = ref(false)
const nonMaxPos = ref(props.position)

function move(event: MouseEvent) {
    if(dragging.value){
        position.value[0] = startWindowPos.value[0] + event.clientX - startPos.value[0]
        position.value[1] = startWindowPos.value[1] + event.clientY - startPos.value[1]
    }
}

function startDrag(event: MouseEvent) {
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

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'minimize'): void
    (e: 'full_screen'): void
    (e: 'part_screen'): void
}>()

function full_part_screen(){
    isMaximized.value = !isMaximized.value
    if(isMaximized.value){
        nonMaxPos.value = position.value;
        position.value = [0, 0]
        emit('full_screen')
    }else{
        position.value = nonMaxPos.value;
        emit('part_screen')
    }
    
}

</script>

<template>
    <div class="window"
    :style="{
        left: `${position[0]}px`,
        top: `${position[1]}px`,
        width: `${size[0]}px`,
        height: `calc(${size[1]}px)`,
        zIndex: zIndex
    }">
        <header>
            <div class="left_part" @mousedown="startDrag($event)">
                <img  :src="icon" :alt="title" class="icon_app" draggable="false">
                {{ title }}
            </div>
            <div class="right_part">
                <div class="minimize" @click="emit('minimize')"><img class="icon_window" :src="minimize" draggable="false"></div>
                <div class="full_part_screen" @click="full_part_screen()"><img class="icon_window" :src="fullPartImage" draggable="false"></div>
                <div class="close" @click="emit('close')"><img class="icon_window" :src="closeImage" draggable="false"></div>
            </div>
        </header>
        <component :is="component" :active="props.active"/>
    </div>
</template>

<style scoped>
header{
    backdrop-filter: blur(5px);
    display: flex;
    background-color: #414040b7;
    text-align: left;
    height: 30px;
    border-radius: 6px 6px 0 0;
}
.left_part{
    display: flex;
    width: calc(100% - 135px);
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
    overflow: hidden;
    position: absolute;
    top: 100px;
    left: 100px;
    background: rgba(58, 58, 58, 0.473);
    border-radius: 6px;
}
.right_part{
    display: flex;
    height: 100%;
    width: 135px;
    border-radius: 0 6px 0 0;
}
.minimize, .full_part_screen, .close{
    width: 33.3%;
    height: 100%;
    transition: 0.1s;
    text-align: center;
}
.minimize:hover, .full_part_screen:hover, .close:hover{
    background-color: #9c9c9c5e;
    transition: 0.1s;
}
.close{
    border-radius: 0 6px 0 0;
}
.icon_window{
    height: 100%;
    width: auto;
    aspect-ratio: 1 / 1;
}
</style>