import { ref } from "vue"

export const username = ref("admin")
export const isManual = ref(true)
export const version: string = "version 0.1-release"
export const uptime: number = 1052

export const booting_screen = ref(true)
export const booting_output_type_indx = ref(0)
export function set_booting_screen_false() { booting_screen.value = false }
export function show_booting_screewn_with(booting_value: number) {
    booting_screen.value = true
    booting_output_type_indx.value = booting_value
}