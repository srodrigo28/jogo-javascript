const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const size = 30

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "white"

    for (let i = size; i < canvas.width; i += size) {
        // ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}
drawGrid()