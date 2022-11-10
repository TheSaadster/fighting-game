function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}
function determineWinner({ player1, player2, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#result").style.display = "flex";
  if (player1.health === player2.health) {
    document.querySelector("#result").innerHTML = "Tie";
  } else if (player1.health > player2.health) {
    document.querySelector("#result").innerHTML = "Player 1 Wins";
  } else if (player1.health < player2.health) {
    document.querySelector("#result").innerHTML = "Player 2 Wins";
  }
}
let timer = 60;
let timerId;
function decreaseTimer() {
  timerId = setTimeout(decreaseTimer, 1000);
  if (timer > 0) {
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  if (timer === 0) {
    askRestart();
    determineWinner({ player1, player2, timerId });
  }
}
function resetTimer(){
  timer = 60;
  decreaseTimer()
}
function resetHealth(){
  player1.health = 100;
  player2.health = 100;
  player1.dead = false;
  player2.dead = false;
  document.querySelector("#player1-hp").style.width = player2.health + "%";
  document.querySelector("#player2-hp").style.width = player2.health + "%";
}
function resetPosition(){
  player1.position = {
    x: -100,
    y: 0,
  }
  player2.position = {
    x: 700,
    y: 100,
  }
  player1.image = player1.sprites.idle.image
  player2.image = player2.sprites.idle.image
}
function reset(){
  resetTimer()
  resetHealth()
  resetPosition()
  document.querySelector("#result").style.display = "none";
  document.querySelector("#restart").style.display = "none";

}