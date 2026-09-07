<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    initial_text?: string
}>()

const imageViewRef = ref<HTMLDivElement | null>(null)

const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)

const MIN_SCALE = 1
const MAX_SCALE = 6
const ZOOM_SPEED = 0.0015

function onWheel(e: WheelEvent) {
    if (!imageViewRef.value) return
    e.preventDefault()

    const rect = imageViewRef.value.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const prevScale = scale.value
    const nextScale = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, prevScale - e.deltaY * ZOOM_SPEED * prevScale)
    )

    if (nextScale === prevScale) return

    const scaleRatio = nextScale / prevScale
    translateX.value = x - (x - translateX.value) * scaleRatio
    translateY.value = y - (y - translateY.value) * scaleRatio

    scale.value = nextScale

    if (scale.value === MIN_SCALE) {
        translateX.value = 0
        translateY.value = 0
    }
}

</script>

<template>
    <div class="main_image_view" ref="imageViewRef" @wheel="onWheel">
        <img :src="initial_text" alt="opened image" class="inner_image" :style="{ transform: `translate(${translateX}px, ${translateY}px) scale(${scale})` }">
    </div>
</template>

<style scoped>
.main_image_view {
    overflow: hidden;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.inner_image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform-origin: 0 0;
    will-change: transform;
}
</style>