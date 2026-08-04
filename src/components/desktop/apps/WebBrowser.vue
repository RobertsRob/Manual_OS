<script setup lang="ts">
import { ref } from 'vue';

const url = ref("https://www.wikipedia.org/")
const page = ref(url.value)
const iframeKey = ref(0)

function open(){
    page.value = url.value
}

function reloadPage(){
    iframeKey.value++
}

</script>

<template>
    <header>
        <img class="reload_image" src="https://thumbs.wbm.im/pw/small/c2ef5dcf52f211a2d1978da4f76c0fec.png" draggable="false" @mousedown="reloadPage">
        <input class="url_enter" type="text" v-model="url" @keydown="open">
    </header>
    <iframe :key="iframeKey" :src="page"></iframe>
</template>

<style scoped>
header{
    display: flex;
    width: 100%;
    height: 36px;
    background-color: #7c7c7c8f;
    border-radius: 0px;
    padding: 4px 0 4px 0;
}
.url_enter{
    width: calc(100% - 40px);
}
.reload_image{
    height: 18px;
    width: 18px;
    margin: 9px 5px 5px 5px;
}
.reload_image:active{
    filter: brightness(50%); 
}
iframe {
    width: 100%;
    height: calc(100% - 74px);
    border: none;
}
</style>
