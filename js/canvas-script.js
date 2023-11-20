window.onload = () => {
  const canvas = document.getElementById("flappy-monster-game");
  const flappyBird = new FlappyBird(canvas);
  flappyBird.start();
};
