const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 300;
canvas.height = 600;

var centerX = canvas.width / 2; //math center
var centerY = canvas.height / 2; //math center
var unit = 1;

var range = 20;
var scaleX = canvas.width / range;
var scaleY = canvas.height / range;

var marksize = 15;

var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;
var log = Math.log;
var exp = Math.exp;
var abs = Math.abs;
var pow = Math.pow;

var colors = [];

var algebra = document.querySelector("#algebra");
var other = document.querySelector("#other");

window.addEventListener("resize", () => {
  location.reload();
});

function coordAxes() {
  ctx.save();
  ctx.strokeStyle = "skyblue";
  ctx.lineWidth = "3";
  ctx.lineCap = "square";
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.lineWidth = "1";

  ctx.font = "13px Calibri";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  var xposInc = scaleX;
  var xpos, unit;

  xpos = centerX - xposInc;
  unit = -1;

  //left ticks
  while (xpos > 0) {
    ctx.moveTo(xpos, centerY + marksize / 2);
    ctx.lineTo(xpos, centerY - marksize / 2);
    ctx.stroke();
    ctx.fillText(unit, xpos, centerY + marksize / 2 + 5);
    unit -= 1;
    xpos = Math.round(xpos - xposInc);
  }
  //right ticks

  xpos = centerX + xposInc;
  unit = +1 * 1;

  while (xpos < canvas.width) {
    ctx.moveTo(xpos, centerY - marksize / 2);
    ctx.lineTo(xpos, centerY + marksize / 2);
    ctx.stroke();
    ctx.fillText(unit, xpos, centerY + marksize / 2 + 5);
    unit += 1;
    xpos = Math.round(xpos + xposInc);
  }

  var yposInc = 1 * scaleY;
  var ypos;

  //topticks
  ypos = centerY - yposInc;
  unit = 1;

  while (ypos > 0) {
    ctx.moveTo(centerX - marksize / 2, ypos);
    ctx.lineTo(centerX + marksize / 2, ypos);
    ctx.stroke();
    ctx.fillText(unit, centerX - marksize / 2, ypos);
    unit += 1;
    ypos = Math.round(ypos - yposInc);
  }

  //downticks

  ypos = centerY + yposInc;
  unit = -1;

  while (ypos < canvas.height) {
    ctx.moveTo(centerX - marksize / 2, ypos);
    ctx.lineTo(centerX + marksize / 2, ypos);
    ctx.stroke();
    ctx.fillText(unit, centerX - marksize / 2, ypos);
    unit -= 1;
    ypos = Math.round(ypos + yposInc);
  }

  ctx.restore();
}

function drawfunction(equation) {
  ctx.save();
  transformation();

  ctx.beginPath();
  ctx.moveTo(-range / 2, equation(-range / 2));

  for (var x = -range / 2 + range / 1000; x <= range / 2; x += range / 1000) {
    ctx.lineTo(x, equation(x));
  }
  ctx.restore();
  ctx.lineJoin = "round";
  ctx.lineWidth = "3";
  ctx.strokeStyle = "#262626";
  ctx.stroke();
}

function transformation() {
  ctx.translate(centerX, centerY);
  ctx.scale(scaleX, -scaleY);
}

coordAxes();

function draw() {
  if (algebra.value) {
    drawfunction(function (x) {
      return eval(algebra.value);
    });
  }
  if (other.value) {
    drawfunction(function (x) {
      return eval(other.value);
    });
  }
}
