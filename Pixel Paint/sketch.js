let cx, cy;
let pc;
let pl;
let color_list;
let selected_color;
let active_window;
let active_window_move;

class Pallete
{
  constructor(sx, sy, colors, columns=2)
  {
    this.sx = sx;
    this.sy = sy;
    this.colors = [];
    this.lcolor = colors.length;
    this.ncol = columns;
    if(colors.length % this.ncol != 0)
    {
      let extra = this.ncol - (colors.length % this.ncol);
      for(let i = 1;i <= extra;i ++)
        colors.push('white');
    }
    for(let i = 0;i < colors.length;i += this.ncol)
      this.colors.push(colors.slice(i, i + this.ncol));
    this.nrow = this.colors.length;
    this.dx = 5;
    this.dy = 5;
    this.lx = 20;
    this.ly = 20;
    this.tx = (this.dx + this.lx) * this.ncol - this.dx;
    this.ty = (this.dy + this.ly) * this.colors.length - this.dy;
    this.current_row = 0;
    this.current_col = 0;
  }

  draw()
  {
    stroke(0);
    strokeWeight(0);
    for(let row = 0;row < this.nrow;row ++)
    {
      for(let col = 0;col < this.ncol;col ++)
      {
        if(row * this.ncol + col < this.lcolor)
        {
          fill('black');
          rect(this.sx + col * (this.lx + this.dx) - 5, this.sy + row * (this.ly + this.dy) - 5, this.lx + 10, this.ly + 10, 4);
        }
      }
    }
    for(let row = 0;row < this.nrow;row ++)
    {
      for(let col = 0;col < this.ncol;col ++)
      {
        if(row * this.ncol + col < this.lcolor)
        {
          fill(this.colors[row][col]);
          rect(this.sx + col * (this.lx + this.dx), this.sy + row * (this.ly + this.dy), this.lx, this.ly);
        }
      }
    }
    fill(this.colors[this.current_row][this.current_col]);
    rect(this.sx + this.current_col * (this.lx + this.dx) - 5, this.sy + this.current_row * (this.ly + this.dy) - 5, this.lx + 10, this.ly + 10, 4);
  }

  clickPallete(mx, my)
  {
    mx -= cx;
    my -= cy;
    if(mx >= this.sx && mx <= (this.sx + this.tx) && my >= this.sy && my <= (this.sy + this.ty))
    {
      let col = int((mx - this.sx) / (this.lx + this.dx));
      let row = int((my - this.sy) / (this.ly + this.dy));
      if(row * this.ncol + col < this.lcolor)
      {
        this.current_row = row;
        this.current_col = col;
        return true;
      }
    }
    return false;
  }

  getColor()
  {
    return this.colors[this.current_row][this.current_col];
  }
}

class PCanvas
{
  constructor(sx, sy, nrow, ncol, wash_color='white')
  {
    this.sx = sx;
    this.sy = sy;
    this.nrow = nrow;
    this.ncol = ncol;
    this.dx = 2;
    this.dy = 2;
    this.lx = 10;
    this.ly = 10;
    this.tx = (this.dx + this.lx) * this.ncol - this.dx;
    this.ty = (this.dy + this.ly) * this.nrow - this.dy;
    this.msx = this.sx;
    this.msy = this.sy;
    this.wash_color = wash_color;
    this.grid = new Array(this.nrow).fill(0).map(() => new Array(this.ncol).fill(0));
    this.clearCanvas();
  }

  draw(active_window, border=false)
  {
    stroke(0);
    strokeWeight(0);
    if(border)
    {
      fill('black');
      rect(this.sx - 5, this.sy - 5, this.tx + 10, this.ty + 10);
    }
    for(let row = 0;row < this.nrow;row ++)
    {
      for(let col = 0;col < this.ncol;col ++)
      {
        fill(this.grid[row][col]);
        rect(this.sx + col * (this.lx + this.dx), this.sy + row * (this.ly + this.dy), this.lx, this.ly);
      }
    }
    fill('gray');
    rect(this.sx - 5, this.sy - 25, this.tx + 5 * 2, 20);
    if(active_window)
    {
      fill('red');
      rect(this.sx + this.tx - 15, this.sy - 25, 20, 20);
      // fill('green');
      // circle(this.sx + 5, this.sy - 15, 15);
    }
  }

  clearCanvas()
  {
    for(let row = 0;row < this.nrow;row ++)
    {
      for(let col = 0;col < this.ncol;col ++)
        this.colorCell(row, col, this.wash_color);
    }
  }

  clickCanvas(mx, my, mode)
  {
    mx -= cx;
    my -= cy;
    if(mx >= this.sx && mx <= (this.sx + this.tx) && my >= this.sy && my <= (this.sy + this.ty))
    { 
      return 0;
    }
    if(mx >= (this.sx + this.tx - 15) && mx <= (this.sx + this.tx - 15 + 20) && my >= (this.sy - 25) && my <= (this.sy - 25 + 20))
    {
      return 2;
    }
    if(mx >= (this.sx - 5) && mx <= (this.sx - 5 + this.tx + 5 * 2) && my >= (this.sy - 25) && my <= (this.sy - 25 + 20))
    {
      if(mode == 0)
      {
        this.msx = this.sx - mx;
        this.msy = this.sy - my;
      }
      return 1;
    }  
    return -1;
  }

  moveCanvas(mx, my)
  {
    mx -= cx;
    my -= cy;
    this.sx = this.msx + mx;
    this.sy = this.msy + my;
  }

  mouseColor(mx, my, color)
  {
    mx -= cx;
    my -= cy;
    let col = int((mx - this.sx) / (this.lx + this.dx));
    let row = int((my - this.sy) / (this.ly + this.dy));
    this.colorCell(row, col, color);
  }

  colorCell(row, col, color)
  {
    this.grid[row][col] = color;
  }
}

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;
  setColors();
  pc = [new PCanvas(-500, -300, 50, 50), new PCanvas(200, -300, 20, 20), new PCanvas(150, 0, 20, 30)];
  pl = new Pallete(cx - 105, -cy + 10, [].concat(color_list["basic"], color_list["leaf"], color_list["lips"], color_list["water"], color_list["wood"]), 4);
  active_window = pc[0];
  selected_color = pl.getColor();
}

function draw()
{
  background(200);
  translate(cx, cy);
  for(let i = 0;i < pc.length;i ++)
    pc[i].draw(pc[i] == active_window, true);
  pl.draw();
}

function mousePressed()
{
  if(pl.clickPallete(mouseX, mouseY))
    selected_color = pl.getColor();
  if(active_window.clickCanvas(mouseX, mouseY, 0) == -1)
  {
    for(let i = pc.length - 1;i >= 0;i --)
    {
      let res = pc[i].clickCanvas(mouseX, mouseY, 0);
      if(res != -1)
      {
        active_window = pc[i];
        pc.splice(i, 1);
        pc.push(active_window);
        if(res == 2)
          return;
        break;
      }
    }
  }
  let res = active_window.clickCanvas(mouseX, mouseY, 0);
  if(res == 0)
    active_window.mouseColor(mouseX, mouseY, selected_color);
  else if(res == 1)
    active_window_move = true;
  else if(res == 2)
    active_window.clearCanvas();
}

function mouseDragged()
{
  if(active_window_move)
    active_window.moveCanvas(mouseX, mouseY);
  else
  {
    let res = active_window.clickCanvas(mouseX, mouseY, 1);
    if(res == 0)
      active_window.mouseColor(mouseX, mouseY, selected_color);
  }
  
}

function mouseReleased()
{
  active_window_move = false;
}

function setColors()
{
  //'rebeccapurple'
  color_list = {};
  color_list["basic"] = ['white', 'black', 'red', 'blue'];
  color_list["leaf"] = ['chartreuse', 'yellowgreen', 'seagreen', 'forestgreen'];
  color_list["lips"] = ['peachpuff', 'salmon', 'plum', 'hotpink'];
  color_list["water"] = ['powderblue', 'turquoise', 'cadetblue', 'royalblue'];
  color_list["wood"] = ['peru', 'sienna', 'firebrick', 'orange'];
}