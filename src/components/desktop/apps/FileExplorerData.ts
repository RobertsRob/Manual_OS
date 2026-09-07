export interface File {
    name: string
    type: string
    content: string
}

export interface Folder {
    icon: string
    name: string
    content: File[]
}
export const folders: Folder[] = [
    {
        icon: "https://pnghunter.com/get-logo.php?id=5754",
        name: "Downloads",
        content: [
            {
                name: "fun fact",
                type: "txt",
                content: "FUN FACT\nAHAHAHHAHAHH"
            },
            {
                name: "todo list",
                type: "txt",
                content: "1. Go to doctor to check for dementia\n2. Go to doctor to check for dementia\n3. Go to doctor to check for dementia\n4. Go to doctor to check for dementia\n5. Go to doctor to check for dementia\n6. Go to doctor to check for dementia\n7. Go to doctor to check for dementia\n8. Go to doctor to check for dementia\n9. Go to doctor to check for dementia\n10. Go to doctor to check for dementia"
            },
            {
                name: "quote of the day",
                type: "txt",
                content: "\"The only way to do great work is to love what you do.\" - Steve Jobs"
            },
            {
                name: "real quote of the day",
                type: "txt",
                content: "\"The only way to do great work is to drink white monster in the morning.\" - ME"
            },
            {
                name: "recipe idea",
                type: "txt",
                content: "JS + Backend"
            },
            {
                name: "review of recipe idea",
                type: "txt",
                content: "oh nooooooooo"
            },
        ]
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/8336/8336320.png",
        name: "Documents",
        content: [
            {
                name: "cute dog",
                type: "png",
                content: "https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=67773a9d419786091c958b2ad08eae5e"
            },
            {
                name: "meeting notes",
                type: "txt",
                content: "Bla Bla Bla\nTURN OFF your camera Jacob!!!, we all can see your underwear\nBla Bla Bla"
            },
            {
                name: "book",
                type: "txt",
                content: "what? you thought you will read some book?"
            },
            {
                name: "space fact",
                type: "txt",
                content: "A day on Venus is longer than a year on Venus."
            },
            {
                name: "resume draft",
                type: "txt",
                content: "Robert - Software Engineer. 15 years of experience in sitting in front of a PC"
            },
            {
                name: "birthday list",
                type: "txt",
                content: "Linus Torvalds - 28 December"
            },
        ]
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/2313/2313265.png",
        name: "Pictures",
        content: [
            {
                name: "sunset",
                type: "png",
                content: "https://images.steamusercontent.com/ugc/1746809502292328172/37425859DFE9775E20EA37F702D45D328D1E5188/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
            },
            {
                name: "rock",
                type: "png",
                content: "https://ih1.redbubble.net/image.5395733025.3628/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg"
            },
            {
                name: "me at night",
                type: "png",
                content: "https://i.pinimg.com/236x/f7/fb/a4/f7fba49aed5630c77b9c128a57b7b8da.jpg"
            },
            {
                name: "feet pic",
                type: "png",
                content: "https://media.printables.com/media/prints/310405/images/2696816_e91a5c47-f516-4f04-9c50-4bac5f94c7fe/thumbs/inside/1280x960/jpg/cover2.webp"
            },
        ]
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/3767/3767084.png",
        name: "Music",
        content: [
            {
                name: "playlist chill",
                type: "txt",
                content: "1. Rammstein - Mann gegen Mann\n2. Ozzy Osbourne - No More Tears\n3. Deftones - My Own Summer"
            },
        ]
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/2965/2965300.png",
        name: "Projects",
        content: [
            {
                name: "encoded text",
                type: "txt",
                content: "01010111 01101000 01111001 00101100 00100000 01100001 01110010 01100101 00100000 01111001 01101111 01110101 00100000 01110010 01100101 01100001 01101100 01101100 01111001 00100000 01101001 01101110 01110100 01100101 01110010 01100101 01110011 01110100 01100101 01100100 00100000 01101001 01101110 00100000 01101001 01101110 01100110 01101111 01110010 01101101 01100001 01110100 01101001 01101111 01101110 00100000 01110100 01101000 01101001 01110011 00100000 01110100 01100101 01111000 01110100 00100000 01110000 01101111 01110011 01110011 01100101 01110011 01110011 00111111 00100000 01011001 01101111 01110101 00100000 01110011 01110100 01101001 01101100 01101100 00100000 01100100 01101111 01101110 01110100 00100000 01101000 01100001 01110110 01100101 00100000 01100001 01101110 00100000 01100001 01101110 01110011 01110111 01100101 01110010 00111010 00100000 01100100 01000111 01101000 01110000 01100011 01111001 01000010 01110000 01100011 01111001 01000010 00110000 01100001 01000111 01010101 01100111 01011001 01010111 00110101 01111010 01100100 00110010 01010110 01111001 01001001 01000011 01001010 01000010 01010100 01101100 01001110 01011000 01010010 01010110 01001001 01101001 01001001 01001000 01010010 01101000 01100001 00110010 01010101 01100111 01100001 01011000 01010001 01100111 01100010 00110010 01110100 01101000 01100101 01010001 00111101 00111101"
            },
            {
                name: "bug list",
                type: "txt",
                content: "1. Under mmy bed\n2. Beside my fridge"
            },
            {
                name: "coding fact",
                type: "txt",
                content: "The first computer bug was an actual moth found in a Harvard Mark II relay in 1947."
            },
            {
                name: "empty",
                type: "txt",
                content: ""
            },
            {
                name: "mega secret",
                type: "megatype",
                content: "this is hidden content"
            },
        ]
    },
];