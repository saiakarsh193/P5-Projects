class System
{
  constructor(bodies)
  {
    this.bodies = bodies;
    // this.G = 6.674e-11;
    this.G = 0.5;
    this.scale = 20;
    this.ctime = 0;
    this.path = [];
  }
  
  updateFrame(dT)
  {
    this.bodies = this.calculateNextFrame(this.bodies, dT);
    this.ctime += dT;
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

  calculatePath(path_length, dT)
  {
    this.path = [];
    let temp = this.copyFrame(this.bodies);
    this.addFrameToPath(temp);
    for(let i = 0;i < path_length;i ++)
    {
      temp = this.calculateNextFrame(temp, dT);
      this.addFrameToPath(temp);
    }
  }

  drawPath()
  {
    if(this.path.length == 0)
      return;
    stroke(0);
    strokeWeight(1);
    noFill();
    for(let body = 0;body < this.path[0].length;body ++)
    {
      beginShape();
      for(let i = 0;i < this.path.length;i ++)
        vertex(this.path[i][body][1] * this.scale, -this.path[i][body][2] * this.scale);
      endShape();
    }
  }

  addFrameToPath(frame)
  {
    let temp = [];
    for(let i = 0;i < frame.length;i ++)
      temp.push([frame[i].mass, frame[i].position.x, frame[i].position.y, frame[i].velocity.x, frame[i].velocity.y]);
    this.path.push(temp);
  }

  copyFrame(frame)
  {
    let temp = [];
    for(let i = 0;i < frame.length;i ++)
      temp.push(new Body(frame[i].mass, frame[i].position.x, frame[i].position.y, frame[i].velocity.x, frame[i].velocity.y));
    return temp;
  }

  calculateNextFrame(cframe, dT)
  {
    let nframe = this.copyFrame(cframe);
    for(let i = 0;i < cframe.length;i ++)
    {
      let sigForce = createVector(0, 0);
      for(let j = 0;j < cframe.length;j ++)
      {
        let dis = p5.Vector.sub(cframe[j].position, cframe[i].position);
        if(dis.mag() > 0)
          sigForce.add(p5.Vector.mult(dis, cframe[j].mass / Math.pow(dis.mag(), 3)));
      }
      let sigAcc = p5.Vector.mult(sigForce, this.G);
      nframe[i].velocity.add(p5.Vector.mult(sigAcc, dT));
      nframe[i].position.add(p5.Vector.mult(nframe[i].velocity, dT));
    }
    return nframe;
  }
}