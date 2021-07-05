let launch_x;
let launch_y;
let stopTelemetry = false;

let position_x;
let position_y;
let velocity_x;
let velocity_y;
let acceleration_x;
let acceleration_y;
let last_position_x;
let last_position_y;

let g;
let lScale;
let ballRad;
let cx, cy;
let path_buffer;
let text_buffer;

let cTime;

function setup() 
{
  createCanvas(1000, 600);
  cx = width / 2;
  cy = height - 20;

  launch_x = -80;
  launch_y = 0;

  position_x = launch_x;
  position_y = launch_y;
  velocity_x = 5;
  velocity_y = 100;
  acceleration_x = 0;
  acceleration_y = 0;
  last_position_x = position_x;
  last_position_y = position_y;

  g = -9.8;
  lScale = 1;
  cTime = 0;
  ballRad = 4;

  path_buffer = createGraphics(width, height);
  path_buffer.background(175, 175, 175, 0);
  path_buffer.translate(cx, cy);

  text_buffer = createGraphics(width, height);
  text_buffer.background(175, 175, 175, 0);
  text_buffer.translate(cx, cy);
}

function draw() 
{
  background(200);
  imageMode(CORNER);
  image(text_buffer, 0, 0, width, height);
  image(path_buffer, 0, 0, width, height);
  translate(cx, cy);

  stroke(0);
  strokeWeight(2);
  line(-width / 2, 2 + ballRad, width / 2, 2 + ballRad);
  stroke(125);
  strokeWeight(6);
  line(launch_x - 10, 3 + launch_y, launch_x + 10, 3 + launch_y);

  let dT = min(deltaTime, 50) / 1000;

  acceleration_x = 0;
  acceleration_y = g;
  velocity_x += acceleration_x * dT;
  velocity_y += acceleration_y * dT;
  position_x += velocity_x * dT;
  position_y += velocity_y * dT;
  if(position_y < 0)
  {
    position_y = 0;
    velocity_x = 0;
    velocity_y = 0;
    stopTelemetry = true;
  }
  last_position_x = position_x;
  last_position_y = position_y;
  cTime += dT;

  stroke(0);
  strokeWeight(2);
  fill(0);
  circle(position_x * lScale, -position_y * lScale, 2 * ballRad);

  if(frameCount % 6 == 0 && !stopTelemetry)
  {
    text_buffer.clear();
    drawTelemetry();
  }

  if(frameCount > 1)
  {
    path_buffer.stroke(0);
    path_buffer.strokeWeight(2);
    path_buffer.line(last_position_x * lScale, -last_position_y * lScale, position_x * lScale, -position_y * lScale);
  }
}

function drawTelemetry()
{
  let sx = -cx + 35;
  let sy = -cy + 80;
  let dx = 120;
  let dy = 20;
  text_buffer.fill(0, 0, 0, 0);
  text_buffer.stroke(0);
  text_buffer.strokeWeight(2);
  text_buffer.rect(sx - 10, sy - 60, 210, 175);
  text_buffer.line(sx - 10, sy - 20, sx + 200, sy - 20);
  text_buffer.fill(0);
  text_buffer.strokeWeight(0);
  text_buffer.textSize(14);
  text_buffer.textFont('Georgia');
  text_buffer.text("Telemetry", sx + 67, sy - 35);
  text_buffer.text("pX:  " + round(position_x, 2) + " m", sx + 0 * dx, sy + 0 * dy);
  text_buffer.text("pY:  " + round(position_y, 2) + " m", sx + 0 * dx, sy + 1 * dy);
  text_buffer.text("vX:  " + round(velocity_x, 2) + " m/s", sx + 0 * dx, sy + 2 * dy);
  text_buffer.text("vY:  " + round(velocity_y, 2) + " m/s", sx + 0 * dx, sy + 3 * dy);
  text_buffer.text("aX:  " + round(acceleration_x, 2) + " m2/s", sx + 0 * dx, sy + 4 * dy);
  text_buffer.text("aY:  " + round(acceleration_y, 2) + " m2/s", sx + 0 * dx, sy + 5 * dy);
  text_buffer.text("T+:  " + round(cTime, 2) + " s", sx + 1 * dx, sy + 0 * dy);
}