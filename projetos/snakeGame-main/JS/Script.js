const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu =document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

const audio = new Audio('Assets/audio.mp3')

/*ctx.fillStyle = "red"  estilo do preenchimento
ctx.fillRect(300, 300, 50, 50) */

const size = 30

const inicialPosicao = {x: 270, y: 270}

let snake = [inicialPosicao]

const incrementScore = () => {
  score.innerText = +score.innerText + 10
}

const randomNumber = (min, max) => {
  return Math.round (Math.random() * (max - min) + min) /* numero aleatorio meu maximo 
  menos o minimo*/
}

const randomPosition = () => {
 const number = randomNumber(0, canvas.width - size)
 return Math.round(number / 30) *30 /* divide o numero gerado por 
 30 arrendonda com round e multiplica por 30*/
}

const randomColor = () => {
 const red = randomNumber(0,255)
 const green = randomNumber(0,255)
 const blue = randomNumber(0,255)

 return`rgb(${red}, ${green}, ${blue})`
}




const food = {
  x:randomPosition(), 
  y:randomPosition(),
  color: randomColor()
}


let direction, loopId

const drawFood = () => {

  const {x, y, color} = food
    
  ctx.shadowColor = color
  ctx.shadowBlur  = 8
    ctx.fillStyle = color
    ctx.fillRect(food.x, food.y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = "#ddd"

    snake.forEach((position, index) =>{

        if(index == snake.length -1){
           ctx.fillStyle = "green"
        }

        ctx.fillRect(position.x , position.y , size, size)
    })
}

const moveSnake = () => {
if(!direction) return /* pula o bloco a baixo*/

  const head = snake[snake.length -1]

  snake.shift()

  if (direction == "right") {
    snake.push({x: head.x + size, y: head.y})
  }
  if (direction == "left") {
    snake.push({x: head.x - size, y: head.y})
  }

  if (direction == "down") {
    snake.push({x: head.x , y: head.y + size,})
  }
  if (direction == "up") {
    snake.push({x: head.x , y: head.y - size,})
  }
}

const drawGrid = () =>{
  ctx.lineWidth = 1
  ctx.strokeStyle = "191919"

  for (let i =30; i< canvas.width; i += 30){
    ctx.beginPath()  // desenha uma linha e depois começa de novo parar não fazer as linhS GRUDAREM
    ctx.lineTo(i, 0)
    ctx.lineTo(i, 600)
    ctx.stroke()

    ctx.beginPath()  // desenha uma linha e depois começa de novo parar não fazer as linhS GRUDAREM
    ctx.lineTo(0, i)
    ctx.lineTo(600, i) 
    ctx.stroke()
  
  } 
}

const chackEat = () =>{
  const head = snake[snake.length -1]

  if (head .x == food .x && head .y == food .y){
    incrementScore()
    snake.push(head)
    audio.play()

  let x = randomPosition()
  let y = randomPosition()

  while (snake.find((position) => position.x == x && position.y == y)){
     x = randomPosition()
     y = randomPosition()
  }

     food.x = x
     food.y = y
     food.color = randomColor()
       
  }

}

const colisao = () =>{
  const head = snake[snake.length -1]
  const limiteCanvas = canvas.width - size
  const neckIndex = snake.length -2

  const wallColision = head.x < 0  || head.x > limiteCanvas || head.y < 0 || head.y > limiteCanvas
  
  const colisaoSnake = snake.find((position, index) => {
   return index < neckIndex && position.x == head.x && position.y == head.y
  })

  if(wallColision || colisaoSnake){
   gameOver()
  }

}

const gameOver = () => {
  direction = undefined


  menu.style.display = "flex"
  finalScore.innerText = score.innerText
  canvas.style.filter = "blur(2px)"
}


const gameLoop = () => {
  clearInterval(loopId)

  ctx.clearRect(0, 0, 600,600) /* limpando a cada vez que o looping roda*/
  drawGrid() // caminho da cobra
  drawFood() /* comida*/
  moveSnake() /* move ela*/
  drawSnake() /*desenha ela*/
  chackEat() //verifica se ela comeu a comida
  colisao() // quando bater 
 

   loopId = setTimeout(() =>{
    gameLoop()
  }, 150) /*espera o tempo e chama ela mesma de novo*/
}

gameLoop()

document.addEventListener("keydown", ({ key }) => {
  if (key == "ArrowRight" && direction != "left") { /*se a tecla direita for clicada e a direcção for diferente de esquerda move para direita*/
      direction = "right"
  }

  if (key == "ArrowLeft" && direction != "right") {
      direction = "left"
  }

  if (key == "ArrowDown" && direction != "up") {
      direction = "down"
  }

  if (key == "ArrowUp" && direction != "down") {
      direction = "up"
  }
})

buttonPlay.addEventListener("click", () =>{
  score.innerText = "00"
  menu.style.display = "none"
  canvas.style.filter = "none"

  snake = [inicialPosicao]
})


