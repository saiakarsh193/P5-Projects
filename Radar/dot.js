class Dot
{
  constructor(x, y, data, pcolor, color_type=0, shape_type=0)
  {
    this.x = x;
    this.y = y;
    this.data = data;
    this.pcolor = pcolor;
    this.color_type = color_type;
    this.shape_type = shape_type;
    this.color = [[0, 255, 0], [255, 62, 28], [255, 255, 255], [255, 225, 24], [25, 255, 247], [204, 36, 237]][this.color_type];
    this.max_life = int(360 / 1.2);
    this.life = this.max_life;
  }

  draw()
  {
    let w = 8;
    let d = 4;
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], map(this.life, this.max_life, 0, 255, 50));
    if(this.shape_type == 0)
      circle(this.x, this.y, 1.3 * w);
    else if(this.shape_type == 1)
      triangle(this.x - 0.562 * w, this.y + 0.325 * w, this.x + 0.562 * w, this.y + 0.325 * w, this.x, this.y - 0.65 * w);
    else if(this.shape_type == 2)
      square(this.x - 0.65 * w, this.y - 0.65 * w, 1.3 * w);
    else if(this.shape_type == 3)
      quad(this.x, this.y - 0.65 * w, this.x + 0.5 * w, this.y, this.x, this.y + 0.65 * w, this.x - 0.5 * w, this.y);
    noFill();
    stroke(this.color[0], this.color[1], this.color[2], map(this.life, this.max_life, 0, 255, 0));
    line(this.x - w, this.y - w, this.x - d, this.y - w);
    line(this.x + d, this.y - w, this.x + w, this.y - w);
    line(this.x - w, this.y + w, this.x - d, this.y + w);
    line(this.x + d, this.y + w, this.x + w, this.y + w);
    line(this.x - w, this.y - w, this.x - w, this.y - d);
    line(this.x - w, this.y + w, this.x - w, this.y + d);
    line(this.x + w, this.y - w, this.x + w, this.y - d);
    line(this.x + w, this.y + w, this.x + w, this.y + d);
    this.life --;
    this.isMouseOn();
  }

  isMouseOn()
  {
    let mx = mouseX - cx;
    let my = mouseY - cy;
    let dis = Math.sqrt(Math.pow(mx - this.x, 2) + Math.pow(my - this.y, 2));
    let rad = 25;
    if(dis < rad)
    {
      stroke(this.pcolor[0], this.pcolor[1], this.pcolor[2], map(this.life, this.max_life, 0, 255, 0));
      strokeWeight(2);
      noFill();
      circle(this.x, this.y, 2 * rad);
      fill(this.pcolor[0], this.pcolor[1], this.pcolor[2], map(this.life, this.max_life, 0, 255, 0));
      noStroke();
      textSize(10);
      textAlign(LEFT);
      text(int(this.data[0]), this.x + (rad + 1) * cos(-50), this.y + (rad + 1) * sin(-50));
      text(int(this.data[1]), this.x + (rad + 3) * cos(-20), this.y + (rad + 3) * sin(-20));
      text(int(this.data[2]), this.x + (rad + 5) * cos(+25), this.y + (rad + 5) * sin(+25));
      text(int(this.data[3]), this.x + (rad + 7) * cos(+50), this.y + (rad + 7) * sin(+50));
    }
  }
}
