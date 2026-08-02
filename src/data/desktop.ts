import Chrome from "../components/desktop/apps/Chrome.vue"
import Trash from "../components/desktop/apps/Trash.vue"

export interface Application {
    name: string
    render: boolean
    src: string
    shortcut: string
    position: [number, number]
    component: any
}

export const applications: Application[] = [
    {
        name: "Trash bin",
        render: true,
        src: "https://cdn-icons-png.flaticon.com/512/4021/4021663.png",
        shortcut: "C/abc/abcd",
        position: [0, 0] as [number, number],
        component: Trash
    },
    {
    name: "Google Chrome",
    render: true,
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/3840px-Google_Chrome_icon_%28February_2022%29.svg.png",
    shortcut: "C/abc/abc",
    position: [0, 9.5] as [number, number],
    component: Chrome
    }
]