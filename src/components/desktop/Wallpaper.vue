<script setup lang="ts">
    // import { ref } from 'vue'
    import wallpaper1 from "../../assets/wallpaper1.jpg"
    import wallpaper2 from "../../assets/wallpaper2.jpg"
    import wallpaper3 from "../../assets/wallpaper3.jpg"

    const props = defineProps<{
        wallpaperNumber: number
    }>()

    const wallpapers = [
        wallpaper1,
        wallpaper2,
        wallpaper3,
    ]

</script>

<template>
    <div 
        class="wallpaper"
        :style="{backgroundImage: `url(${wallpapers[props.wallpaperNumber - 1]})`}"
    ></div>
</template>

<style scoped>
.wallpaper{
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
}
</style>
