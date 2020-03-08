class Snake {
  constructor() {
    this.vel = {
      x: 1,
      y: 0
    }
    this.length = 1;
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
      for (let i = 0; i < this.tail.length; i++) {
        if (i === 0) {
          this.tail[i].x += this.vel.x * scale;
          this.tail[i].y += this.vel.y * scale;
          if (this.tail.length <= 1) {
            this.prevCoords = this.tail[i];
          }
        } else {
          this.tail[i] = this.prevCoords;
        }
      }

      // if (this.x === 0 || this.x >= canvas.width - scale) {
      //   this.vel.x = 0;
      // }
      // if (this.y === 0 || this.y >= canvas.height - scale) {
      //   this.vel.y = 0;
      // }
    }
  }
}