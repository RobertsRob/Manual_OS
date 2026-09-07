<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
    initial_text?: string
}>()

const content = ref("")

onMounted(() => {
    if(props.initial_text) content.value = props.initial_text
})

</script>

<template>
   <div class="text_screen">
        <textarea placeholder="Start typing..." autofocus>{{content}}</textarea>
    </div>
</template>

<style scoped>
.text_screen {
    height: calc(100% - 30px);
    display: flex;
    justify-content: center;
    background: rgba(20, 20, 25, 0.137);
}
 
textarea {
    width: 100%;
    height: calc(100% - 30px);
    padding: 30px;
    resize: none;
    outline: none;
    border: none;
    background: rgba(141, 140, 140, 0.12);
    color: white;
    font-size: 24px;
    line-height: 1.5;
    transition: 0.2s;
    backdrop-filter: blur(5px);
}

textarea::placeholder {
    color: rgba(251, 251, 251, 0.809);
}

textarea:focus {
    backdrop-filter: blur(25px);
}
</style>
