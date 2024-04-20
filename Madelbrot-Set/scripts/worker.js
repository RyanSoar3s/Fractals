import { MadelbrotSet } from "./mandelbrotSet.js"

let WIDTH
let HEIGHT
let ms
let x_start
let x_end
let y_start
let y_end

onmessage = (e) => {
    const { configurable } = e.data

    if (configurable) {
        const { w, h, x, y } = e.data
        WIDTH = w
        HEIGHT = h

        x_start = x.start
        x_end = x.end - x.start

        y_start = y.start
        y_end = y.end - y.start

        ms = new MadelbrotSet()
    
    }

    else {
        let { col } = e.data
        let array = []

        const calculatePoint = (x, y) => {
            x = x_start + (x / WIDTH) * x_end
            y = y_start + (y / HEIGHT) * y_end

            return { x, y }

        }

        for (let row = 0; row < HEIGHT; row++) {
            let { x , y } = calculatePoint(col, row)
            array[row] = ms.checkNumberInSet(x, y)

        }

        postMessage({ col, array })

    }

}
