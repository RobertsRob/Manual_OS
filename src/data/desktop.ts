import Trash from "../components/desktop/apps/Trash.vue"
import WebBrowser from "../components/desktop/apps/WebBrowser.vue"
import Notepad from "../components/desktop/apps/Notepad.vue"
import FileExplorer from "../components/desktop/apps/FileExplorer.vue"
import Terminal from "../components/desktop/apps/Terminal.vue"

export interface Application {
    id?: number
    name: string
    render: boolean
    src: string
    shortcut: string
    position_shortcut: [number, number]
    position: [number, number]
    size: [number, number]
    component: any
    zIndex?: number
    minimized: boolean
}

export const applications: Application[] = [
    {
        name: "Trash bin",
        render: true,
        src: "https://cdn-icons-png.flaticon.com/512/4021/4021663.png",
        shortcut: "C/abc/abcd",
        position_shortcut: [0, 0] as [number, number],
        position: [100, 100] as [number, number],
        size: [800, 600] as [number, number],
        component: Trash,
        zIndex: 5,
        minimized: false,
    },
    {
    name: "Web browser",
    render: true,
    src: "https://static.vecteezy.com/system/resources/previews/016/716/476/non_2x/internet-browser-icon-free-png.png",
    shortcut: "C/abc/abc",
    position_shortcut: [0, 9.5] as [number, number],
    position: [100, 100] as [number, number],
    size: [800, 600] as [number, number],
    component: WebBrowser,
    zIndex: 5,
    minimized: false,
    },
    {
    name: "Notepad",
    render: true,
    src: "https://cdn-icons-png.flaticon.com/512/11021/11021968.png",
    shortcut: "C/abdc/abc",
    position_shortcut: [0, 19] as [number, number],
    position: [100, 100] as [number, number],
    size: [500, 700] as [number, number],
    component: Notepad,
    zIndex: 5,
    minimized: false,
    },
    {
    name: "File Explorer",
    render: true,
    src: "https://cdn-icons-png.flaticon.com/512/6799/6799200.png",
    shortcut: "C/abdc/abc",
    position_shortcut: [0, 28.5] as [number, number],
    position: [100, 100] as [number, number],
    size: [800, 600] as [number, number],
    component: FileExplorer,
    zIndex: 5,
    minimized: false,
    },
    {
    name: "Terminal",
    render: true,
    src: "https://cdn-icons-png.magnific.com/512/8453/8453221.png",
    shortcut: "C/abdc/abc",
    position_shortcut: [0, 38] as [number, number],
    position: [100, 100] as [number, number],
    size: [800, 600] as [number, number],
    component: Terminal,
    zIndex: 5,
    minimized: false,
    }
]