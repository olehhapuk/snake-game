class Snake {
  constructor() {
    this.x;
    this.y;
    this.vel = {
      x: 1,
      y: 0
    }

    this.setVelocity = function(x, y) {
      this.vel.x = x;
      this.vel.y = -y;
    }

    this.setPosition = function(x, y) {
      this.x = x;
      this.y = y;
    }

    this.draw = function() {
      ctx.fillStyle = '#fff';
      ctx.fillRect(this.x, this.y, scale, scale);
    }

    this.update = function() {
      this.x += this.vel.x * scale;
      this.y += this.vel.y * scale;

      if (this.x === 0 || this.x >= canvas.width - scale) {
        this.vel.x = 0;
      }
      if (this.y === 0 || this.y >= canvas.height - scale) {
        this.vel.y = 0;
      }
    }
  }
}