let cx, cy;
let sys;

class Body
{
  constructor(mass, x, y, vx, vy)
  {
    this.mass = mass;
    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
  }
}

class System
{
  constructor(bodies)
  {
    this.bodies = bodies;
    this.G = 6.674e-11;
    // this.G = 0;
    this.dT = 0.05;
    this.scale = 50;
    this.ctime = 0;
  }

  copyFrame()
  {
    let temp = [];
    for(let i = 0;i < this.bodies.length;i ++)
      temp.push(new Body(this.bodies[i].mass, this.bodies[i].position.x, this.bodies[i].position.y, this.bodies[i].velocity.x, this.bodies[i].velocity.y));
    return temp;
  }

  updateFrame()
  {
    let nframe = this.copyFrame();
    for(let i = 0;i < this.bodies.length;i ++)
    {
      let sigForce = createVector(0, 0);
      for(let j = 0;j < this.bodies.length;j ++)
      {
        let dis = p5.Vector.sub(this.bodies[j].position, this.bodies[i].position);
        if(dis.mag() > 0)
          sigForce.add(p5.Vector.mult(dis, this.bodies[j].mass / Math.pow(dis.mag(), 3)));
      }
      let sigAcc = p5.Vector.mult(sigForce, this.G);
      nframe[i].velocity.add(p5.Vector.mult(sigAcc, this.dT));
      nframe[i].position.add(p5.Vector.mult(nframe[i].velocity, this.dT));
    }
    this.bodies = nframe;
    this.ctime += this.dT;
  }

  drawFrame()
  {
    stroke(0);
    strokeWeight(0);
    fill(0);
    for(let i = 0;i < this.bodies.length;i ++)
      circle(this.bodies[i].position.x * this.scale, -this.bodies[i].position.y * this.scale, 10);
    textSize(20);
    textAlign(LEFT, TOP);
    text(round(this.ctime, 2), -cx, -cy);
  }
}

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;
  sys = new System(
    [
      new Body(1, 0.97000436, -0.24308753, 0.466203685, 0.43236573),
      new Body(1, -0.97000436, 0.24308753, 0.466203685, 0.43236573),
      new Body(1, 0, 0, -0.93240737, -0.86473146)
    ]
  );
}

function draw()
{
  background(200);
  translate(cx, cy);
  sys.updateFrame();
  sys.drawFrame();
}