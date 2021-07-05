let r;
let v;
let V;
let x;
let y;
let cTime;
let px;
let py;

let lx;
let ly;

let lScale;

let cx, cy;
let buffer;

function setup() 
{
  createCanvas(1000, 600);
  cx = width / 2;
  cy = height / 2;
  r = 10;
  v = 6;
  V = 2;
  x = r;
  y = 0;
  cTime = 0;
  px = 2 * r;
  py = 2 * r;
  lx = 0;
  ly = 0;
  lScale = 10;
  buffer = createGraphics(width, height);
  buffer.background(175);
  buffer.translate(cx, cy);
}

function draw() {
  background(175);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);
  translate(cx, cy);

  stroke(0);
  strokeWeight(2);
  fill('rgba(175, 175, 175, 0.0)');
  circle(0, 0, 2 * r * lScale);

  cTime += (deltaTime / 1000);
  x = r * sin(cTime * V);
  y = r * cos(cTime * V);

  stroke(0);
  strokeWeight(1);
  fill(0);
  circle(x * lScale, y * lScale, 15);

  let a = x - px;
  let b = y - py;
  let denom = sqrt(a * a + b * b);
  a /= denom;
  b /= denom;
  px += v * (deltaTime / 1000) * a;
  py += v * (deltaTime / 1000) * b;

  stroke(0);
  strokeWeight(1);
  line(px * lScale, py * lScale, x * lScale, y * lScale);

  stroke(255, 0, 0);
  strokeWeight(1);
  fill(255, 0, 0);
  circle(px * lScale, py * lScale, 10);

  buffer.stroke(255, 0, 0);
  buffer.strokeWeight(1);
  if (frameCount > 1)
  {
    buffer.line(lx * lScale, ly * lScale, px * lScale, py * lScale);
  }
  lx = px;
  ly = py;
}
