<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TrashImage1 from "../../../assets/trash.png"
import LauncherImage from "../../../assets/launcher.png"

const canvas = ref<HTMLCanvasElement | null>(null)
const verInput = ref(0)
const horInput = ref(0)

const g = 10
const launchTime = 400
let CW = 0
let CH = 0
let launching = false
let verClam = 0, horClam = 0

let trash = {
    img: new Image(),
    x_pos: 0,
    y_pos: 0,
    f_offset: 0,
    rotation: 90,
    w: 50,
    h: 50,
    x_v: 0,
    y_v: 0,
    rot_v: 5,
    locked: true,
}

let leg = {
    f_x: 150,
    f_y: 180,
    x: 120,
    y: 0,
    w: 20,
    h: 130,
    rot: 45,
    img: new Image(),
}

function displayImageRotation(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, img: HTMLImageElement, rot: number){
    ctx.save()
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate(rot * Math.PI / 180)
    ctx.drawImage(img, -w / 2, -h / 2, w, h)
    ctx.restore()
}
function displayRectRotation(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, rot: number){
    ctx.save()
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate(rot * Math.PI / 180)
    ctx.fillStyle = color
    ctx.fillRect(-w / 2, -h / 2, w, h)
    ctx.restore()
}

function update() {
    if (!canvas.value) return
    const ctx = canvas.value.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, CW, CH)

    // get data
    
    if(trash.locked && !launching){
        verClam = Math.min(Math.max(verInput.value, 10), 90)
        horClam = Math.min(Math.max(horInput.value, 1), 100)
    }
    if(trash.locked && launching){
        let step = (verClam + 80) / (launchTime / 10)
        verClam -= step
    }
    
    const jiggle = trash.locked && !launching ? (Math.random() * 2 - 1) * (Math.abs(horClam) * 0.03) : 0;
    let launchAngle = verClam + jiggle


    // data management
    leg.x = leg.f_x - (Math.sin(launchAngle * Math.PI / 180) * leg.h / 2) - leg.w / 2
    leg.y = CH - (leg.f_y - (Math.cos(launchAngle * Math.PI / 180) * leg.h / 2)) - leg.h / 2
    leg.rot = launchAngle

    if (!trash.locked) {
        trash.y_v += g * 0.01
        trash.y_pos += trash.y_v
        trash.rotation += trash.rot_v * Math.max(Math.sqrt(Math.pow(trash.x_v, 2) + Math.pow(trash.y_v, 2)), 2) * 0.1
    } else {
        let x_off = trash.f_offset * Math.sin((90 - launchAngle) * Math.PI / 180)
        let y_off = trash.f_offset * Math.sin(launchAngle * Math.PI / 180) - (90 - launchAngle) * 0.45
        trash.x_pos = leg.f_x - Math.sin(launchAngle * Math.PI / 180) * leg.h + x_off
        trash.y_pos = CH - (leg.f_y - Math.cos(launchAngle * Math.PI / 180) * leg.h) + y_off
        trash.rotation = launchAngle
    }

    



    // render
    ctx.fillStyle = "red"

    ctx.fillStyle = "brown"
    displayImageRotation(ctx, trash.x_pos, trash.y_pos, trash.w, trash.h, trash.img, trash.rotation)
    displayImageRotation(ctx, leg.x, leg.y, leg.w, leg.h, leg.img, leg.rot)

}

function shoot_trash(){
    launching = true
    setTimeout(() => {
        trash.locked = false
        trash.x_v = horClam * 15
        trash.y_v = verClam * 0.1
        console.log(trash.y_v)
    }, launchTime);
}

onMounted(() => {
    setInterval(update, 10)

    if (!canvas.value) return
    const ctx = canvas.value.getContext('2d')

    if (!canvas.value) return
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.value.getBoundingClientRect()
    CW = rect.width * dpr
    CH = rect.height * dpr
    canvas.value.width = CW
    canvas.value.height = CH
    leg.y = CH - leg.f_y

    if (!ctx) return
    ctx.scale(dpr, dpr)

    trash.x_pos = CW / 2
    trash.y_pos = CH / 4
    trash.img.src = TrashImage1
    leg.img = new Image()
    leg.img.src = LauncherImage
})

</script>

<template>
    <div class="main_bin">
        <div class="left_constroll">
            <input v-model="verInput" type="range" class="input_range rotate90 ver_inp_range" min="10" max="90">
            <!-- <input v-model="verInput" type="range" class="input_range rotate90 ver_inp_range" min="0" max="90"> -->
        </div>
        <div class="main_part">
            <div class="game">
                <canvas ref="canvas" class="game_canvas"></canvas>
            </div>
            <div class="bottom_controll">
                <input v-model="horInput" type="range" class="input_range hor_inp_range" min="1" max="100">
                <button class="shoot_trash" @click="shoot_trash()">SHOOT</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main_bin {
    width: 100%;
    height: calc(100% - 30px);
    font-size: 50px;
    overflow: hidden;
    font-weight: 600;
    backdrop-filter: blur(10px);
    text-align: center;
    display: flex;
}

.left_constroll {
    width: 50px;
    height: 100%;
}

.main_part {
    height: 100%;
    width: calc(100% - 50px);
    display: block;
}

.game {
    width: 100%;
    height: calc(100% - 50px);
}

.bottom_controll {
    height: 50px;
    width: 100%;
}

.rotate90 {
    transform: rotate(-90deg);
}

.ver_inp_range {
    position: relative;
    top: 45%;
    left: calc(-20vh + 25px);
}

.hor_inp_range {
    position: relative;
    top: 2px;
    left: calc(-15% + 40px);
}

.input_range {
    appearance: none;
    -webkit-appearance: none;
    margin: 0;
    width: 40vh;
    border-radius: 0px;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
}

/* Chrome */
.input_range::-webkit-slider-runnable-track {
    height: 20px;
    background: #4d4f4e56;
    border: 1px solid rgba(0, 255, 30, 0.677);
    border-radius: 5px;
}
.input_range::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;

    width: 12px;
    height: 30px;
    background: #fafafa;
    border: 1px solid rgb(0, 255, 30);
    border-radius: 5px;
    margin-top: -6px;
}

/* Firefox */
.input_range::-moz-range-track {
    height: 20px;
    background: #4d4f4e56;
    border-radius: 5px;
    border: 1px solid rgba(0, 255, 30, 0.677);
}
.input_range::-moz-range-thumb {
    width: 12px;
    height: 30px;
    background: #fafafa;
    border: 1px solid rgb(0, 255, 30);
    border-radius: 5px;
    margin-top: -6px;
}

.game_canvas {
    width: 100%;
    height: 100%;
}
.shoot_trash{
    height: 20px;
    width: 80px;
    background-color: #414241;
    border: 1px solid rgba(0, 255, 30, 0.67);
    border-radius: 5px;
    position: relative;
    top: -4px;
    left: -3%;
    font-size: 12px;
    font-weight: 600;
}
.shoot_trash:active{
    background-color: #b4b8b656;
}

</style>
