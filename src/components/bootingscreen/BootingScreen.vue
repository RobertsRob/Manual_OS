<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import type { output_d } from './loadingUp';
    import { bootingUpLines } from './loadingUp';
    import { set_booting_screen_false } from '../../data/user';
    
    const output = ref<output_d[]>([])
    let current_command = 0
    const outputContainer = ref<HTMLElement | null>(null)
    const total_time = 5000

    let timeout: number

    function writeLine() {
        if(current_command >= bootingUpLines.length) set_booting_screen_false()
        output.value.push(bootingUpLines[current_command].opening_br)
        output.value.push(bootingUpLines[current_command].message_type)
        output.value.push(bootingUpLines[current_command].closing_br)
        output.value.push(bootingUpLines[current_command].text)
        output.value.push({output: "\n"})

        if (outputContainer.value) outputContainer.value.scrollTop = outputContainer.value.scrollHeight
        let delay = bootingUpLines[current_command].perc * total_time

        current_command++
        timeout = window.setTimeout(writeLine, delay)
    }
    
    onMounted(() => {
        writeLine()
    })

    onUnmounted(() => {
        clearTimeout(timeout)
    })

    
</script>

<template>
    <div class="main_boot" ref="outputContainer" @wheel.prevent @touchmove.prevent>
        <span v-for="out_l in output" :class="out_l.color_class">{{out_l.output}}</span>
    </div>
</template>

<style scoped>
.main_boot{
    width: calc(100vw - 10px);
    height: 100vh;
    padding: 0 5px 0 5px;
    background-color: #22191900;
    overflow: hidden;
    overflow-y: scroll;
    text-align: left;
    scrollbar-width: none;
    overscroll-behavior: none;
}
.main_boot::-webkit-scrollbar {
  display: none;
}
.line{
    text-align: left;
    width: calc(100% - 10px);
    padding: 2px 5px 2px 5px;
    font-size: 2vh;
    background-color: #4b4b4b42;
}
.warning{
    color: rgb(255, 193, 37);
}
.success{
    color: rgb(99, 255, 99);
}
.error{
    color: rgb(255, 99, 99);
}
</style>