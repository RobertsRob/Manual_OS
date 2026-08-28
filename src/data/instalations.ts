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
    drag_window: false,
    close_window: false,
    minimize_window: false,
    unminimize_window: false,
    maximize_window: false,
    drag_icon: false,
})