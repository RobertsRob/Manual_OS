import { ref } from "vue";

export const installed = ref<Record<string, boolean>>({
    help: false,
    neofetch: false,
    shutdown: false,
    explorer: false,
    web: false,
    notepad: false,
    trash: false,
    terminal: true,
    dragWindow: false,
    closeWindow: false,
    minimizeWindow: false,
    unminimizeWindow: false,
    maximizeWindow: false,
    dragIcon: false,
})