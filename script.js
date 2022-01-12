let canvas;
let ctx;
let scale;
let func = "x";

function setup() {
  canvas = document.getElementById('basedCanvas');
  ctx = canvas.getContext('2d');
  draw();
}

//setting canvas size to be in 1x resolution
function resizeCanvasToDisplaySize(canvas) {
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // If it's resolution does not match change it
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }

  return false;
}

function initilizeGraph() {
  //resizing stuff
  resizeCanvasToDisplaySize(canvas);
  scale = canvas.width/16;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(canvas.width/2, canvas.height/2);

  //clearing screen
  ctx.clearRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
  //setting stroke style
  ctx.strokeStyle="Gray";
  ctx.lineWidth = 1;
  //tracing vertical grid
  ctx.beginPath();
  for (var x = -canvas.width/2; x < canvas.width/2; x+=scale) {
    ctx.moveTo(x,-canvas.height/2);
    ctx.lineTo(x,canvas.height/2);
    ctx.stroke();
    ctx.moveTo(x,-canvas.height/2);
  }
  //tracing horizontal grid
  ctx.beginPath();
  for (var y = -canvas.height/2; y < canvas.height/2; y+=scale) {
    ctx.moveTo(-canvas.width/2,y);
    ctx.lineTo(canvas.width/2,y);
    ctx.stroke();
    ctx.moveTo(-canvas.width/2,y);
  }
  //drawing axises
  ctx.beginPath();
  ctx.strokeStyle="Black";
  ctx.lineWidth = 3;
  ctx.moveTo(-canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, 0);
  ctx.stroke();
  ctx.moveTo(0, -canvas.height/2);
  ctx.lineTo(0, canvas.height/2);
  ctx.stroke();
}

function drawGraph(f) {
    ctx.lineWidth = 3;
    ctx.strokeStyle="#198754"; //nice green color
    ctx.beginPath();
    let x_ = -canvas.width/2;
    let x = x_/scale;
    let y = -eval(f)*scale;
    ctx.moveTo(x_,y);

    for (x_; x_<canvas.width/2; x_++)  {
      x = x_/scale;
      y = -eval(f)*scale;
      ctx.lineTo(x_,y);
    }
    ctx.stroke();
}

function buttonPress() {
  func = document.getElementById("func").value;
  draw();
}

function draw() {
  initilizeGraph();
  drawGraph(func);
}

requestAnimationFrame(draw);