const INITIAL = 1;
const GAME_PLAYING = 2;
const GAME_OVER = 3;

const KEY_CODE = {
  R: 82,
};

class FlappyBird {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.currentState = INITIAL;
    this.velocity = 5;
    this.bindEvents();
    this.createObjects();
    this.backgroundSound = new Sound("sounds/background-sound.mp3");
    this.gameOverSound = new Sound("sounds/game-over-sound.mp3");
  }

  createObjects() {
    this.background1 = new GameBackground("images/background.jpg", this.canvas);
    this.background2 = new GameBackground("images/background.jpg", this.canvas);
    this.background2.x = this.canvas.width;
    this.gameScore = new GameScore(this.canvas);
    this.gameScore.x = this.canvas.width - 150;
    this.gameScore.y = 80;
    this.wallFactory = new WallFactory(this.canvas);
    this.bird = new Bird("images/bird.png", this.canvas);
  }

  bindEvents() {
    this.canvas.addEventListener("mousedown", (event) => {
      switch (this.currentState) {
        case INITIAL:
          this.currentState = GAME_PLAYING;
          this.wallFactory.generateWalls();
          break;
        case GAME_PLAYING:
          this.bird.vy = -1 * this.velocity;
          break;
      }
    });

    window.addEventListener("keydown", (event) => {
      switch (this.currentState) {
        case GAME_OVER:
          if (event.keyCode === KEY_CODE.R) {
            this.reset();
            this.currentState = GAME_PLAYING;
          }
          break;
      }
    });
  }

  reset() {
    this.gameScore.start = new Date();
    this.gameScore.score = 0;
    this.wallFactory.walls = [];
    this.bird.x = 115;
    this.bird.y = 115;
  }

  start() {
    window.requestAnimationFrame(() => {
      this.runGameLoop();
    });
  }

  runGameLoop() {
    switch (this.currentState) {
      case INITIAL:
        this.drawInitialScreen();
        this.backgroundSound.play();
        break;
      case GAME_PLAYING:
        this.drawGamePlayingScreen();
        this.backgroundSound.play();
        break;
      case GAME_OVER:
        this.gameOverSound.play();
        setTimeout(()=> {
          this.gameOverSound.stop();
        }, 1000)
        this.backgroundSound.stop();
        this.drawGameOverScreen();
        break;
    }

    window.requestAnimationFrame(() => {
      this.runGameLoop();
    });
  }

  drawInitialScreen() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "white";
    this.context.font = "36px Arial";
    this.context.fillText(
      "Click to Start!",
      this.canvas.width / 2 - 100,
      this.canvas.height / 2
    );
  }

  drawGamePlayingScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.animateBackground();
    this.gameScore.draw();
    this.drawWalls();
    this.bird.draw();
    this.checkCollisions();
  }

  checkCollisions() {
    const walls = this.wallFactory.walls;
    for (let i = 0; i < walls.length; i++) {
      if (this.isCollided(this.bird, walls[i])) {
        this.currentState = GAME_OVER;
        this.backgroundSound.stop();
      }
    }
  }

  isCollided(bird, wall) {
    let isCollided = true;
    const birdTop = this.bird.y;
    const birdBottom = this.bird.y + this.bird.h;
    const birdRight = this.bird.x + this.bird.w;
    const birdLeft = this.bird.x;
    const wallTop = wall.y + wall.h + wall.gap;
    const wallBottom = wall.y + wall.h;
    const wallRight = wall.x + wall.w;
    const wallLeft = wall.x;

    if (
      (birdBottom < wallTop && birdTop > wallBottom) ||
      birdLeft > wallRight ||
      birdRight < wallLeft
    ) {
      isCollided = false;
    }

    return isCollided;
  }

  drawWalls() {
    const walls = this.wallFactory.walls;

    for (let i = 0; i < walls.length; i++) {
      walls[i].draw();

      walls[i].x = walls[i].x - this.velocity;
    }
    this.removeExtraWalls();
  }

  removeExtraWalls() {
    const walls = this.wallFactory.walls;
    for (let i = 0; i < walls.length; i++) {
      if (walls[i].x + walls[i].w < 0) {
        walls.shift();
      }
    }
  }

  animateBackground() {
    this.background1.draw();
    if (Math.abs(this.background1.x) > this.canvas.width) {
      this.background1.x = this.canvas.width - this.velocity;
    }
    this.background1.x = this.background1.x - this.velocity;
    this.background2.draw();
    if (Math.abs(this.background2.x) > this.canvas.width) {
      this.background2.x = this.canvas.width - this.velocity;
    }
    this.background2.x = this.background2.x - this.velocity;
  }

  drawGameOverScreen() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "white";
    this.context.font = "54px Arial";
    this.context.fillText(
      "Your Score: " + this.gameScore.score,
      this.canvas.width / 2 - 180,
      this.canvas.height / 2 - 100
    );
    this.context.font = "36px Arial";
    this.context.fillText(
      "Game Over",
      this.canvas.width / 2 - 100,
      this.canvas.height / 2
    );
    this.context.font = "24px Arial";
    this.context.fillText(
      "Press R to Restart!",
      this.canvas.width / 2 - 100,
      this.canvas.height / 2 + 50
    );
  }
}
