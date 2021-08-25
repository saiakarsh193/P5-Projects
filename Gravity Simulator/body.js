class Body
{
  constructor(mass, x, y, vx, vy)
  {
    this.mass = mass;
    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
  }
}