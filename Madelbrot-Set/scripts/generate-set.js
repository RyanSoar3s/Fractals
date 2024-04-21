let canvas = document.getElementById("canvas")
let draw = canvas.getContext("2d")
let x_axis = { start: -2, end: 1 }
let y_axis = { start: -1, end: 1 }
let cols = []

const worker = new Worker("./scripts/worker.js", { type: "module" })
const HEIGHT = canvas.height
const WIDTH = canvas.width
const ZOOM_FACTOR = 0.1

function choose_color(count, maxIter) {
    let color =  ""
    let r = 0
    let g = 0
    let b = 0
    let scale = count / maxIter

    if (scale <= 0.3) {
        g = Math.floor(255 * 20 *  scale)
        b = Math.floor(255 * 60 * scale)
        color = `rgb(${r}, ${g}, ${b})`

    }

    else if (scale <= 0.5) {
        g = Math.floor(255 * 55 * scale)
        b = 110
        color = `rgb(${r}, ${g}, ${b})`

    }

    else {
        g = 50
        b = Math.floor(255 * 25 * scale)
        color = `rgb(${r}, ${g}, ${b})`

    }

    return color


}

const createCol = () => {
    for (let index = 0; index < WIDTH; index++)
        cols[index] = index

    worker.postMessage({ 
                        col: cols.shift(),
                        configurable: false
    
                        })

}

const drawSet =  (e) => {
    if (cols.length > 0) { 
        worker.postMessage({ 
            col: cols.shift(),
            configurable: false

            })
    }

    let { col, array } = e.data

    for (let i = 0; i < HEIGHT; i++){
        let [ maxIter, count, numberInSet ] = array[i]
        let color = (numberInSet) ? "black" : choose_color(count, maxIter)
        draw.fillStyle = color
        draw.fillRect(col, i, 1, 1)
        
    }
}

const init = () => {
    worker.postMessage({
                        w: WIDTH, 
                        h: HEIGHT, 
                        x: x_axis,
                        y: y_axis,
                        configurable: true

                        })

    createCol()

    worker.onmessage = drawSet
    
}

canvas.addEventListener("dblclick", (e) => {
    const ZOOM_WIDTH = WIDTH * ZOOM_FACTOR
    const ZOOM_HEIGHT = HEIGHT * ZOOM_FACTOR

    let pixel_x_start = e.pageX - canvas.offsetLeft - ZOOM_WIDTH
    let pixel_x_end = e.pageX - canvas.offsetLeft + ZOOM_WIDTH

    let pixel_y_start = e.pageY - canvas.offsetTop - ZOOM_HEIGHT
    let pixel_y_end = e.pageY - canvas.offsetTop + ZOOM_HEIGHT

    x_axis = {
        start: getRelativePoint(pixel_x_start, WIDTH, x_axis),
        end:  getRelativePoint(pixel_x_end, WIDTH, x_axis)

    } 

    y_axis = {
        start: getRelativePoint(pixel_y_start, HEIGHT, y_axis),
        end:   getRelativePoint(pixel_y_end, HEIGHT, y_axis)
    }

    init()
})

const getRelativePoint = (pixel, len, set) => set.start + (pixel / len) * (set.end - set.start)

init()
