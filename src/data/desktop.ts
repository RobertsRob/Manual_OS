import { ref } from "vue"
import Trash from "../components/desktop/apps/Trash.vue"
import WebBrowser from "../components/desktop/apps/WebBrowser.vue"
import Notepad from "../components/desktop/apps/Notepad.vue"
import FileExplorer from "../components/desktop/apps/FileExplorer.vue"
import Terminal from "../components/desktop/apps/Terminal.vue"
import { installed } from "./instalations.ts"

export interface Application {
    id?: number
    name: string
    package_name: string
    render: boolean
    src: string
    shortcut: string
    position_shortcut: [number, number]
    position: [number, number]
    size: [number, number]
    component: any
    zIndex?: number
    minimized: boolean
    initial_text?: string
}

export const zIndex = ref(1)
const id = ref(0)
export const openedApps = ref<Application[]>([])

export function openApp(app: Application) {
  if(!installed.value[app.package_name]){
    const terminalApp = applications.find(a => a.name === "Terminal")
    const initial_text = `Package ${app.package_name} was not found! \nInstall it by typing:\n    install ${app.package_name}`
    if (!terminalApp) return
    openedApps.value.push({
      ...terminalApp,
      id: id.value++,
      zIndex: zIndex.value,
      position: [...app.position] as [number, number],
      size: [...app.size] as [number, number],
      initial_text: initial_text
    })
  }
  else{
    zIndex.value++
    openedApps.value.push({
      ...app,
      id: id.value++,
      zIndex: zIndex.value,
      position: [...app.position] as [number, number],
      size: [...app.size] as [number, number],
    })
  }
  
}

export function closeApp(app: Application) {
  openedApps.value = openedApps.value.filter(
    a => a.id !== app.id
  )
}

export function increaseZ(){
    zIndex.value++
}

export const applications: Application[] = [
    {
        name: "Trash bin",
        package_name: "trash",
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
    package_name: "web",
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
    package_name: "notepad",
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
    package_name: "explorer",
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
    package_name: "terminal",
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