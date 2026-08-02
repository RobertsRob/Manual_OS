<script setup lang="ts">
import Icon from './Icon.vue'
import { applications } from '../../data/desktop.ts';
import type { Application } from "../../data/desktop"

const emit = defineEmits<{
    (e: 'open', app: Application): void
}>()

</script>

<template>
    <div class="icons">
        <Icon 
            v-for="app in applications.filter(app => app.render)"
            :key="app.name"
            :icon="app" 
            @open="emit('open', $event)"
        />
    </div>
</template>

<style scoped>
    .icons{
        width: 100%;
        height: 100%;
    }
</style>