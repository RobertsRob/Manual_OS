import { ref } from "vue"

export const username = ref("admin")
export const isManual = ref(true)
export const version: string = "version 0.1-release"
export const uptime: number = 1052

export const booting_screen = ref(true)
export function set_booting_screen_false() { booting_screen.value = false }