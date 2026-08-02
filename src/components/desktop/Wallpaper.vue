<script setup lang="ts">
    import { ref } from 'vue'
    import wallpaper1 from "../../assets/wallpaper1.jpg"
    import wallpaper2 from "../../assets/wallpaper2.jpg"
    import wallpaper3 from "../../assets/wallpaper3.jpg"
</script>

<template>
    <div 
        class="wallpaper"
        :style="{backgroundImage: `url(${wallpaper3})`}"
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
