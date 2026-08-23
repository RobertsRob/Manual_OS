// import {ref} from 'vue'
import { version, uptime } from "./user"
import { openApp } from "./desktop"
import { applications } from "./desktop"
import { show_booting_screewn_with } from "./user"

interface CommandResult {
    output: string
    class?: string
}
interface CommandFunction {
    (): CommandResult | CommandResult[]
}

export const listCommands: Record<string, CommandFunction> = {
    help,
    neofetch,
    shutdown,
    explorer,
    web,
    notepad,
    trash,
    terminal,
} as const



export function help(): CommandResult {
    let commandListArray = Object.keys(listCommands)
    let output = "ManualOS terminal, " + version + " (x86_64-pc-manual-os) \nCommand list: \n"
    commandListArray.forEach(command => {
        output += "  " + command + "\n"
    });
    return {output: output.slice(0, -1)}
}

export function explorer(): CommandResult {
    const app = applications.find(app => app.name === "File Explorer");
    if (app) {
        openApp(app);
        return { output: "" };
    }
    return {output: "Failed to open app", class: "error_white"}
}
export function web(): CommandResult {
    const app = applications.find(app => app.name === "Web browser");
    if (app) {
        openApp(app);
        return { output: "" };
    }
    return {output: "Failed to open app", class: "error_white"}
}
export function notepad(): CommandResult {
    const app = applications.find(app => app.name === "Notepad");
    if (app) {
        openApp(app);
        return { output: "" };
    }
    return {output: "Failed to open app", class: "error_white"}
}
export function trash(): CommandResult {
    const app = applications.find(app => app.name === "Trash bin");
    if (app) {
        openApp(app);
        return { output: "" };
    }
    return {output: "Failed to open app", class: "error_white"}
}
export function terminal(): CommandResult {
    const app = applications.find(app => app.name === "Terminal");
    if (app) {
        openApp(app);
        return { output: "" };
    }
    return {output: "Failed to open app", class: "error_white"}
}

export function shutdown(): CommandResult {
    show_booting_screewn_with(1)
    return {output: "Shutting down"}
}


async function getGpuModel(): Promise<string> {
    const gl = document.createElement("canvas").getContext("webgl") as WebGLRenderingContext | null;
    const ext = gl?.getExtension("WEBGL_debug_renderer_info");
    return ext ? String(gl!.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "67";
}
const gpuModel = await getGpuModel();
const gpuName = gpuModel.match(/ANGLE \([^,]+, ([^,(]+)/)?.[1].trim() ?? gpuModel;

export function neofetch(): CommandResult[] {
    const cpuCores = navigator.hardwareConcurrency
    const ramGB = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    const hostModel = navigator.platform || "-1"
    const kernelVersion = version
    const uptimeText = uptime.toString() + "h"
    const packageCount = "253"
    const resolution = `${window.screen.width}x${window.screen.height}`
    const terminalName = "Terminal"
    const cpuModel = "WEB CPU s285-KF"
    const diskUsage = "0.25 KB"

    return [
        { output: " ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^. ", class: "cyan" },
        { output: "   ManualOS", class: "bold-cyan" },
        { output: "\n" },

        { output: " .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@P ", class: "cyan" },
        { output: "   ─────────────" },
        { output: "\n" },

        { output: " .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@P ", class: "cyan" },
        { output: "   OS:", class: "bold-cyan" },
        { output: " ManualOS" },
        { output: "\n" },

        { output: "  ^7YYYYYYYYYYYYYYPYYYYYYYY!~~~~!@@@@@P ", class: "cyan" },
        { output: "   Host:", class: "bold-cyan" },
        { output: ` ${hostModel}` },
        { output: "\n" },

        { output: "   ~@@@@@@@@@@@@@@@@@@@@@@@.     @@@@@P ", class: "cyan" },
        { output: "   Kernel:", class: "bold-cyan" },
        { output: ` ${kernelVersion}` },
        { output: "\n" },

        { output: "   !@@@@@@@@@@@@@@@@@@@@@@@.     @@@@@P ", class: "cyan" },
        { output: "   Uptime:", class: "bold-cyan" },
        { output: ` ${uptimeText}` },
        { output: "\n" },

        { output: "   !@@@@@J~~P@@@@@J~~G@@@@@.     @@@@@P ", class: "cyan" },
        { output: "   Packages:", class: "bold-cyan" },
        { output: ` ${packageCount}` },
        { output: "\n" },

        { output: "   !@@@@@:  7@@@@@.  ?@@@@@.     @@@@@P ", class: "cyan" },
        { output: "   Shell:", class: "bold-cyan" },
        { output: " Manual Shell" },
        { output: "\n" },

        { output: "   !@@@@@:  7@@@@@:  ?@@@@@.     @@@@@P ", class: "cyan" },
        { output: "   Resolution:", class: "bold-cyan" },
        { output: ` ${resolution}` },
        { output: "\n" },

        { output: "   !@@@@@:  7@@@@@:  ?@@@@@.     @@@@@P ", class: "cyan" },
        { output: "   Terminal:", class: "bold-cyan" },
        { output: ` ${terminalName}` },
        { output: "\n" },

        { output: "   !@@@@@:  7@@@@@:  ?@@@@@.     @@@@@P ", class: "cyan" },
        { output: "   CPU:", class: "bold-cyan" },
        { output: ` ${cpuModel}` },
        { output: "\n" },

        { output: "   !@@@@@:  7@@@@@:  ?@@@@@.     @@@@@P ", class: "cyan" },
        { output: "   CPU Cores:", class: "bold-cyan" },
        { output: ` ${cpuCores}` },
        { output: "\n" },

        { output: "   !@@@@@:  7@@@@@:  ?@@@@@7^~~~!@@@@@P ", class: "cyan" },
        { output: "   GPU:", class: "bold-cyan" },
        { output: ` ${gpuName}` },
        { output: "\n" },

        { output: "   !@@@@@:  7@@@@@:  ?@@@@@@@@@@@@@@@@P ", class: "cyan" },
        { output: "   RAM:", class: "bold-cyan" },
        { output: ` ${ramGB} GB` },
        { output: "\n" },

        { output: "   !@@@@@:  7@@@@@:  ?@@@@@@@@@@@@@@@@P ", class: "cyan" },
        { output: "   Disk Usage:", class: "bold-cyan" },
        { output: ` ${diskUsage}` },
        { output: "\n" },

        { output: "   .^^^^^   .^^^^^   .^^^^^^^^^^^^^^^^. ", class: "cyan" },
    ];
    
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