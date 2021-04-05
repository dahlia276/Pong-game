const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let currentGame
let newBar
let newBall

const startGame = document.getElementById('start-button')
startGame.addEventListener('click', () => {
     currentGame = new Game()
     newBar = new Bar();
     newBall = new Ball();
    currentGame.ball = newBall
    currentGame.bar = newBar
    updateCanvas()

})
//DECLARATONS
//newBar.draw();

//newBall.draw();

document.addEventListener('keydown', (e) => {
    newBar.moveBar(e.keyCode);
});

//collision
function detectCollision(newBar) {
    return !((currentGame.ball.x > newBar.x + newBar.width) ||
     (currentGame.ball.x + currentGame.ball.width < newBar.x) ||
     (currentGame.ball.y > newBar.y + newBar.height))

    //if (newBall.y + newBall.vy > newBar.width || newBall.y + newBall.vy < 0) {
      //  newBall.vy *= -1;
     // }

     /*
      if ((this.newBall.vy < 0 && this.newBall.y < 0) ||
            (this.newBall.vy > 0 && this.newBall.y + this.newBall.height > this.height)) {
        this.newBall.vy = -this.newBall.vy;
        */
    }
 

//UPDATE CANVAS
function updateCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    currentGame.ball.x += currentGame.ball.vx;
    currentGame.ball.y += currentGame.ball.vy;
    /*
    if (currentGame.ball.y + currentGame.ball.vy > canvas.height || currentGame.ball.y + currentGame.ball.vy < 0) {
        currentGame.ball.vy *= -1;
    }
    */
    if (currentGame.ball.y + currentGame.ball.vy > currentGame.bar.y || currentGame.ball.y + currentGame.ball.vy < currentGame.bar.y + currentGame.bar.width) {
        currentGame.ball.vy *= -1;
    }
    if (currentGame.ball.x + currentGame.ball.vx > canvas.width || currentGame.ball.x + currentGame.ball.vx < 0) {
        currentGame.ball.vx *= -1;

    }
    currentGame.ball.draw();
    newBar.draw();
    requestAnimationFrame(updateCanvas);
  }



