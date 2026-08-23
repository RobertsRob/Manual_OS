<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { username } from '../../../data/user';
import { listCommands, notFound } from '../../../data/commands';

const props = defineProps<{
    active: boolean
}>()

interface TerminalPart {
    text: string
    class?: string
}

const command = ref("")
const path = ref("~")
const default_prefix = ref(username.value + "@manual-os:" + path.value + "$ ")
const terminal_ref = ref<HTMLElement | null>(null)

const terminal_parts = ref<TerminalPart[]>([])
const previous_commands = ref<string[]>([])
const cur_viewing_com = ref(0)

onMounted(() => {
    previous_commands.value.push("")
    addTerminalPart(default_prefix.value, "prefix")
    addTerminalPart(command.value)
    addTerminalPart("█")
})

watch(() => props.active, () => {
    if (props.active) {
        addTerminalPart("█")
    } else terminal_parts.value.pop()
})

function addTerminalPart(text: string, className?: string) {
    terminal_parts.value.push({
        text: text,
        class: className
    })
}

function scrollDown() {
    nextTick(() => {
        if (terminal_ref.value) {
            terminal_ref.value.scrollTop = terminal_ref.value.scrollHeight
        }
    })
}

function handleKey(event: KeyboardEvent) {
    if (!props.active) return
    switch (event.key) {
        case "Backspace":
            command.value = command.value.slice(0, -1)
            break
        case "Delete":
            command.value = command.value.slice(0, -1)
            break
        case "Enter":
            runCommand()
            scrollDown()
            console.log("Enter pressed")
            return
        case "ArrowUp":
            cur_viewing_com.value = cur_viewing_com.value > 0 ? cur_viewing_com.value - 1 : 0
            command.value = previous_commands.value[cur_viewing_com.value]
            break
        case "ArrowDown":
            cur_viewing_com.value = cur_viewing_com.value < previous_commands.value.length - 1 ? cur_viewing_com.value + 1 : previous_commands.value.length - 1
            command.value = previous_commands.value[cur_viewing_com.value]
            break

        default:
            if (event.key.length === 1) { command.value += event.key }
    }
    if(cur_viewing_com.value === previous_commands.value.length - 1)
    previous_commands.value[previous_commands.value.length - 1] = command.value
    terminal_parts.value.pop()
    terminal_parts.value.pop()
    addTerminalPart(command.value)
    addTerminalPart("█")
    scrollDown()
}

onMounted(() => {
    window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKey)
})

function runCommand() {
    terminal_parts.value.pop()
    addTerminalPart("\n")

    previous_commands.value[previous_commands.value.length - 1] = command.value
    previous_commands.value.push("")
    cur_viewing_com.value = previous_commands.value.length - 1

    const com = command.value as keyof typeof listCommands
    if (com in listCommands) {
        let output = listCommands[com]()
        if (Array.isArray(output)) {
            output.forEach(item => {
                addTerminalPart(item.output, item.class)
            })
            addTerminalPart("\n")
        } else addTerminalPart(output.output + "\n", output.class)
    }
    else {
        let part = notFound(command.value)
        addTerminalPart(part.output, part.class)
    }

    command.value = ""

    addTerminalPart(default_prefix.value, "prefix")
    addTerminalPart(command.value)
    addTerminalPart("█")
    console.log(previous_commands.value)
}

</script>

<template>
    <div class="main" ref="terminal_ref">
        <span v-for="(part, i) in terminal_parts" :key="i" :class="part.class">{{ part.text }}</span>
    </div>

</template>

<style setup>
.main {
    height: calc(100% - 40px);
    width: calc(100% - 10px);
    background-color: #343131;
    text-align: left;
    padding: 5px;
    overflow-x: hidden;
    overflow-y: scroll;
    white-space: pre-wrap;
}

span {
    font-family: "DejaVu Sans Mono", "Liberation Mono", "Ubuntu Mono", "Noto Sans Mono", monospace;
    margin: 0;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
    color: aliceblue;
}

.prefix {
    color: rgb(198, 255, 198);
}

.error_white {
    color: rgb(255, 238, 238);
}

.error {
    color: rgb(255, 142, 142);
}

.cyan {
    color: cyan;
}

.bold-cyan {
    color: cyan;
    font-weight: 600;
}
</style>