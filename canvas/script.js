const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const size = 70

const drawGrid = () => {
    ctx.lineWidth = 2
    ctx.strokeStyle = "red"

        // for inicio, tamponho, fim
        // for of: array, for in: obj
        
        // 01. for
        // 02. forEach
        // 03. for of
        // 04. for in
        
        // 05. while
        // 06. do-while
        
        // 07. map
        // 08. filter
        // 09. reduce
    for ( let i = size; i < canvas.width; i += size) {
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

setTimeout( () => {
    alert('hello')
}, 6000)