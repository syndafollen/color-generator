import { generateToast } from "./toast/toast.js";
import chroma from "chroma-js"

const cols = document.querySelectorAll(".col");
const colorCodes = document.querySelectorAll('h2[data-type="copy"]');
const locks = document.querySelectorAll('button[data-type="lock"]');
let colors = []

colorCodes.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    copyColorToClick(event.target.textContent);
    generateToast({ columnId: event.target.id, message: "Copied" });
  });
});

locks.forEach((elem, index) => {
  elem.addEventListener("click", (event) => {  
    const colorCode = event.currentTarget.parentNode.innerText
    const colorsArray  = colors.filter(({ color }) => color === colorCode)

    if (colorsArray.length === 0) {
      colors.push({ num: index, color: colorCode })
    } else {
      colors = colors.filter(({ color }) => color !== colorCode)
    }

    updateColorsHash(colors)
  });
});

//obnovení barev při zmačknutí spacebaru
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

//kopírování kódu barvy
const copyColorToClick = (text) => {
  return navigator.clipboard.writeText(text);
}

const generateRandomColor = () => {
  const hexCode = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCode[Math.floor(Math.random() * hexCode.length)];
  }
  return "#" + color;
}

//obnovení barev
const setRandomColors = () => {
  const isInitial = !!colors.length

  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    const mappedColors = colors.map(({ num, color }) => ({ num, color: color[0] === '#' ? color.substring(2) : color.substring(1)}))
    const colColors = mappedColors.filter(({ num }) => index === num)

    let color = '';

    if (!!colColors.length) {
      color = colColors[0].color
    } else {
      color = generateRandomColor();
    }

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    text.textContent = color;
    col.style.background = color;
    setTextColor(text, color);
    setTextColor(button, color);
  });
}


const setTextColor = (text, color) => {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "#34282C" : "#FFFFF0";
}


const updateColorsHash = (colors = []) => {
  const onlyColors = colors.map(({ color }) => color) //  ['#1#EF73A1', '2#32A606', '3#25EF30', '4#D68AD2', '#32A606']
  console.log('onlyColors:', onlyColors)

  window.location.hash = colors
    .map((item) => `${item.num}#${item.color.toString().substring(1)}`)
    .join(`-`);

  locks.forEach((elem) => {
    const node = elem.children[0]
  
    if (onlyColors.includes(elem.parentNode.firstElementChild.innerText)) {
        node.classList.add("fa-lock")
        node.classList.remove("fa-lock-open")
    } else {
      node.classList.add("fa-lock-open")
        node.classList.remove("fa-lock")
    }
  })
  
}

const getColorsFromHash = () => {
  if (window.location.hash.length > 1) {
    const uniqueValues = [...new Set(window.location.hash.split('-'))]
    
    window.location.hash = uniqueValues.join('-')

    return uniqueValues.map((color) => ({ num: color[0] === '#' ? Number(color[1]) : Number(color[0]), color } ))
  }

  return [];
}

(() => {
  colors = getColorsFromHash()
  setRandomColors();

  locks.forEach((elem)=>{
    const node = elem.children[0]
    const colorsArray  = colors.filter(({ color }) => color === elem.parentNode.firstElementChild.innerText) 
    
    if (!!colorsArray.length) {
        node.classList.add("fa-lock")
        node.classList.remove("fa-lock-open")
    } else {
      node.classList.add("fa-lock-open")
      node.classList.remove("fa-lock")
    }
  })
})()
