const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const pi = Math.PI;

let scale;
let func = 'x';
let gridDensity = 20;

//setting canvas grid css properties
function gridResize() {
  scale = canvas.width/gridDensity;
  canvas.style.backgroundSize = `${scale}px ${scale}px`;
  canvas.style.backgroundPosition = `calc(center+${scale}) center`;
}

// setting canvas size to be in 1x resolution
function resizeCanvasToDisplaySize(canvas) {
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // if it's resolution does not match change it
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
  gridResize();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(canvas.width/2, canvas.height/2);

  // clearing screen
  ctx.clearRect(-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
  // drawing axises
  ctx.strokeStyle='Black';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, 0);
  ctx.stroke();
  ctx.moveTo(0, -canvas.height/2);
  ctx.lineTo(0, canvas.height/2);
  ctx.stroke();
}

function drawGraph(f) {
    ctx.lineWidth = 3;
    ctx.strokeStyle='#198754'; //nice green color
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
  let fStr = document.getElementById('func').value;
  // add 'Math.' prefix to functions
  func = fStr.replace(/(\w+(?=\())/gm, `Math.$1`);
  draw();
}

function draw() {
  initilizeGraph();
  drawGraph(func);
}

//scrolling magic
canvas.addEventListener('wheel', (event) => {
  event.preventDefault();
  gridDensity += Math.floor(event.deltaY/53)*2;
  gridDensity = gridDensity < 2 ? 2 : gridDensity;
  console.log(gridDensity);
  draw();
});

window.addEventListener('resize', draw, true);

draw();