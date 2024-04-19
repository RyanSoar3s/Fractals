import { MadelbrotSet } from "./mandelbrotSet.js"

let array 
let WIDTH
let HEIGHT
let ms

onmessage = (e) => {
    WIDTH = e.data[0]
    HEIGHT = e.data[1]

    ms = new MadelbrotSet()
    array = []

    function choose_color(count) {
        let color =  ""

        if (count < 66) {
            color = `rgb(${count * 3}, ${count * 7}, 110)`
    
        }

        else {
            color = `rgb(${count * 7}, 225, ${count * 3})`
    
        }
    
        return color

    }

    function calculateCol(i) {
        for (let j = 0; j < HEIGHT; j++) {
            let x = -2 + (i / WIDTH) * 3
            let y = -1 + (j / HEIGHT) * 2
            let [count, numberInSet] = ms.checkNumberInSet(x, y)
            let color = (numberInSet) ? "black" : choose_color(count)
            let row = [i, j, color]
            array.push(row)
            
        }

        postMessage(array)
        array = []

        if (i < WIDTH - 1) {
            setTimeout(() => calculateCol(i + 1), 0)
        }
    }

    calculateCol(0)
}
