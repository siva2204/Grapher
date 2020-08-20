const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 300;
canvas.height = 600;

var centerX = canvas.width / 2; //math center
var centerY = canvas.height / 2; //math center

var range = 20;
var scaleX = canvas.width / range;
var scaleY = canvas.height / range;

var marksize = 15;

window.addEventListener("resize", () => {
  location.reload();
  coordsaxis();
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

  var xposInc = 1 * scaleX;
  var xpos, unit;

  xpos = centerX - xposInc;
  unit = -1 * 1;

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

coordAxes();
