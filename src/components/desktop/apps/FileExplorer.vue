<script setup lang="ts">
import forwardImage from "../../../assets/forward.png"
import { folders } from "./FileExplorerData";
import { onMounted, ref } from "vue"
import { openApp } from "../../../data/desktop";
import { applications } from "../../../data/desktop";

const selectedFolderIndex = ref(0)
const selectedFolder = ref(folders[0])

onMounted(() => {
    selectedFolder.value = folders[selectedFolderIndex.value]
})

function fileTypeImage(type: string){
    if(type == "txt") return "https://cdn-icons-png.flaticon.com/512/1263/1263942.png"
    if(type == "png") return "https://cdn-icons-png.flaticon.com/512/337/337948.png"
    else return "https://cdn-icons-png.flaticon.com/512/101/101671.png"
}

function selectFolder(index: number){
    selectedFolderIndex.value = index
    selectedFolder.value = folders[selectedFolderIndex.value]
}

</script>

<template>
    <div class="main_expl">
        <div class="top_part">
            <img class="back_button" :src="forwardImage" draggable="false">
            <img class="forward_button" :src="forwardImage" draggable="false">
            <input class="path_input" placeholder="Path" :value="selectedFolder.name" type="text" name="path" id="path">
            <input class="search_input" placeholder="Search..." type="text" name="search" id="search">
        </div>
        <div class="bottom_part">
            <div class="map_choice">
                <div class="folder" v-for="(folder, index) in folders" @click="selectFolder(index)">
                    <img class="folder_icon" :src="folder.icon" alt="folder icon">
                    <span class="folder_name">{{folder.name}}</span>
                </div>
            </div>
            <div class="main_content">
                <div class="file" v-for="file in selectedFolder.content" @dblclick="openApp(applications[2], file.content)">
                    <img class="file_icon" :src="fileTypeImage(file.type)" alt="file icon" draggable="false">
                    <span class="file_name">{{file.name}}</span>
                </div>
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
    /* backdrop-filter: blur(5px); */
    display: flex;
    width: 100%;
    height: 93%;
}
.map_choice{
    width: 30%;
    height: 100%;
    /* background-color: #ffffff56; */
}
.main_content {
    width: 70%;
    height: 100%;
    /* background-color: #4343430e; */
    display: grid;
    grid-template-columns: repeat(auto-fill, 70px);
    grid-auto-rows: 80px;
    gap: 10px;
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
    height: 70px;
    width: 70px;
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
</style>