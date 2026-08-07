// import {ref} from 'vue'

interface CommandResult {
    output: string
    class?: string
}
interface CommandFunction {
    (): CommandResult
}

export const listCommands: Record<string, CommandFunction> = {
    help,
    shutdown: () => {
        console.log("shutdown called")
        return {output: "shutdown called"}
    },
    explorer: () => {
        console.log("explorer called")
        return {output: "explorer called"}
    },
    web: () => {
        console.log("web called")
        return {output: "web called"}
    },
    notepad: () => {
        console.log("notepad called")
        return {output: "notepad called"}
    },
    trash: () => {
        console.log("trash called")
        return {output: "trash called"}
    },
    terminal: () => {
        console.log("terminal called")
        return {output: "terminal called"}
    },
} as const



export function help(): CommandResult {
    let commandListArray = Object.keys(listCommands)
    let output = "ManualOS terminal, version 0.1-release (x86_64-pc-manual-os) \nCommand list: \n"
    commandListArray.forEach(command => {
        output += "  " + command + "\n"
    });
    return {output: output.slice(0, -1)}
}

interface numberClass {
    n: number
    class: string
}
interface Dictionary<T> {
  [key: string]: T
}
let notFoundCommands: Dictionary<numberClass> = {
    "six-seven": {n: -1, class: "error"}
}
export function notFound(command: string): CommandResult{
    if(!(command in notFoundCommands)) {
        let randSimilar = (Math.floor(Math.random() * 1000) + 1)
        notFoundCommands[command] = {n: randSimilar, class: "error_white"}
    }
    return {output: "Command '" + command + "' not found, but there are " + notFoundCommands[command].n.toString() + " similar ones. \n", class: notFoundCommands[command].class}
}