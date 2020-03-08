class Food {
  constructor() {
    this.x;
    this.y;

    this.setPosition = function(x, y) {
      this.x = x;
      this.y = y;
    }

    this.draw = function() {
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, scale, scale);
    }
  }
}