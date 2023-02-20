const cols = document.querySelectorAll('.col');

document.addEventListener("click", (event) => {
    const type = event.target.dataset.type

    if(type === "lock") {
        const node = event.target.tagName.toLowerCase() === "i" ? event.target : event.target.children[0]
        node.classList.toggle("fa-lock-open");
        node.classList.toggle("fa-lock")
    } else if(type === "copy") {
        copyColorToClick(event.target.textContent);
    }
})

//obnovení barev při zmačknutí spacebaru
document.addEventListener('keydown', (event) => {
    event.preventDefault();
   if(event.code.toLowerCase() === "space") {
    setRandomColors()
   }
}
)


//nastavovani toastu
let toastContainer;
const toastElement = document.querySelector("#toast");
const generateToast = 


//kopírování kódu barvy
function copyColorToClick(text) {
    return navigator.clipboard.writeText(text);
}

function generateRandomColor() {
    const hexCode = "0123456789ABCDEF";
    let color = "";
    for(let i = 0; i < 6; i++) {
        color += hexCode[Math.floor(Math.random() * hexCode.length)];
    }
    return "#" + color;
}

//obnovení barev
function setRandomColors(isInitial) { 
    const colors = isInitial ? getColorsFromHash() : [];

    cols.forEach((col, index) => {
        const isLocked = col.querySelector("i").classList.contains("fa-lock");
        const text = col.querySelector("h2");
        const button = col.querySelector("button");

        if(isLocked) {
        colors.push(text.textContent);
        return
         }

        const color = isInitial 
        ? colors[index]
            ? colors[index] 
         : generateRandomColor()
        : generateRandomColor();

        if(!isInitial) {
        colors.push(color);
        }

        text.textContent = color;
        col.style.background = color;
        setTextColor(text, color)
        setTextColor(button, color)
        })

    updateColorsHash(colors);
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? "#34282C" : "#FFFFF0";
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map((col) => {
        return col.toString().substring(1)
}).join("-");
}

function getColorsFromHash() {
    if(document.location.hash.length > 1) {
        return document.location.hash.substring(1).split("-").map(color => "#" + color)
    }
    return []
}

setRandomColors(true)