let cx, cy;
let points = [];
let pointCount = 100;

class Pointer
{
  constructor()
  {
    this.position = createVector(random() * width - cx, random() * height - cy);
    this.radius = random() * 5 + 3;
    this.speed = createVector(random() * 0.5, random() * 0.5);
  }

  draw()
  {
    noStroke();
    fill(255);
    circle(this.position.x, this.position.y, this.radius);
  }

  update()
  {
    this.speed.normalize();
    this.speed.mult(0.5);
    this.position.add(this.speed);
    this.speed.add(createVector(random() * 0.2 - 0.1, random() * 0.2 - 0.1));
  }

  findClosest()
  {
    let closest = undefined;
    let cdist = -1;
    points.forEach((pt) =>
    {
      let dist = pt.position.dist(this.position);
      if(dist > 0 && (closest == undefined || dist < cdist))
      {
        closest = pt;
        cdist = dist;
      }
    });
    return closest;
  }
}

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;
  for(let i = 0;i < pointCount;i ++)
  {
    points.push(new Pointer());
  }
}

function draw()
{
  background(50);
  translate(cx, cy);

  points.forEach((pt) => 
  {
    pt.draw();
    pt.update();
  });

  strokeWeight(2);
  stroke(255);
  noFill();
  points.forEach((pt) => 
  {
    let closest = pt.findClosest();
    line(pt.position.x, pt.position.y, closest.position.x, closest.position.y);
  });
}