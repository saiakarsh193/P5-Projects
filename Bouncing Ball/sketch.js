let r = 1;
let v = 0;
let a = 0;
let h = 10;
let cTime = 0;

let g = -9.8;
let lScale = 10;

let cx, cy;
let buffer;

function setup() 
{
  createCanvas(1000, 600);
  cx = width / 2;
  cy = height / 2;
  a = g;
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
  line(-width / 3, 0, width / 3, 0);

  v += a * (deltaTime / 1000);
  h += v * (deltaTime / 1000);
  cTime += (deltaTime / 1000);
  if(h < r)
  {
    h = r + (r - h);
    v = -v;
  }

  stroke(0);
  strokeWeight(1);
  fill(0);
  circle(0, -h * lScale, 2 * r * lScale);
}
