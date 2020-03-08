const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scale = 10;
const snake = new Snake();
let canChangeDirection = true;

function start() {
  resetCanvas();

  const newCoords = getRandCoords();
  snake.setPosition(newCoords.x, newCoords.y);
  
  setInterval(() => {
    resetCanvas();
    canChangeDirection = true;
    snake.update();
    snake.draw();
  }, 150);
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