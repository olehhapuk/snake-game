const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scale = 10;
const snake = new Snake();
const food = new Food();
let canChangeDirection = true;
let gameEnd = false;

function start() {
  resetCanvas();

  spawnSnake();
  spawnFood();
  
  setInterval(() => {
    resetCanvas();
    canChangeDirection = true;
    snake.update();

    // Check if snake eats the food
    if (checkCollisions(snake.tail[0], food)) {
      eatFood();
      spawnFood();
    }
    // Check if snake touches itself
    snake.tail.forEach((partA, i) => {
      snake.tail.forEach((partB, j) => {
        if (checkCollisions(partA, partB) && i !== j) {
          endGame();
        }
      });
    });

    food.draw();
    snake.draw();
    drawScore();
  }, 150);
}

function endGame() {
  snake.vel.x = 0;
  snake.vel.y = 0;
  gameEnd = true;
  setTimeout(() => {
    location.reload();
  }, 3000);
}

function checkCollisions(a, b) {
  if (a.x === b.x && a.y === b.y) {
    return true;
  }
  return false;
}

function eatFood() {
  snake.maxLength++;
}

function spawnSnake() {
  const newCoords = getRandCoords();
  snake.x = newCoords.x;
  snake.y = newCoords.y;
}

function spawnFood() {
  const newCoords = getRandCoords();
  food.setPosition(newCoords.x, newCoords.y);
}

addEventListener('keydown', e => {
  if (canChangeDirection && !gameEnd) {
    if (e.key === 'ArrowUp' && snake.vel.y === 0 && snake.y > 0) {
      snake.setVelocity(0, 1);
      canChangeDirection = false;
    } else if (e.key === 'ArrowDown' && snake.vel.y === 0 && snake.y < canvas.height - scale) {
      snake.setVelocity(0, -1);
      canChangeDirection = false;
    } else if (e.key === 'ArrowLeft' && snake.vel.x === 0 && snake.x > 0) {
      snake.setVelocity(-1, 0);
      canChangeDirection = false;
    } else if (e.key === 'ArrowRight' && snake.vel.x === 0 && snake.x < canvas.width - scale) {
      snake.setVelocity(1, 0);
      canChangeDirection = false;
    }
  }
});

function drawScore() {
  if (gameEnd) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.lineWidth = 3;
    ctx.font = '50px sans-serif';
    ctx.strokeText(`Score: ${snake.maxLength}`, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = 'lightgreen';
    ctx.font = '60 sans-serif';
    ctx.fillText(`Score: ${snake.maxLength}`, canvas.width / 2, canvas.height / 2);
  } else {
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';
    ctx.lineWidth = 3;
    ctx.font = '26px sans-serif';
    ctx.strokeText(`Score: ${snake.maxLength}`, canvas.width - 26 / 2, 26 / 2);
    ctx.fillStyle = 'lightgreen';
    ctx.font = '28px sans-serif';
    ctx.fillText(`Score: ${snake.maxLength}`, canvas.width - 28 / 2, 28 / 2);
  }
}

function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getRandCoords() {
  const coords = {
    x: Math.floor(Math.random() * canvas.width / scale) * scale,
    y: Math.floor(Math.random() * canvas.height / scale) * scale
  }
  return coords;
}

start();