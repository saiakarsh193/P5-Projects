class Radar
{
  constructor(range, radius, spread, segments)
  {
    this.range = range;
    this.radius = radius;
    this.scaler = this.radius / this.range;
    this.spread = spread;
    this.segments = segments;
    this.current_angle = 0;
    this.angle_rate = 1.2;
    this.dots = [];
    this.pcolor = [0, 255, 0];
    this.makeOverlay();
    angleMode(DEGREES);
    imageMode(CORNER);
  }

  makeOverlay(nor=4, delang=10)
  {
    this.overlay = createGraphics(width, height);
    // angleMode() not working for external canvas
    // this.overlay.angleMode(DEGREES);
    this.overlay.background(175, 175, 175, 0);
    this.overlay.translate(cx, cy);
    this.overlay.strokeWeight(2);
    this.overlay.textSize(11);
    // inner number of rings (does not count the outer rim)
    for(let i = 1;i <= nor;i ++)
    {
      let r = i * this.radius / (nor + 1);
      this.overlay.noFill();
      this.overlay.stroke(this.pcolor[0], this.pcolor[1], this.pcolor[2]);
      this.overlay.circle(0, 0, 2 * r);
      this.overlay.fill(this.pcolor[0], this.pcolor[1], this.pcolor[2]);
      this.overlay.noStroke();
      this.overlay.textAlign(LEFT);
      this.overlay.text(Math.round(r / this.scaler), r + 3, 0);
      this.overlay.textAlign(RIGHT);
      this.overlay.text(Math.round(r / this.scaler), -(r + 3), 0);
    }
    // outer rim
    this.overlay.noFill();
    this.overlay.stroke(this.pcolor[0], this.pcolor[1], this.pcolor[2]);
    this.overlay.strokeWeight(3);
    this.overlay.circle(0, 0, 2 * this.radius);
    this.overlay.textAlign(CENTER, CENTER);
    this.overlay.textSize(15);
    let del = Math.PI * 2 / 360;
    let ctr = 0;
    for(let a = 0;a < 2 * Math.PI - del; a += del)
    {
      this.overlay.noFill();
      this.overlay.stroke(this.pcolor[0], this.pcolor[1], this.pcolor[2]);
      this.overlay.strokeWeight(2);
      this.overlay.line(this.radius * cos(a), this.radius * sin(a), (this.radius + 5) * cos(a), (this.radius + 5) * sin(a));
      if(ctr % delang == 0)
      {
        this.overlay.strokeWeight(3);
        this.overlay.line(this.radius * cos(a), this.radius * sin(a), (this.radius + 10) * cos(a), (this.radius + 10) * sin(a));
        this.overlay.fill(this.pcolor[0], this.pcolor[1], this.pcolor[2]);
        this.overlay.noStroke();
        this.overlay.text(ctr, (this.radius + 25) * cos(a), (this.radius + 25) * sin(a));
      }
      ctr ++;
    }
    // filler
    this.overlay.noStroke();
    this.overlay.fill(this.pcolor[0], this.pcolor[1], this.pcolor[2], 50);
    this.overlay.circle(0, 0, 2 * this.radius);
    this.overlay.noFill();
    this.overlay.stroke(this.pcolor[0], this.pcolor[1], this.pcolor[2], 50);
    this.overlay.strokeWeight(2);
    del = Math.PI * 2 / 12;
    for(let a = 0;a < 2 * Math.PI - del; a += del)
    {
      this.overlay.line(-this.radius * cos(a), -this.radius * sin(a), this.radius * cos(a), this.radius * sin(a));
    }
  }

  draw()
  {
    image(this.overlay, 0, 0, width, height);
    translate(cx, cy);
    // pointer
    stroke(this.pcolor[0], this.pcolor[1], this.pcolor[2]);
    strokeWeight(2);
    noFill();
    line(0, 0, (this.radius + 15) * cos(this.current_angle), (this.radius + 15) * sin(this.current_angle));
    // spread
    noStroke();
    for(let i = 0;i < this.segments;i ++)
    {
      fill(this.pcolor[0], this.pcolor[1], this.pcolor[2], map(i, 0, this.segments - 1, 255, 0));
      arc(0, 0, 2 * this.radius, 2 * this.radius, this.current_angle - (i + 1) * (this.spread / this.segments), this.current_angle - i * (this.spread / this.segments));
    }
    this.current_angle = (this.current_angle + this.angle_rate) % 360;
    // dots
    for(let i = this.dots.length - 1;i >=0;i --)
    {
      if(this.dots[i].life > 0)
        this.dots[i].draw();
      else
        this.dots.splice(i, 1);
    }
  }

  addDot(x, y, color_type, shape_type)
  {
    this.dots.push(new Dot(x, y, color_type, shape_type));
  }

  scan(points)
  {
    for(let i = 0;i < points.length;i ++)
    {
        let r = Math.sqrt(points[i][0] * points[i][0] + points[i][1] * points[i][1]);
        let the = degrees(Math.atan2(points[i][1], points[i][0]));
        the = (the + 360) % 360;
        if(this.current_angle >= the && this.current_angle - this.angle_rate < the && this.range > r)
            this.addDot(points[i][0] * this.scaler, points[i][1] * this.scaler, points[i][2], points[i][3]);
    }
  }
}
