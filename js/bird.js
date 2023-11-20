class Bird {
  constructor(src, canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.x = 130;
    this.y = 130;
    this.w = 130;
    this.h = 130;
    this.vy = 0;
    this.g = 0.2;
    this.src = src;
    this.img = null;
    this.frame = 0;
    this.create();
  }

  create() {
    this.img = new Image();
    this.img.src = this.src;
  }

  draw() {
    this.vy = this.vy + this.g;
    this.y = this.y + this.vy;
    if (this.y + this.h > this.canvas.height) {
      this.y = this.canvas.height - this.h;
      this.vy = 0;
    } else if (this.y < 0) {
      this.y = 0;
      this.vy = 0;
    }
    this.context.drawImage(
      this.img,
      this.frame * 130,
      0,
      130,
      100,
      this.x,
      this.y,
      this.w,
      this.h
    );
    this.frame++;
    this.frame %= 4;
  }
}
