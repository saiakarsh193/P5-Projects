let cx, cy;
let vtg;

class VTGrid
{
  constructor(sx, sy, nrows, ncols)
  {
    this.sx = sx;
    this.sy = sy;
    this.nrows = nrows;
    this.ncols = ncols;
    this.cellWidth = 6;
    this.cellDistance = 0;
    this.grid_index = new Array(this.nrows).fill(0).map(() => new Array(this.ncols).fill(0));
    this.grid_gen = new Array(this.nrows).fill(0).map(() => new Array(this.ncols).fill(-1));
    this.color_dict = ['white', 'coral', 'magenta', 'chartreuse', 'yellowgreen', 'seagreen', 'forestgreen', 'peachpuff', 'salmon', 'plum', 'hotpink', 'powderblue', 'turquoise', 'cadetblue', 'royalblue', 'peru', 'sienna', 'firebrick', 'orange'];
    this.gen = 0;
  }

  randSpawn(count)
  {
    for(let i = 0;i < count;i ++)
      this.spawnPoint(int(random(this.nrows)), int(random(this.ncols)), int(random(1, this.color_dict.length)));
  }

  spawnPoint(row, col, index)
  {
    this.grid_index[row][col] = index;
    this.grid_gen[row][col] = this.gen;
  }

  update()
  {
    this.gen ++;
    for(let row = 0;row < this.nrows;row ++)
    {
      for(let col = 0;col < this.ncols;col ++)
      {
        if(this.gen == this.grid_gen[row][col] + 1)
        {
          if(row < this.nrows - 1 && this.grid_gen[row + 1][col] == -1)
          {
            this.grid_index[row + 1][col] = this.grid_index[row][col];
            this.grid_gen[row + 1][col] = this.gen;
          }
          if(col < this.ncols - 1 && this.grid_gen[row][col + 1] == -1)
          {
            this.grid_index[row][col + 1] = this.grid_index[row][col];
            this.grid_gen[row][col + 1] = this.gen;
          }
          if(row > 0 && this.grid_gen[row - 1][col] == -1)
          {
            this.grid_index[row - 1][col] = this.grid_index[row][col];
            this.grid_gen[row - 1][col] = this.gen;
          }
          if(col > 0 && this.grid_gen[row][col - 1] == -1)
          {
            this.grid_index[row][col - 1] = this.grid_index[row][col];
            this.grid_gen[row][col - 1] = this.gen;
          }
        }
      }
    }
  }

  draw()
  {
    stroke(0);
    strokeWeight(0);
    for(let row = 0;row < this.nrows;row ++)
    {
      for(let col = 0;col < this.ncols;col ++)
      {
        fill(this.color_dict[this.grid_index[row][col]]);
        square(this.sx + col * (this.cellWidth + this.cellDistance), this.sy + row * (this.cellWidth + this.cellDistance), this.cellWidth);
      }
    }
  }
}

function setup()
{
  createCanvas(1520, 770);

  cx = width / 2;
  cy = height / 2;
  vtd = new VTGrid(-cx + 10, -cy + 10, 125, 250);
  vtd.randSpawn(30);
}

function draw()
{
  background(0);
  translate(cx, cy);
  vtd.update();
  vtd.draw();
}
