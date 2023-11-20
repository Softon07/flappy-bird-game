class Sound {
  constructor(soundFile) {
    this.sound = new Audio(soundFile);
    this.isPlaying = false;
  }

  play() {
    this.sound.loop = true;
    this.sound.play();
    this.isPlaying = true;
  }

  stop() {
    this.sound.pause();
    this.sound.currentTime = 0;
    this.isPlaying = false;
  }
}

const backgroundSound = new Sound("sounds/background-sound.mp3");
const gameOverSound = new Sound("sounds/jump-sound.mp3")