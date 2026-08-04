import Trash from "../components/desktop/apps/Trash.vue"
import WebBrowser from "../components/desktop/apps/WebBrowser.vue"

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
    }
]