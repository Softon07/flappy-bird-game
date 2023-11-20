class Wall {
  constructor(canvas, gap, height) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.x = this.canvas.width;
    this.y = 0;
    this.w = 100;
    this.h = height;
    this.gap = gap;
    this.color = getRandomColor();
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.w, this.h);
    this.context.fillRect(
      this.x,
      this.h + this.gap,
      this.w,
      this.canvas.height
    );
  }
}
