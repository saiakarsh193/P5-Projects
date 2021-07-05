let fireworks = [];
let particles = [];
let launch_x;
let launch_y;

let g;
let lScale;
let cTime;
let ballRad;
let cx, cy;
let last_time;

class FW
{
  constructor(velocity_x, velocity_y, color = 0) 
  {
    this.position_x = launch_x;
    this.position_y = launch_y;
    this.velocity_x = velocity_x;
    this.velocity_y = velocity_y;
    this.last_position_x = this.position_x;
    this.last_position_y = this.position_y;
    this.color = color;
    this.buffer = createGraphics(width, height);
    this.buffer.translate(cx, cy);
  }

  updateLastPositions()
  {
    this.last_position_x = this.position_x;
    this.last_position_y = this.position_y;
  }
}

class Particle
{
  constructor(sx, sy, color, duration)
  {
    this.position_x = sx;
    this.position_y = sy;
    this.velocity_x = -4 + random() * 8;
    this.velocity_y = -2 + random() * 10;
    this.last_position_x = this.position_x;
    this.last_position_y = this.position_y;
    this.color = color;
    this.buffer = createGraphics(width, height);
    this.buffer.translate(cx, cy);
    this.time = cTime;
    this.duration = duration;
  }

  updateLastPositions()
  {
    this.last_position_x = this.position_x;
    this.last_position_y = this.position_y;
  }
}

function setup()
{
  createCanvas(1200, 680);

  launch_x = 0;
  launch_y = -25;

  cx = width / 2;
  cy = height / 2;
  cTime = 0;
  g = -9.8;
  lScale = 12;
  ballRad = 4;
  last_time = -2;

  colorMode(HSB);
}

function draw()
{
  background(0);
  imageMode(CORNER);
  translate(cx, cy);

  // ground
  stroke(255);
  strokeWeight(2);
  line((-width / 2) * lScale, (-launch_y - 2 + ballRad) * lScale, (width / 2) * lScale, (-launch_y - 2 + ballRad) * lScale);

  let dT = min(deltaTime, 50) / 1000;
  
  updateFireworks(dT);
  updateParticles(dT);

  cTime += dT;
}

function addFirework()
{
  if(fireworks.length <= 5 && cTime - last_time > 1)
  {
    if(random() < 0.4)
    {
      last_time = cTime;
      fireworks.push(new FW(-5 + random() * 10, 18 + random() * 5, color(int(random() * 360), 100, 100)));
    }
  }
}

function updateFireworks(dT)
{
  addFirework();
  fireworks.forEach((obj, index) =>
  {
    // update the values
    obj.velocity_y += g * dT;
    obj.position_x += obj.velocity_x * dT;
    obj.position_y += obj.velocity_y * dT;

    // draw object
    stroke(obj.color);
    fill(obj.color);
    circle(obj.position_x * lScale, -obj.position_y * lScale, 2 * ballRad);

    // draw path
    obj.buffer.stroke(obj.color);
    obj.buffer.line(obj.last_position_x * lScale, -obj.last_position_y * lScale, obj.position_x * lScale, -obj.position_y * lScale);
    obj.updateLastPositions(); 

    // render object buffer
    image(obj.buffer, -cx, -cy, width, height);

    // explosion
    if(abs(obj.velocity_y) < 0.1)
    {
      addExplosion(obj.position_x, obj.position_y, obj.color);
      fireworks.splice(index, 1);
    }

    // hit the ground or out of screen
    if(obj.position_y < launch_y || abs(obj.position_x) * lScale > cx || abs(obj.position_y) * lScale > cy)
    {
      fireworks.splice(index, 1);
    }
  });
}

function addExplosion(sx, sy, color)
{
  var count = 3 + int(random() * 3);
  var duration = 1 + random() * 0.5;
  for(var i = 0;i < count; i++)
  {
    particles.push(new Particle(sx, sy, color, duration));
  }
}

function updateParticles(dT)
{
  particles.forEach((obj, index) =>
  {
    // update the values
    obj.velocity_y += g * dT;
    obj.position_x += obj.velocity_x * dT;
    obj.position_y += obj.velocity_y * dT;

    // draw path
    obj.buffer.stroke(obj.color);
    obj.buffer.line(obj.last_position_x * lScale, -obj.last_position_y * lScale, obj.position_x * lScale, -obj.position_y * lScale);
    obj.updateLastPositions(); 

    // render object buffer
    image(obj.buffer, -cx, -cy, width, height);

    // kill particle
    if(cTime - obj.time > obj.duration)
    {
      particles.splice(index, 1);
    }

    // hit the ground or out of screen
    if(obj.position_y < launch_y || abs(obj.position_x) * lScale > cx || abs(obj.position_y) * lScale > cy)
    {
      particles.splice(index, 1);
    }
  });
}