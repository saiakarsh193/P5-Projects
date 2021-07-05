let cx, cy;
let ir;
let r;
let R;
let dR;
let sW;

let ww;
let wh;
let wc;

function setup() 
{
  createCanvas(500, 500);
  cx = width / 2;
  cy = height / 2;
  ir = map(width, 0, 500, 0, 8);
  r = map(width, 0, 500, 0, 130);
  R = map(width, 0, 500, 0, 350);
  dR = map(width, 0, 500, 0, 25);
  ww = map(width, 0, 500, 0, 450);
  wh = map(width, 0, 500, 0, 450);
  wc = map(width, 0, 500, 0, 75);
  sW = map(width, 0, 500, 4, 8);
}

function draw() 
{
  background(255);
  translate(cx, cy);

  fill(255);
  stroke(100);
  strokeWeight(2);
  rect(-ww / 2, -wh / 2, ww, wh, wc);

  strokeWeight(sW);
  let hr = hour() % 12;
  let mn = minute();
  let sc = second();

  let rsc = r;
  let asc = 2 * PI * (sc / 60) - (PI / 2);
  stroke(244, 143, 255);
  line(ir * cos(asc), ir * sin(asc), rsc * cos(asc), rsc * sin(asc));
  noFill();
  arc(0, 0, R, R, - (PI / 2), asc);

  let rmn = 2 * rsc / 3;
  let amn = 2 * PI * (mn / 60) - (PI / 2);
  stroke(143, 165, 255);
  line(ir * cos(amn), ir * sin(amn), rmn * cos(amn), rmn * sin(amn));
  noFill();
  arc(0, 0, R + dR, R + dR, - (PI / 2), amn);

  let rhr = 2 * rmn / 3;
  let ahr = 2 * PI * (hr / 12) - (PI / 2);
  stroke(175, 175, 175);
  line(ir * cos(ahr), ir * sin(ahr), rhr * cos(ahr), rhr * sin(ahr));
  noFill();
  arc(0, 0, R + 2 * dR, R + 2 * dR, - (PI / 2), ahr);

  fill(100);
  noStroke();
  textSize(16);
  textAlign(CENTER);
  text(hr + ":" + mn + ":" + sc, 0, 245);
}