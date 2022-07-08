//My global Object to hold values for a array of things 
const token = {
    snake: [2,1,0],
    whichWay : 1,
    button: document.querySelector('button'),
    move:0,
    score :0,
    topScore :0,
    objectScore: null,
    onGoing : 0
}
let boardList = [];//array to hold divs of board
let x = 500//speed interval 
//function to create my board based on the value of total
const makeBoard = () =>{   
  let total = 30 * 10
  for(i = 0;i<total;i++){
      let newDiv = document.createElement('div')  
      document.querySelector('#board').append(newDiv)
      
  }
  boardList = document.querySelectorAll('#board div')
}
//Runs game after eventlistner is triggered
const main = () =>{
  if(token.onGoing === 0){
    token.onGoing = 1
    token.snake.forEach((e) =>{
      boardList[e].classList.add('snake');
    })
     boardList[token.snake[0]].classList.add('head');
    placeApple()
    token.x = setInterval(runGame,x)
  }
}
const runGame = () =>{
  //Checks for any collions to walls or if the snake runs into itself
  if ((token.snake[0] + 20 >= (30 * 10) && token.whichWay === 20)//If the div at snake[0] + 10 divs from where it is is greater then the total area of the board AND whichWay equals 20 enter if
  || (token.snake[0] % 20 === 20 -1 && token.whichWay === 1)//if there is a remainder of 1 and whichWay equals 1 enter if 
  || (token.snake[0] % 20 === 0 && token.whichWay === -1) //if there is not remainder and whichWay equals -1 enter if
  || (token.snake[0] - 20 < 0 && token.whichWay === -20) //if the div at snake[0] - 20 from where it is equals 0 and whichWay equals -20 enter if
  || boardList[token.snake[0] + token.whichWay].classList.contains('snake')  //if the head of the snake goes over a div where class equals head enter if
  ) {
      if(token.score > token.topScore){
        token.topScore = token.score;
        document.getElementById('topScore').innerText = token.score
      }
      token.onGoing = 0;
      document.getElementById('gameOver').innerText = 'Game Over'
      return clearInterval(token.x);
   }
  moveSnake()
}
//Function to move the snake to a div based on the value of direction 
const moveSnake = () => {
  let oldTail =  token.snake.pop()//pops the last value in the snake array and gives it to oldTail variable
  boardList[oldTail].classList.remove('snake')//removes the snake class at the oldTail's location on the board
  token.snake.unshift(token.snake[0]+ token.whichWay)//Adds a new head to the snake at the value of the old head plus what the value of whichWay equals
  boardList[token.snake[1]].classList.remove('head');//Removes the head class from the old head
  boardList[token.snake[0]].classList.add('snake')//Adds the snake class to the new head
  boardList[token.snake[0]].classList.add('head')//Adds a new head class to the new head
  if(boardList[token.snake[0]].className === ('apple snake head'))//If the div of the head of the snake goes over the apple div run addSnake
        addSnake(oldTail)
}

//Appends a new div to the snake array with the old Tail value  
const addSnake = (oldTail) =>{
  placeApple()
  boardList[oldTail].classList.add('snake')
  token.snake.push(oldTail)
  token.score++
  token.objectScore =  document.getElementById('score')
  token.objectScore.innerText = token.score; 
}
//Places a apple on the board at random where the board dosen't have a snake value
const placeApple = () =>{
  boardList[token.snake[0]].classList.remove('apple');
  const notSnake = []
    boardList.forEach((value) => { 
     if(value.className != 'snake')
        notSnake.push(value);
  })
  let whereApple = Math.floor(Math.random()*notSnake.length)
  notSnake[whereApple].classList.add('apple')
}

//Resets the game to be able to run smoothly again
const resetGame = () =>{
  if(token.onGoing === 0){
  document.getElementById('gameOver').innerText = ''
  token.snake = [2,1,0]
  token.score = 0;
  if(token.score != 0){
    token.objectScore.innerText = token.score}
  token.whichWay = 1;
  x = 500
  boardList.forEach((e)=>{
    if(e.classList.contains('snake')){
        e.classList.remove('snake')}
    if(e.classList.contains('apple')){
        e.classList.remove('apple')}
    if(e.classList.contains('head')){
        e.classList.remove('head')
    }
    })
  }
}
makeBoard()
token.button.addEventListener('click',resetGame)
token.button.addEventListener('click',main)
//Event listner to trigger when user presses a arrow key
document.onkeydown = (e) => {
  if (e.keyCode === 38) {//Up arrow
      token.whichWay = -20//makes whichWay equal -20 and the snake goes up 10 divs from where it is
  } else if (e.keyCode === 40) {//Down arrow
    token.whichWay = +20 //makes whichWay equal 20 and the snake goes down 10 divs from where it is
  } else if (e.keyCode === 37) {//Left arrow
    token.whichWay = -1 //makes whichWay equal -1 and makes the snake go left
  } else if (e.keyCode === 39) {//Right arrow
    token.whichWay = 1 //makes whichWay equal 1 and makes the snake go right
  }
}
