let objs = [];

let launch_x;
let launch_y;
let Umax;
let missile;
let target;
let isLaunched;
let Hmin;

let g;
let e;
let lScale;
let cTime;
let ballRad;
let cx, cy;
let buffer;

class PBody
{
  constructor(position_x, position_y, velocity_x, velocity_y, acceleration_x, acceleration_y, color = 0) 
  {
    this.position_x = position_x;
    this.position_y = position_y;
    this.velocity_x = velocity_x;
    this.velocity_y = velocity_y;
    this.acceleration_x = acceleration_x;
    this.acceleration_y = acceleration_y;
    this.last_position_x = position_x;
    this.last_position_y = position_y;
    this.isAlive = true;
    this.color = color;
  }

  updateLastPositions()
  {
    this.last_position_x = this.position_x;
    this.last_position_y = this.position_y;
  }
}

function setup() 
{
  createCanvas(1000, 600);
  cx = width / 2;
  cy = height - 20;
  cTime = 0;
  g = -9.8;
  e = 0.9;
  lScale = 5;
  ballRad = 4;
  buffer = createGraphics(width, height);
  buffer.background(175);
  buffer.translate(cx, cy);
  // objs.push(new PBody(-50, 0, 25, 25, 0, 0, color(113, 113, 225)));

  target = new PBody(80, 100, -25, 10, 0, 0, color(255, 0, 0));
  objs.push(target);

  launch_x = -80;
  launch_y = 0;
  Umax = 25;
  Hmin = 20;
  isLaunched = false;
  missile = new PBody(launch_x, launch_y, 0, 0, 0, 0);
  objs.push(missile);
}

function draw() 
{
  background(175);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);
  translate(cx, cy);

  // ground
  stroke(0);
  strokeWeight(2);
  line(-width / 2, 2 + ballRad, width / 2, 2 + ballRad);

  let dT = min(deltaTime, 50) / 1000;

  objs.forEach((obj) =>
  {
    if(obj.isAlive)
    {
      // update the values
      obj.velocity_x += obj.acceleration_x * dT;
      obj.velocity_y += (obj.acceleration_y + g) * dT;
      obj.position_x += obj.velocity_x * dT;
      obj.position_y += obj.velocity_y * dT;
      if(obj.position_y < 0)
      {
        obj.position_y *= -1;
        obj.velocity_y *= -e;
      }

      // draw object
      stroke(obj.color);
      fill(obj.color);
      circle(obj.position_x * lScale, -obj.position_y * lScale, 2 * ballRad);

      // draw path
      buffer.stroke(obj.color);
      if(frameCount > 1)
      {
        buffer.line(obj.last_position_x * lScale, -obj.last_position_y * lScale, obj.position_x * lScale, -obj.position_y * lScale);
      }
      obj.updateLastPositions();

      // kill out of screen objects
      if(abs(obj.position_x) * lScale > cx || abs(obj.position_y) * lScale > cy)
      {
        obj.isAlive = false;
      }
    }
  });

  // launching the missile
  if(!isLaunched)
  {
    launchMissile(missile, target);
  }

  cTime += dT;
}

function launchMissile(missile, target)
{
  let H = target.position_y - launch_y;
  let S = target.position_x - launch_x;
  let lambda = S / H;
  let phi = target.velocity_x - (S / H) * target.velocity_y;
  let A = lambda * lambda + 1;
  let B = 2 * lambda * phi;
  let C = phi * phi - Umax * Umax;
  let det = B * B - 4 * A *  C;
  if(det > 0)
  {
    let uy1 = (-B + sqrt(det)) / (2 * A);
    let ux1 = lambda * uy1 + phi;
    let t1 = S / (ux1 - target.velocity_x);
    let h1 = uy1 * t1 + (g / 2) * t1 * t1;
    let uy2 = (-B - sqrt(det)) / (2 * A);
    let ux2 = lambda * uy2 + phi;
    let t2 = S / (ux2 - target.velocity_x);
    let h2 = uy2 * t2 + (g / 2) * t2 * t2;
    if(h1 > Hmin)
    {
      missile.velocity_x = ux1;
      missile.velocity_y = uy1;
      print(ux1, uy1, sqrt(ux1 * ux1 + uy1 * uy1), t1+"sec", h1+"m");
      isLaunched = true;
    }
    else if(h2 > Hmin)
    {
      missile.velocity_x = ux2;
      missile.velocity_y = uy2;
      print(ux2, uy2, sqrt(ux2 * ux2 + uy2 * uy2), t2+"sec", h2+"m");
      isLaunched = true;
    }
  }
}
