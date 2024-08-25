const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const velocidade = 400
const size = 30
const audio = new Audio('./audio.mp3')
const h1 = document.querySelector('#ponto')
const menu = document.querySelector('.menu-screen')
const re_start = document.querySelector('#btn-play')

const snake = [ { x: 0, y: 0}]

let direction; // ex. left, right, top, bottom
let loopId;

re_start.onclick = () => {
    menu.classList.add('ocultar')
    fn_restart()
}
const fn_restart = () => {

    setTimeout( () => {
        objeto.reload(forcedReload);
    }, 2000)
}
const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}
const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}
const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)
    
    return `rgb(${red}, ${green}, ${blue})`
}
const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}
const drawSnake = () => {
    ctx.fillStyle = "#ddd"
    
    snake.forEach( (position, index) => {
        if(index == snake.length -1){
            ctx.fillStyle = "blue"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })
}
const drawFood = () => {
    const {x, y, color} = food

    ctx.shadowColor = color
    ctx.shadowBlur = 50
    ctx.fillStyle = food.color
    ctx.fillRect( x, y, size, size)
    ctx.shadowBlur = 0
}
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'white'

    for(let i=30; i< canvas.width; i += 30){
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}
const moveSnake = () => {
    if(!direction) return
    // const head = snake.at(-1)
    const head = snake[snake.length -1]
    snake.shift()

    if(direction == "right"){
        snake.push( { x: head.x + size, y: head.y } )
    }
    if(direction == "left"){
        snake.push( { x: head.x - size, y: head.y } )
    }
    if(direction == "down"){
        snake.push( { x: head.x, y: head.y + size } )
    }
    if(direction == "up"){
        snake.push( { x: head.x, y: head.y - size } )
    }
}
const checkEat = () => {
    const head = snake[snake.length -1]

    if(head.x == food.x && head.y == food.y){
        snake.push(head)
        audio.play()

        let x = randomPosition()
        let y = randomPosition()

        while(snake.find((position) => position.x == x && position.y == y )){
            x = randomPosition()
            y = randomPosition()
        }
        food.x = x
        food.y = y
        food.color = randomColor()

        h1.innerHTML = gameWin() // incrementa a pontuação
    }
}
const checkCollision = () => {
    const head = snake[snake.length -1]
    const canvasLimit = canvas.width - size
    const neckIndex = snake.length - 2
    const wallCollition = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit
    const selfCollition = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })   
    if(wallCollition){
        // alert('Você perdeu ( parede bateu )')
        gameOver()
    }
    if(selfCollition){
        // alert('Você perdeu ( corpo bateu )')
        gameOver()
    }
}
const gameOver = () => {
    direction = undefined
    menu.classList.add('show')
}
const gameWin = () => {
    let pontos = snake.length;
    return pontos
}
h1.innerHTML = gameWin() // adiciona o valor atual da pontuação
const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600)

    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    checkEat()
    checkCollision()

    loopId = setTimeout( () => {
        gameLoop()
    }, velocidade)
}
gameLoop()
document.addEventListener("keydown", ({ key }) => {
    console.log(key)

    if(key == "ArrowRight" && direction !== "left"){
        direction = "right"
    }

    if(key == "ArrowLeft" && direction !== "right"){
        direction = "left"
    }

    if(key == "ArrowDown" && direction !== "up"){
        direction = "down"
    }

    if(key == "ArrowUp" && direction !== "down"){
        direction = "up"
    }
})