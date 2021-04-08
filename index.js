const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//DECLARATONS
let currentGame
let newBar
let newBall
let secondBall
let animationId;
const gameOverBtn = document.getElementById('game-over')
gameOverBtn.style.display  = 'none'; 
gameOverBtn.addEventListener('click', () => {
    location.reload()
})


const startGame = document.getElementById('start-button')
document.getElementById('start-button').style.display  = 'block';
startGame.addEventListener('click', () => {
     let audio = new Audio('./Sounds/mixkit-peenzee-otraak-610.mp3');
     audio.play();
     currentGame = new Game()
     newBar = new Bar();
     newBall = new Ball("#ffb499");
    currentGame.balls.push(newBall)

    currentGame.bar = newBar
    updateCanvas()
    //button dissapear after game starts
    document.getElementById('start-button').style.display  = 'none'; 

})


document.addEventListener('keydown', (e) => {
    newBar.moveBar(e.keyCode);
});

//collision
/*
function detectCollision(newBar) {
    return !((currentGame.ball.x > newBar.x + newBar.width) ||
     (currentGame.ball.x + currentGame.ball.width < newBar.x) ||
     (currentGame.ball.y > newBar.y + newBar.height ))
    }
*/
function checkSecondLevel() {
    if(currentGame.score === 60 && currentGame.balls.length < 2) {
        secondBall = new Ball("#f9efb8");
        currentGame.balls.push(secondBall)
    }
}


//UPDATE CANVAS

function updateCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    checkSecondLevel()
    currentGame.balls.forEach(ball => {

  
   ball.x += ball.vx;
    ball.y += ball.vy;
    //drop
    if (ball.y + ball.vy > canvas.height ||
       ball.y > currentGame.bar.y && 
         ball.x > currentGame.bar.x && 
         ball.x < currentGame.bar.x + currentGame.bar.width  ) {
      cancelAnimationFrame(animationId);
     ball.y = 0;
      let username = document.getElementById('username').value;
      localStorage.setItem(`${username}`, currentGame.score);

      currentGame.gameOver = true;
      score.innerText= 0;
      document.getElementById('game-over').style.display  = 'block'; 
      buildLeaderBoard();

    }
    //top
    if (ball.y + ball.vy < 0) {
      ball.vy *= -1;
    }
    //bar
    if (
     ball.y + ball.vy > currentGame.bar.y &&
      ball.x + ball.vx > currentGame.bar.x &&
      ball.x + ball.vx <
        currentGame.bar.x + currentGame.bar.width
    ) { //score
      ball.vy *= -1;
      currentGame.score += 5;
      document.getElementById('score').innerText = currentGame.score;
    }
    //sides
    if (
      ball.x + ball.vx > canvas.width ||
      ball.x + ball.vx < 0
    ) {
      ball.vx *= -1;
    }
   ball.draw();
    newBar.draw();
})

if (!currentGame.gameOver) {
    animationId = requestAnimationFrame(updateCanvas);
}
    checkScore()
}


/*
function updateCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  //  checkSecondLevel()
    currentGame.balls.forEach(ball => {

  
   ball.x += ball.vx;
    ball.y += ball.vy;
    
   ball.draw();
    newBar.draw();

})

if (!currentGame.gameOver) {
    animationId = requestAnimationFrame(updateCanvas);
}
    checkScore()
}
*/

function checkScore() {
    if(currentGame.score >= 50 && 
        currentGame.score < 70) {
        currentGame.bar.bigger = true
    } else if(currentGame.score >= 65){
        currentGame.bar.bigger = false
    }
}


function getScores() {
    let scores = []
    let localStorageKeys = Object.keys(localStorage);
    
    for (let i=0;i<localStorageKeys.length; i++) {
        scores.push(
            {
                name: localStorageKeys[i],
                score: localStorage.getItem(localStorageKeys[i])
            })
    } 
    return scores;
}

function buildLeaderBoard() {
    let scores = getScores();
    let parentElement = document.getElementById('leaderBoard');
    parentElement.innerHTML = "";
    scores.sort((a, b) => b.score - a.score); //to order things by number(highest to lowest)
    scores.forEach((score, index) => {
        parentElement.innerHTML += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${score.name}</td>
                <td>${score.score}</td>
            </tr>
        `
    });
}

buildLeaderBoard();


  


