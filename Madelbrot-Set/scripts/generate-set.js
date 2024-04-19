let canvas = document.getElementById("canvas")
let draw = canvas.getContext("2d")

const worker = new Worker("./scripts/worker.js", { type: "module" })

const HEIGHT = canvas.height
const WIDTH = canvas.width

worker.postMessage([WIDTH, HEIGHT])

worker.onmessage = (e) => {
    let contents = e.data

    contents.forEach(element => {
      draw.fillStyle = element[2]
      draw.fillRect(element[0], element[1], 1, 1)
        
    })
}

