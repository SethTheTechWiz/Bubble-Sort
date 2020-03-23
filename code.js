var canvas = document.getElementById("canvas");
var render = canvas.getContext("2d");
render.imageSmoothingEnabled = false;

var numbers = [];
var sortedNumbers = [];
const amount = 150;
const margin = 1;
const size = 2;
const clock = 0;

var bars = [];

const randomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Bar {
  constructor(data = {}) {
    this.x = data.x || 0;
    this.y = data.y || 0;
    this.w = data.w || 20;
    this.h = data.h || 20;
    this.color = data.color || "white";
  }

  render() {
    let saveFillStyle = render.fillStyle;

    render.fillStyle = this.color;

    render.fillRect(this.x, this.y, this.w, this.h);

    render.fillStyle = saveFillStyle;
  }
}

class CanvasText {
  constructor(data = {}) {
    this.x = data.x || 0;
    this.y = data.y || 100;
    this.text = data.text || "Hello World";
    this.color = data.color || "white";
    this.font = data.font || "Arial";
    this.fontSize = data.fontSize || "20px";
    this.alignment = data.alignment || "start";
    this.mode = data.mode || "fill";
  }

  render() {
    let saveFont = render.font;
    let saveFillStyle = render.fillStyle;
    let saveTextAlign = render.textAlign;

    render.font = this.fontSize + " " + this.font;
    render.fillStyle = this.color;
    render.textAlign = this.alignment;

    if (this.mode === "fill") {
      render.fillText(this.text, this.x, this.y);
    } else if (this.mode === "stroke") {
      render.strokeText(this.text, this.x, this.y);
    }

    render.font = saveFont;
    render.fillStyle = saveFillStyle;
    render.textAlign = saveTextAlign;
  }
}

const renderCanvas = function() {
  render.fillStyle = "black";
  render.fillRect(0, 0, canvas.width, canvas.height);

  if (!stop) {
    if (i < numbers.length) {
      bars[i].color = "red";

      if (numbers[i] > numbers[i + 1]) {
        bars[i].color = "blue";
        bars[i + 1].color = "blue";
        let temp = numbers[i];
        numbers[i] = numbers[i + 1];
        numbers[i + 1] = temp;
        swapCount++;
        accesses += 4;
      }

      comparisons++;
      accesses++;
      i++;
    } else {
      if (swapCount === 0) {
        stop = true;
      }

      swapCount = 0;
      i = 0;
    }
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].y = canvas.height - (numbers[i] * size);
    bars[i].h = numbers[i] * size;
    bars[i].render();
    if (bars[i].color != "white") {
      bars[i].color = "white";
    }
  }

  comparsionText.text = "Comparisons: " + comparisons;
  comparsionText.render();

  accessesText.text = "Accesses: " + accesses;
  accessesText.render();
}

for (let i = 0; i < amount; i++) {
  numbers[i] = randomNumber(1, 20);
}

for (let i = 0; i < numbers.length; i++) {
  bars.push(new Bar({
    x: (i * size),
    y: canvas.height - (numbers[i] * size),
    w: size - margin,
    h: numbers[i] * size
  }));
}

var i = 0;
var swapCount = null;
var stop = false;

var comparisons = 0;
var comparsionText = new CanvasText({
  y: 17,
});

var accesses = 0;
var accessesText = new CanvasText({
  y: 33,
  fontSize: "15px"
});

let interval = setInterval(renderCanvas, clock);
