let canvas = document.getElementById("canvas")
let draw = canvas.getContext("2d")
let x_axis = { start: -2, end: 1}
let y_axis = { start: -1, end: 1}
let cols = []

const worker = new Worker("./scripts/worker.js", { type: "module" })
const HEIGHT = canvas.height
const WIDTH = canvas.width
const ZOOM_FACTOR = 0.1

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
        let [ count, numberInSet ] = array[i]
        let color = (numberInSet) ? "black" : choose_color(count)
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
