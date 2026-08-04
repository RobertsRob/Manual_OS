<script setup lang="ts">
// import { ref } from 'vue'
import type { Application } from "../../data/desktop"

const props = defineProps<{
  taskbarApp: Application
  active: boolean 
}>()

</script>

<template>
    <div class="app">
        <img :src="taskbarApp.src" class="app_image" draggable="false">
        <div class="small_stripe" :class="{active: active}"></div>
    </div>
</template>

<style scoped>
    .app{
        height: 100%;
        height: 100%;
        aspect-ratio: 1 / 1;
        background-color: #16171d00;
    }
    .app_image{
        height: 70%;
        width: 70%;
        margin: 10% 15% 5% 15%;
    }
    .small_stripe{
        height: 5%;
        width: 12%;
        background-color: #a1a1a1;
        margin: 0 auto;
        position: relative;
        top: -12%;
        border-radius: 15px;
        transition: 0.2s;
    }
    .small_stripe.active {
        width: 32%;
        transition: 0.2s;
        background-color: rgb(135, 182, 243);
    }
</style>