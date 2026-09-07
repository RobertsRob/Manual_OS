interface File {
    name: string
    type: string
    content: string
}

interface Folder {
    icon: string
    name: string
    content: File[]
}
export const folders: Folder[] = [
    {
        icon: "https://pnghunter.com/get-logo.php?id=5754",
        name: "Download",
        content: [
            {
                name: "abc",
                type: "txt",
                content: "hello"
            },
            {
                name: "Hello",
                type: "txt",
                content: "23"
            },
        ]
    },
    {
        icon: "https://cdn-icons-png.flaticon.com/512/8336/8336320.png",
        name: "Documents",
        content: [
            {
                name: "image1",
                type: "png",
                content: "https://i.guim.co.uk/img/media/fe1e34da640c5c56ed16f76ce6f994fa9343d09d/0_174_3408_2046/master/3408.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=67773a9d419786091c958b2ad08eae5e"
            }
        ]
    },
]