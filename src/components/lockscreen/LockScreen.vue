<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from "vue"
    import Wallpaper from '../desktop/Wallpaper.vue';

    const height = window.innerHeight;
    const verPos = ref(0)
    const isManual = ref(false)
    const username = ref("");

    const revealed = ref(false)
    const usernameInput = ref<HTMLInputElement | null>(null)
    const inputDisabled = ref(true)

    const now = new Date();
    const day = now.toLocaleDateString("en-US", { weekday: "long" });
    const date = now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric"
    });
    const formatted = `${day} ${date}`;

    const time = ref("")
    function updateTime(){
        time.value = new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            // second: "2-digit",
            hour12: false
        })
    }
    let interval: number
    onMounted(() => {
        window.addEventListener("keydown", handleKeydown);
        updateTime()
        interval = window.setInterval(updateTime, 1000)
    })
    onUnmounted(() => {
        window.removeEventListener("keydown", handleKeydown);
        clearInterval(interval)
    })

    function handleKeydown(event: KeyboardEvent) {
        if ((event.code === "Space" || event.code === "Enter") && !revealed.value) {
            verPos.value = -height;
            setTimeout(() => {
                inputDisabled.value = false
                usernameInput.value?.focus()
            }, 200)
            return;
        }
        if (event.code === "Escape") {
            verPos.value = 0;
            inputDisabled.value = true
            usernameInput.value?.focus()
            revealed.value = false;
        }
        if (event.code === "Enter" && revealed.value && username.value.length >= 3) {
            emit('unlock', isManual.value, username.value)
        }
    }

    function onTransitionEnd() {
        if (verPos.value === -height) {
            revealed.value = true;
        }
    }

    const emit = defineEmits<{
        unlock: [isManual: boolean, username: string]
    }>()
</script>

<template>
    <div class="lockScreen">
        <Wallpaper :wallpaper-number="3"/>
        <div class="content" :style="{ transform: `translateY(${verPos}px)` }" @transitionend="onTransitionEnd">
            <div class="clock">
                <span>{{time}}</span>
            </div>
            <div class="date">
                <span>{{formatted}}</span>
            </div>
        </div>
        <div class="choices" :class="{ clear: verPos === 0 }">
            <div class="middle">
                <div class="input_part">
                    <input ref="usernameInput" v-model="username" placeholder="Enter username" type="text" class="input" :readonly="inputDisabled" maxlength="22">
                    <div class="line"></div>
                    <div class="choiceMode">
                        <div class="everythingManual" :class="{ active: isManual }" @click="isManual = true" >
                            Everything Manual
                        </div>
                        <div class="everythingPreinstalled" :class="{ active: !isManual }" @click="isManual = false" >
                            Everything Preinstalled
                        </div>
                    </div>
                    <button class="button" @mouseup="username.length >= 3 && emit('unlock', isManual, username)">Continue</button>
                    
                </div>
                
            </div>
            
        </div>
    </div>
</template>

<style scoped>
    .lockScreen{
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        user-select: none;
    }
    .lockScreen :deep(.wallpaper) {
        position: absolute;
        inset: 0;
        z-index: 0;
    }
    .content{
        position: relative;
        z-index: 5;
        top: 0px;
        /* background-color: #ffffff82; */
        height: 67%;
        padding-top: 33vh;
        width: 100%;
        transition: transform 1s ease;
    }
    .clock {
        margin: 0 auto;
        /* margin-top: 33vh; */
        width: 50vh;
        height: 15vh;
        /* background-color: #ffffff41; */

        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        box-sizing: border-box;

        font-size: 10vh;
        font-family: 'Orbitron', sans-serif;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        line-height: 1;
    }
    .date{
        margin: 0 auto;
        width: 50vh;
        height: 3vh;

        /* background-color: #6a636341; */
        font-size: 2vh;
        font-family: 'Orbitron', sans-serif;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }
    .choices{
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        overflow: hidden;
        /* background-color: #ffffff42; */
        backdrop-filter: blur(8px);
        opacity: 1;
        transition:
            backdrop-filter 1s ease,
            opacity 1s ease;
    }
    .choices.clear {
        backdrop-filter: blur(0);
        opacity: 0;
    }
    .middle{
        width: 30%;
        height: 60%;
        padding-top: 40vh;
        margin: 0 auto;
    }

    /* Choices styles */
    .input_part{
        width: 200px;
        height: 50px;
        margin: 0 auto;
    }

    .input {
        width: 200px;
        height: 25px;
        padding: 10px 2px 10px 2px;
        color: white;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0);
        border: 0px;
        outline: none;
        font-family: 'Orbitron', sans-serif;
        font-weight: 700;
        letter-spacing: 0.1em;
    }
    .input::placeholder  {
        color: rgba(225, 225, 225, 0.806);
    }
    .line{
        position: relative;
        top: -4px;
        width: 200px;
        height: 2px;
        background-color: #fff;
    }

    .choiceMode {
        display: flex;
        width: 200px;
        margin: 10px auto 0;
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 5px;
        overflow: hidden;
    }

    .everythingManual,
    .everythingPreinstalled {
        flex: 1;
        text-align: center;
        padding: 8px 4px;
        color: rgba(225, 225, 225, 0.806);
        font-family: 'Orbitron', sans-serif;
        font-weight: 700;
        font-size: 0.6rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        cursor: pointer;
        transition: background-color 0.2s ease, color 0.2s ease;
    }

    .everythingManual {
        border-right: 1px solid rgba(255, 255, 255, 0.4);
    }

    .everythingManual:hover,
    .everythingPreinstalled:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
    }

    .everythingManual.active,
    .everythingPreinstalled.active {
        background-color: rgba(255, 255, 255, 0.15);
        color: #fff;
    }

    .button {
        display: block;
        width: 200px;
        margin: 16px auto 0;
        padding: 8px 4px;
        color: rgba(225, 225, 225, 0.806);
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 5px;
        font-family: 'Orbitron', sans-serif;
        font-weight: 700;
        font-size: 0.7rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        text-align: center;
        cursor: pointer;
        transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }

    .button:hover {
        background-color: rgba(255, 255, 255, 0.15);
        color: #fff;
        border-color: rgba(255, 255, 255, 0.7);
    }

    .button:active {
        background-color: rgba(255, 255, 255, 0.25);
    }
    
</style>