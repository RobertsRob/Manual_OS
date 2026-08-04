<script setup lang="ts">

</script>

<template>
   <div class="text_screen">
        <textarea placeholder="Start typing..." autofocus></textarea>
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
