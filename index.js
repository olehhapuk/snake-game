const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scale = 10;
const snake = new Snake();
const food = new Food();
let canChangeDirection = true;

function start() {
  resetCanvas();

  spawn(snake);
  spawn(food);
  
  setInterval(() => {
    resetCanvas();
    canChangeDirection = true;
    snake.update();
    
    // Check if snake eats the food
    if (checkCollisions(snake, food)) {
      spawn(food);
    }

    food.draw();
    snake.draw();
  }, 150);
}

function checkCollisions(a, b) {
  if (a.x === b.x && a.y === b.y) {
    return true;
  }
  return false;
}

function spawn(obj) {
  const newCoords = getRandCoords();
  obj.setPosition(newCoords.x, newCoords.y);
}

addEventListener('keydown', e => {
  if (canChangeDirection) {
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