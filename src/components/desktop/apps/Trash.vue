<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import TrashImage1 from "../../../assets/trash.png"
import LauncherImage from "../../../assets/launcher.png"
import BasketImage from "../../../assets/basket.png"
import BottomPlatform from "../../../assets/bottom_platform.png"
import { show_booting_screewn_with } from '../../../data/user';

const canvas = ref<HTMLCanvasElement | null>(null)
const verInput = ref(0)
const horInput = ref(0)

const props = defineProps<{
    active: boolean
    makeFixed: () => void
}>()

const g = 10
const launchTime = 400
let CW = 0
let CH = 0
let launching = false
let verClam = 0, horClam = 0
const grassLevel = 50
const initialTime = 3000
let remTime = initialTime
let tragicEvent = false
let countdown = 6000

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

let baskets: any[] | null = null
let basket: any | null = null
let basket_x: any | null = null
let basket_y: any | null = null
let basket_img = new Image()
let bottomPlatformImg = new Image()
let won = false
const timeColours = [
    {tr: 3000, c: "darkgreen"},
    {tr: 2500, c: "green"},
    {tr: 1500, c: "lime"},
    {tr: 800, c: "yellow"},
    {tr: 400, c: "white"},
    {tr: 300, c: "red"},

    {tr: 200, c: "white"},
    {tr: 10, c: "red"},
]

function displayImageRotation(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, img: HTMLImageElement, rot: number){
    ctx.save()
    ctx.translate(x + w / 2, y + h / 2)
    ctx.rotate(rot * Math.PI / 180)
    ctx.drawImage(img, -w / 2, -h / 2, w, h)
    ctx.restore()
}
// function displayRectRotation(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, rot: number){
//     ctx.save()
//     ctx.translate(x + w / 2, y + h / 2)
//     ctx.rotate(rot * Math.PI / 180)
//     ctx.fillStyle = color
//     ctx.fillRect(-w / 2, -h / 2, w, h)
//     ctx.restore()
// }

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
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
        if (trash.y_pos < CH - grassLevel) {
            trash.y_v += g * 0.01
            trash.x_pos += trash.x_v
            trash.y_pos += trash.y_v
            trash.rotation += trash.rot_v * Math.max(Math.sqrt(Math.pow(trash.x_v, 2) + Math.pow(trash.y_v, 2)), 2) * 0.1
        } else{
            trash.y_pos = CH - grassLevel
            trash.rotation += Math.random() * 2.5 - 1.25
            trash.y_v += g * 0.005
            trash.x_pos += trash.x_v * 0.002
            trash.y_pos += trash.y_v
        }
        if (remTime > 0 && won === false){
            remTime -= 10
            if (trash.x_pos < basket_x + basket.w &&
                trash.x_pos + trash.w > basket_x &&
                trash.y_pos < basket_y + basket.h &&
                trash.y_pos + trash.h > basket_y) {
                won = true
                trash.x_pos = 10000
                remTime = initialTime
                tragicEvent = Math.random() > 0.6 // 20 % of tragic event possibility
                if(tragicEvent){
                    countdown = 6000
                    props.makeFixed()
                }
            }

            ctx.font = '50px "DejaVu Sans Mono", "Liberation Mono", "Ubuntu Mono", "Noto Sans Mono", monospace';
            timeColours.forEach(el => {
                if(el.tr >= remTime){
                    ctx.fillStyle = el.c
                }
            });
            // ctx.fillStyle = "red";
            ctx.fillText(remTime.toString(), CW / 2 - 80, 80);
        } else if (remTime <= 0 && won === false){
            ctx.font = '20px "DejaVu Sans Mono", "Liberation Mono", "Ubuntu Mono", "Noto Sans Mono", monospace';
            ctx.fillStyle = "red"
            ctx.fillText("Error while deleting important file!", CW / 2 - 220, 40);
            ctx.font = '15px "DejaVu Sans Mono", "Liberation Mono", "Ubuntu Mono", "Noto Sans Mono", monospace';
            ctx.fillText("Press 'R' to restart!", CW / 2 - 220, 60);
        } else if (won){
            countdown -= 10
            if(tragicEvent){
                ctx.font = '30px "DejaVu Sans Mono", "Liberation Mono", "Ubuntu Mono", "Noto Sans Mono", monospace';
                ctx.fillStyle = countdown % 200 < 100 ? "white" : "black"
                ctx.fillText("You deleted an important file!", CW / 2 - 240, 40);
                ctx.font = '23px "DejaVu Sans Mono", "Liberation Mono", "Ubuntu Mono", "Noto Sans Mono", monospace';
                ctx.fillText("ERROR, self destruction in " + countdown.toString() + "!", CW / 2 - 240, 80);
                if(countdown <= 0){
                    show_booting_screewn_with(2)
                }
            }
            else {
                ctx.font = '30px "DejaVu Sans Mono", "Liberation Mono", "Ubuntu Mono", "Noto Sans Mono", monospace';
                ctx.fillStyle = "lime"
                ctx.fillText("You deleted a file!", CW / 2 - 220, 40);
            }
            
        }
        
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
    displayImageRotation(ctx, 0, CH-30, CW/3, 30, bottomPlatformImg, 0)
    displayImageRotation(ctx, CW/3, CH-30, CW/3, 30, bottomPlatformImg, 0)
    displayImageRotation(ctx, 2*CW/3, CH-30, CW/3, 30, bottomPlatformImg, 0)
    displayImageRotation(ctx, basket_x + basket.w / 2 - 15, basket_y + basket.h / 2 - 50, 30, 100, basket_img, basket.rot)
    displayImageRotation(ctx, trash.x_pos, trash.y_pos, trash.w, trash.h, trash.img, trash.rotation)
    displayImageRotation(ctx, leg.x, leg.y, leg.w, leg.h, leg.img, leg.rot)
    // ctx.fillText("0", basket_x, basket_y)
    // ctx.fillText("0", basket_x+30, basket_y)
    // ctx.fillText("0", basket_x, basket_y+100)
    // ctx.fillText("0", basket_x+30, basket_y+100)
}

function shoot_trash(){
    if(won === true || launching === true) return  
    launching = true
    setTimeout(() => {
        remTime = initialTime
        trash.x_v = Math.min(Math.max(horInput.value, 1), 100) * 0.1
        trash.y_v = -Math.min(Math.max(verInput.value, 10), 90) * 0.1
        trash.locked = false
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

    baskets = [
        {
            x_min: CW - 60,
            x_max: CW - 40,
            y_min: 20,
            y_max: CH - 130,
            w: 30,
            h: 100,
            rot: 0,
        },
        {
            x_min: CW - 450,
            x_max: CW - 110,
            y_min: CH - 90,
            y_max: CH - 60,
            w: 100,
            h: 30,
            rot: 90,
        }
    ]
    
    basket_img.src = BasketImage
    bottomPlatformImg.src = BottomPlatform
    basket = baskets?.[Math.round(Math.random())]
    basket_x = random(basket.x_min, basket.x_max)
    basket_y = random(basket.y_min, basket.y_max)
    window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKey)
})

function handleKey(event: KeyboardEvent) {
    if(!props.active) return
    switch (event.key) {
        case "r":
            if(remTime <= 0) resetGame()
            break
        case "Enter":
            shoot_trash()
            break
    }
}

function resetGame(){
    launching = false
    trash.locked = true
    leg.y = CH - leg.f_y
    won = false

    trash.x_pos = CW / 2
    trash.y_pos = CH / 4
    trash.img.src = TrashImage1
    leg.img = new Image()
    leg.img.src = LauncherImage
}

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
