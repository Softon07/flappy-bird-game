class WallFactory {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.gap = 200;
    this.maxGap = 300;
    this.freq = 1500;
    this.walls = [];
  }

  generateWalls() {
    setInterval(() => {
      const gap = getRandomInt(this.gap, this.maxGap);
      const height = getRandomInt(0, this.maxGap);
      const wall = new Wall(this.canvas, gap, height);
      this.walls.push(wall);
    }, this.freq);
  }
}
