let canvas;
let ctx;
let scale = 20;

function setup() {
  canvas = document.getElementById('basedCanvas');
  ctx = canvas.getContext('2d');
  ctx.translate(canvas.width/2, canvas.height/2);
  initilizeGraph();
  drawGraph("x");
}

function initilizeGraph() {
  ctx.strokeStyle="Gray";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (var x = -canvas.width/2; x < canvas.width/2; x+=50) {
    ctx.moveTo(x,-canvas.height/2);
    ctx.lineTo(x,canvas.height/2);
    ctx.stroke();
    ctx.moveTo(x,-canvas.height/2);
  }
  ctx.beginPath();
  for (var y = -canvas.height/2; y < canvas.height/2; y+=50) {
    ctx.moveTo(-canvas.width/2,y);
    ctx.lineTo(canvas.width/2,y);
    ctx.stroke();
    ctx.moveTo(-canvas.width/2,y);
  }
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
    ctx.lineWidth = 2;
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

function draw() {
  let func = document.getElementById("func").value;
  
  ctx.clearRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
  initilizeGraph();
  drawGraph(func);
}