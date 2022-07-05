const token = {
    score: 0,
    wins: 0,
    whereApple: 0,
    snake: [0,1,2],
    whichWay : 1,
    button: document.querySelector('button'),
    move:0,
    x: 1000
}
let boardList = [];
let x = 1000
const makeBoard = () =>{   
  let total = 30 * 10
  for(i = 0;i<total;i++){
      let newDiv = document.createElement('div')  
      document.querySelector('#board').append(newDiv)
  }
  boardList = document.querySelectorAll('#board div')
}
const main = () =>{
  placeApple()
  token.snake.forEach((e) =>{
  boardList[e].classList.add('snake');
})
  
 token.x = setInterval(snakeMove,x)
  
}
const snakeMove = () =>{
  if(token.move>= 3){
  if ((token.snake[0] + 20 >= (20 * 20) && token.whichWay === 20 ) || (token.snake[0] % 20 === 20 -1 && token.whichWay === 1) || (token.snake[0] % 20 === 0 && token.whichWay === -1) || (token.snake[0] - 20 < 0 && token.whichWay === -20) ||  (boardList[token.snake[0] + token.whichWay].className === 'snake') //if snake goes into itself
  ) {
    console.log('game over')
    return clearInterval(token.x); //this will clear the interval if any of the above happen
  }else{
    if((token.snake[0] + 20 >= (20 * 20) && token.whichWay === 20 ) || (token.snake[0] % 20 === 20 -1 && token.whichWay === 1) || (token.snake[0] % 20 === 0 && token.whichWay === -1) || (token.snake[0] - 20 < 0 && token.whichWay === -20)){
    console.log('game over')
    return clearInterval(token.x);}
  }
}
token.move++

let oldTail =  token.snake.pop()
boardList[oldTail].classList.remove('snake')
token.snake.unshift(token.snake[0]+ token.whichWay)
boardList[token.snake[0]].classList.add('snake')
if(boardList[token.snake[0]].className === ('apple snake')){
  placeApple()
  boardList[oldTail].classList.add('snake')
  token.snake.push(oldTail)
}

}

document.onkeydown = (e) => {

    if (e.keyCode === 38) {
        token.whichWay = -20
    } else if (e.keyCode === 40) {
      token.whichWay = +20
    } else if (e.keyCode === 37) {
      token.whichWay = -1
    } else if (e.keyCode === 39) {
      token.whichWay = 1
    }
  }
makeBoard()
token.button.addEventListener('click',main)
const hasDied = () =>{

}
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