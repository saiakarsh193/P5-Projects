class Dot
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
    this.color_type = 0;
    this.shape_type = 3;
    this.color = [[0, 255, 0], [255, 0, 0]][this.color_type];
    this.max_life = int(360 / 0.8);
    this.life = this.max_life;
  }

  draw()
  {
    let w = 8;
    let d = 4;
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], map(this.life, this.max_life, 0, 255, 0));
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
    if(this.life < 0)
      this.life = this.max_life;
  }
}
