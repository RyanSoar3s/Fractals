import { MadelbrotSet } from "./mandelbrotSet.js"

let canvas = document.getElementById("canvas")
let draw = canvas.getContext("2d")
let ms = new MadelbrotSet()

const HEIGHT = canvas.height
const WIDTH = canvas.width

function choose_color(count) {
    let color =  ""

    if (count < 33) {
        color = `rgb(${count * 3}, ${count * 7}, 110)`

    }
    else {
        color = `rgb(${count * 7}, 225, ${count * 3})`

    }

    return color

}

for (let i = 0; i < 600; i++) {
    for (let j = 0; j < 500; j++) {
        let numberInSet = ms.checkNumberInSet((-2) + (i / WIDTH) * 3, (-1) + (j / HEIGHT) * 2)
        draw.fillStyle = (numberInSet[1]) ? "black" : choose_color(numberInSet[0])
        draw.fillRect(i, j, 1, 1)

    }

}
