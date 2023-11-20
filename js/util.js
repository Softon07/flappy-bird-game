class Util {
  static requestAnimFrame(callback) {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    )(callback);
  }

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static getRandomColor() {
    const red = Util.getRandomInt(0, 257);
    const green = Util.getRandomInt(0, 257);
    const blue = Util.getRandomInt(0, 257);
    return `rgb(${red}, ${green}, ${blue})`;
  }
}

window.requestAnimFrame = Util.requestAnimFrame;
window.getRandomInt = Util.getRandomInt;
window.getRandomColor = Util.getRandomColor;
