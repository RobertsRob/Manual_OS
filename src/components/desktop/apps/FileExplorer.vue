<script setup lang="ts">
import forwardImage from "../../../assets/forward.png"
import { folders } from "./FileExplorerData";
import { onMounted, onUnmounted, ref } from "vue"
import { openApp } from "../../../data/desktop";
import { applications } from "../../../data/desktop";
import type{ File, Folder } from "./FileExplorerData";

const props = defineProps<{
    active: boolean
}>()

const selectedFolder = ref(folders[0])
const selectedOption = ref({
    path: false,
    search: false,
})

const pathValue = ref(selectedFolder.value.name)
const searchValue = ref("")
const emptyFolderText = ref("")
const visitedFolders = ref<{content: string, type: string}[]>([])
const historyIndex = ref(-1)

function fileTypeImage(type: string){
    if(type == "txt") return "https://cdn-icons-png.flaticon.com/512/1263/1263942.png"
    if(type == "png") return "https://cdn-icons-png.flaticon.com/512/337/337948.png"
    else return "https://cdn-icons-png.flaticon.com/512/101/101671.png"
}

function selectFolder(folder: any){
    selectedFolder.value = folder
    pathValue.value = selectedFolder.value.name
    pushHistory(selectedFolder.value.name, "folder")
    if(selectedFolder.value.content.length === 0)
        emptyFolderText.value = "Nothing here"
    else emptyFolderText.value = ""
}

function searchFiles(search: string){
    let searchFolder = {
        name: 'Search "' + search + '" ',
        content: [] as File[]
    }
    let matchedFiles: File[] = [];
    for (let i = 0; i < folders.length; i++) {
        const folder = folders[i];
        for (let j = 0; j < folder.content.length; j++) {
            const file = folder.content[j];
            if(file.name === search) matchedFiles.unshift(file)
            else if (file.name.includes(search)) matchedFiles.push(file)
        }
    }
    pushHistory(searchFolder.name, "search")
    searchFolder.content = matchedFiles
    selectedFolder.value = searchFolder as Folder
    pathValue.value = selectedFolder.value.name
    if(selectedFolder.value.content.length === 0)
        emptyFolderText.value = "Nothing found!"
    else emptyFolderText.value = ""
}

function goToPath(path: string, addToHistory: boolean){
    let resF = folders.find(a => a.name === path)
    if(resF) {
        selectedFolder.value = resF 
        pathValue.value = selectedFolder.value.name
        if(addToHistory) {
            pushHistory(selectedFolder.value.name, "folder")
        }
    } else pathValue.value = selectedFolder.value.name
    if(selectedFolder.value.content.length === 0)
        emptyFolderText.value = "Nothing here"
    else emptyFolderText.value = ""
}

function handleKey(event: KeyboardEvent) {
    if(!props.active) return
    switch (event.key) {
        case "Enter":
            if(selectedOption.value.path) goToPath(pathValue.value, true)
            if(selectedOption.value.search) searchFiles(searchValue.value)
            break
    }
}

function openFile(file: File){
    if(file.type === "txt") openApp(applications[2], file.content)
    if(file.type === "png") openApp(applications[5], file.content)
}

function goBackHistory(){
    if(historyIndex.value <= 0) return
    historyIndex.value--
    navigateToHistoryEntry(visitedFolders.value[historyIndex.value])
}

function goForwardHistory(){
    if(historyIndex.value >= visitedFolders.value.length - 1) return
    historyIndex.value++
    navigateToHistoryEntry(visitedFolders.value[historyIndex.value])
}

function navigateToHistoryEntry(entry: {content: string, type: string}){
    if(entry.type === "folder") goToPath(entry.content, false)
    else searchFiles(entry.content.slice(8, -2))
}

function pushHistory(content: string, type: string){
    const current = visitedFolders.value[historyIndex.value]
    if(current && current.content === content && current.type === type) return
    visitedFolders.value.splice(historyIndex.value + 1)
    visitedFolders.value.push({ content, type })
    historyIndex.value = visitedFolders.value.length - 1
}

onMounted(() => {
    selectedFolder.value = folders[0]
    window.addEventListener('keydown', handleKey)
    visitedFolders.value[0] = { content: selectedFolder.value.name, type: "folder" }
    historyIndex.value = visitedFolders.value.length - 1
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKey)
})

</script>

<template>
    <div class="main_expl">
        <div class="top_part">
            <img class="back_button" :src="forwardImage" draggable="false" @click="goBackHistory()">
            <img class="forward_button" :src="forwardImage" draggable="false" @click="goForwardHistory()"> 
            <input class="path_input" placeholder="Path" type="text" name="path" id="path" @focus="selectedOption.path = true" @blur="selectedOption.path = false" v-model="pathValue">
            <input class="search_input" placeholder="Search..." type="text" name="search" id="search" @focus="selectedOption.search = true" @blur="selectedOption.search = false" v-model="searchValue">
        </div>
        <div class="bottom_part">
            <div class="map_choice">
                <div class="folder" v-for="folder in folders" @click="selectFolder(folder)">
                    <img class="folder_icon" :src="folder.icon" alt="folder icon">
                    <span class="folder_name">{{folder.name}}</span>
                </div>
            </div>
            <div class="main_content">
                <div class="file" v-for="file in selectedFolder.content" @dblclick="openFile(file)">
                    <img class="file_icon" :src="fileTypeImage(file.type)" alt="file icon" draggable="false">
                    <span class="file_name">{{file.name}}</span>
                </div>
                <div class="centeredText">{{emptyFolderText}}</div>
            </div>
            
        </div>
    </div>
    
</template>

<style scoped>
.main_expl{
    width: 100%;
    height: 100%;
    font-size: 50px;
    overflow: hidden;
    font-weight: 600;
    color: rgb(255, 255, 255);
    backdrop-filter: blur(5px);
    background-color: #74747410;
    text-align: center;
    font-family: "DejaVu Sans Mono", "Liberation Mono", "Ubuntu Mono", "Noto Sans Mono", monospace;
}
.text{
    position: relative;
    top: 50px;
}
.top_part {
    width: 100%;
    height: 7%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
    box-sizing: border-box;
}
.bottom_part{
    display: flex;
    width: 100%;
    height: 93%;
}
.map_choice{
    width: 30%;
    height: 100%;
}
.main_content {
    width: 70%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 70px);
    grid-auto-rows: 80px;
    gap: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
}
.forward_button{
    height: 75%;
    width: auto;
    transform: scale(1);
    transition: all 1s;
}
.forward_button:active{
    transition: all 0.2s;
    transform: scale(0.75);
}
.back_button{
    height: 75%;
    width: auto;
    transform: scale(1) rotate(180deg);
    transition: all 1s;
}
.back_button:active{
    transform: scale(0.75) rotate(180deg);
    transition: all 0.2s;
}
.path_input, .search_input {
    height: 60%;
    min-width: 0;
    box-sizing: border-box;
    border: 0;
    border-radius: 5px;
    padding: 0 8px;
    font-family: "DejaVu Sans Mono", "Liberation Mono", "Ubuntu Mono", "Noto Sans Mono", monospace;
    font-size: 30%;
}
.path_input:focus, .search_input:focus {
    border: 0px;
    outline: 2px solid gray;
}
.path_input {
    flex: 1;
}
.search_input {
    flex: 0 1 25%;
}
.folder{
    height: 40px;
    width: 100%;
    display: flex;
    gap: 7px;
    align-items: center;
    transition: all 1s;
    transform: scale(1);
}
.folder:hover{
    background-color: #ffffff3b;
}
.folder:active{
    transition: all 0.2s;
    transform: scale(0.85);
}
.folder_icon{
    height: 26px;
    width: 26px;
    margin-left: 25px;
}
.folder_name{
    font-size: 20px;
}
.file {
    height: 80px;
    width: 80px;
    padding: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    transition: transform 1s;
    transform: scale(1);
}
.file:hover{
    background-color: #87f6fa25;
}
.file:active{
    background-color: #87f6fa55;
}
.file_icon {
    height: 50px;
    width: 50px;
}
.file_name {
    margin-top: 3px;
    font-size: 13px;
    line-height: 16px;
}
.centeredText{
    margin: 20px;
    width: 400px;
    height: 100px;
    font-size: 30px;
    text-align: left;
    font-family: "DejaVu Sans Mono", "Liberation Mono", "Ubuntu Mono", "Noto Sans Mono", monospace;
    color: rgba(251, 251, 251, 0.866);
}
</style>