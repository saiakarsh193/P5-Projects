let points = [];
let sticks = [];
let startpoint;
let endpoint;
let startSim = false;

class Point
{
  constructor(position, isLocked)
  {
    this.position = position;
    this.PrevPosition = this.position.copy();
    this.locked = isLocked;
  }

  equals(other)
  {
    return this.position.equals(other.position);
  }
}

class Stick
{
  constructor(pointA, pointB)
  {
    this.pointA = pointA;
    this.pointB = pointB;
    this.length = p5.Vector.sub(pointA.position, pointB.position).mag();
  }
}

function setup()
{
  createCanvas(1200, 680);
}

function draw()
{
  background(color(61, 79, 161));
  stroke(200);
  strokeWeight(5);
  sticks.forEach((s) =>
  {
    line(s.pointA.position.x, s.pointA.position.y, s.pointB.position.x, s.pointB.position.y);
  });
  noStroke();
  points.forEach((p) =>
  {
    if(p.locked)
      fill(245, 66, 66);
    else
      fill(255);
    circle(p.position.x, p.position.y, 30);
  });
  if(startSim)
    Simulate();
}

function Simulate()
{
  let gravity = createVector(0, 30);
  let dT2 = 0.015;
  points.forEach((p) =>
  {
    if(!p.locked)
    {
      let temp = p.position.copy();
      p.position.add(p5.Vector.sub(p.position, p.PrevPosition));
      p.position.add(p5.Vector.mult(gravity, dT2));
      p.PrevPosition = temp;
    }
  });
  for(let i = 0;i < 10;i ++)
  {
    sticks.forEach((s) =>
    {
      let stickCentre = p5.Vector.mult(p5.Vector.add(s.pointA.position, s.pointB.position), 0.5)
      let stickDir = p5.Vector.sub(s.pointA.position, s.pointB.position);
      stickDir.normalize();
      if(!s.pointA.locked)
        s.pointA.position = p5.Vector.add(stickCentre, p5.Vector.mult(stickDir, s.length / 2));
      if(!s.pointB.locked)
        s.pointB.position = p5.Vector.sub(stickCentre, p5.Vector.mult(stickDir, s.length / 2));
    });
  }
}

function getClosestPoint(mp)
{
  let mindis = -1;
  let cpoint;
  points.forEach((p) =>
  {
    let dis = p5.Vector.sub(p.position, mp).mag();
    if(dis < mindis || mindis == -1)
    {
      mindis = dis;
      cpoint = p;
    }
  });
  return cpoint;
}

function mousePressed()
{
  if(mouseButton == RIGHT)
    startSim = true;
  if(startSim || mouseButton != LEFT)
    return;
  startpoint = undefined;
  let mp = createVector(mouseX, mouseY);
  let cpoint = getClosestPoint(mp);
  let dis = -1;
  if(Boolean(cpoint))
    dis = p5.Vector.sub(mp, cpoint.position).mag();
  if(dis < 15)
    startpoint = cpoint;
  if(dis == -1 || dis > 30)
    points.push(new Point(mp, false));
}

function mouseReleased()
{
  if(startSim || mouseButton != LEFT)
    return;
  endpoint = undefined;
  let mp = createVector(mouseX, mouseY);
  let cpoint = getClosestPoint(mp);
  let dis = -1;
  if(Boolean(cpoint))
    dis = p5.Vector.sub(mp, cpoint.position).mag();
  if(dis < 15)
    endpoint = cpoint;
  if(Boolean(startpoint) && Boolean(endpoint))
  {
    if(startpoint.equals(endpoint))
      startpoint.locked = !startpoint.locked;
    else
      sticks.push(new Stick(startpoint, endpoint));
  }
}