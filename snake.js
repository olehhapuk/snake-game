class Snake {
  constructor() {
    this.x;
    this.y;
    this.vel = {
      x: 1,
      y: 0
    }
    this.maxLength = 10;
    this.tail = [];
    this.prevCoords;

    this.setVelocity = function(x, y) {
      this.vel.x = x;
      this.vel.y = -y;
    }

    this.draw = function() {
      ctx.fillStyle = '#fff';
      this.tail.forEach(part => {
        ctx.fillRect(part.x, part.y, scale, scale);
      })
    }

    this.update = function() {
      this.x += this.vel.x * scale;
      this.y += this.vel.y * scale;

      if (this.vel.x !== 0 || this.vel.y !== 0) {
        this.tail.unshift({ x: this.x, y: this.y });
      
        if (this.tail.length > this.maxLength) {
          this.tail.pop();
        }
      }

      if (this.x === 0 || this.x >= canvas.width - scale) {
        this.vel.x = 0;
      }
      if (this.y === 0 || this.y >= canvas.height - scale) {
        this.vel.y = 0;
      }
    }
  }
}