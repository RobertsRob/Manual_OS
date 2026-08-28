import { ref } from "vue"
import Trash from "../components/desktop/apps/Trash.vue"
import WebBrowser from "../components/desktop/apps/WebBrowser.vue"
import Notepad from "../components/desktop/apps/Notepad.vue"
import FileExplorer from "../components/desktop/apps/FileExplorer.vue"
import Terminal from "../components/desktop/apps/Terminal.vue"
import { installed } from "./instalations.ts"
import { isManual } from "./user.ts"

export let startPosOffset = [0, 0]
const startOffsetInc = 30
const verLimit = window.innerHeight * 0.5
const horLimit = window.innerWidth * 0.5

function increasePosOffset() {
  startPosOffset[0] += startOffsetInc
  startPosOffset[1] += startOffsetInc

  if (startPosOffset[0] > horLimit) {
    startPosOffset[0] = 0
  }

  if (startPosOffset[1] > verLimit) {
    startPosOffset[1] = 0
  }
}

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
  timeout?: boolean
}

export const zIndex = ref(1)
const id = ref(0)
export const openedApps = ref<Application[]>([])

function appPosAndOffset(pos: [number, number]){ 
  increasePosOffset()
  return [pos[0] + startPosOffset[0], pos[1] + startPosOffset[1]]
}

export function openApp(app: Application) {
  if(!installed.value[app.package_name] && isManual.value){
    const terminalApp = applications.find(a => a.name === "Terminal")
    const initial_text = `Package ${app.package_name} was not found! \nInstall it by typing:\n    install ${app.package_name}`
    if (!terminalApp) return
    zIndex.value++
    openedApps.value.push({
      ...terminalApp,
      id: id.value++,
      zIndex: zIndex.value,
      position: appPosAndOffset(terminalApp.position) as [number, number],
      size: [...terminalApp.size] as [number, number],
      initial_text: initial_text,
      timeout: false
    })
  }
  else{
    zIndex.value++
    openedApps.value.push({
      ...app,
      id: id.value++,
      zIndex: zIndex.value,
      position: appPosAndOffset(app.position) as [number, number],
      size: [...app.size] as [number, number],
      timeout: false
    })
  }
}

export function openTerminal(initial_text: string){
  const terminalApp = applications.find(a => a.name === "Terminal")
    if (!terminalApp) return
    zIndex.value++
    openedApps.value.push({
      ...terminalApp,
      id: id.value++,
      zIndex: zIndex.value,
      position: appPosAndOffset(terminalApp.position) as [number, number],
      size: [...terminalApp.size] as [number, number],
      initial_text: initial_text,
      timeout: false
    })
}

export function closeApp(app: Application) {
  if(!installed.value["close_window"] && isManual.value){
    openTerminal(`Package close_window was not found! \nInstall it by typing:\n    install close_window`)
    return
  }
    
  openedApps.value = openedApps.value.filter(
    a => a.id !== app.id
  )
}

export function increaseZ(){
    zIndex.value++
}

export function timeoutApp(app: Application) {
  app.timeout = true

  setTimeout(() => {
    app.timeout = false
  }, 200)
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