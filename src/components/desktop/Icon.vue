<script setup lang="ts">
import { ref } from 'vue'
import type { Application } from '../../data/desktop'

const props = defineProps<{
  icon: Application 
}>()

const position = ref(props.icon.position_shortcut)
const startPos = ref([0, 0])
const startIconPos = ref([0, 0])
const bgc = ref("#87f6fa00")
const hover = ref(false)

const dragging = ref(false)

function move(event: MouseEvent) {
    if(dragging.value){
        position.value[0] = startIconPos.value[0] + (event.clientX / window.innerHeight * 100) - startPos.value[0]
        position.value[1] = startIconPos.value[1] + (event.clientY / window.innerHeight * 100) - startPos.value[1]
    }
}

function startDrag(event: MouseEvent) {
    dragging.value = true
    startPos.value = [
        event.clientX / window.innerHeight * 100,
        event.clientY / window.innerHeight * 100
    ]
    startIconPos.value = [
        position.value[0],
        position.value[1]
    ]
    bgc.value = "#87f6fa55"

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', stopDrag)
}

function stopDrag() {
    dragging.value = false
    if(hover.value) bgc.value = "#87f6fa25"
    else bgc.value = "#87f6fa00"

    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', stopDrag)
}

function startHover(){
    hover.value = true
    if(!dragging.value)
        bgc.value = "#87f6fa25"
}
function stopHover(){
    hover.value = false
    if(!dragging.value)
        bgc.value = "#87f6fa00"
}

const emit = defineEmits<{
  (e: 'open', app: Application): void
}>()

function openApp() {
  emit('open', props.icon)
}

</script>

<template>
    <div 
        class="icon"
        @mousedown="startDrag($event)"
        @mouseenter="startHover()"
        @mouseleave="stopHover()"
        @dblclick="openApp"
        :style="{
            left: `${position[0]}vh`,
            top: `${position[1]}vh`,
            backgroundColor: bgc,
        }"
    >
        <img class="icon_image" :src="icon.src" :alt="icon.name" draggable="false">
        <span class="icon_text">{{ icon.name }}</span>
    </div>
</template>

<style scoped>
    .icon{
        position: absolute;
        overflow: hidden;
        height: 7.5vh;
        width: 7vh;
        padding: 0.5vh 0.5vh 0.5vh 0.5vh;
        margin: 1vh 1vh 1vh 1vh;
        background-color: #87f6fa00;
    }
    .icon_image
    {
        height: 4.5vh;
        width: 4.5vh;
    }
    .icon_text{
        display: block;
        font-size: 1.25vh;
        line-height: 1;
        color: white;
    }
</style>