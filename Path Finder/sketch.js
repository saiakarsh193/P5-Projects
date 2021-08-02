let cx, cy;
let sx;
let sy;
let sw;
let sh;
let dx;
let dy;
let dpath;
let grid;
let n;

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;
  sx = -250;
  sy = -275;
  dx = 5;
  dy = 5;
  n = 10;
  grid = new Array(n).fill(0).map(() => new Array(n).fill(0));
  dpath = false;
  setDimensions(n);
}

function draw()
{
  background(200);
  translate(cx, cy);
  drawGrid();
}

function setDimensions(val)
{
  let tw = -2 * sx;
  let th = -2 * sy;
  tw -= (val - 1) * dx;
  th -= (val - 1) * dy;
  sw = tw / val;
  sh = th / val;
}

function drawGrid()
{
  stroke(0);
  strokeWeight(0);
  for(let row = 0;row < n;row ++)
  {
    for(let col = 0;col < n;col ++)
    {
      if(grid[row][col] == 0)
        fill(255);
      else if(grid[row][col] == 1)
        fill(0);
      else if(grid[row][col] == 2)
        fill(255, 0, 0);
      rect(sx + col * (sw + dx), sy + row * (sh + dy), sw, sh);
    }
  }
}

function findPath()
{
  let stk = [];
  let visit = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for(let row = 0;row < n;row ++)
  {
    for(let col = 0;col < n;col ++)
    {
      visit[row][col] = grid[row][col];
    }
  }
  stk.push([0, 0]);
  visit[0][0] = [0, 0];
  let found = false;
  while(stk.length > 0)
  {
    let cur = stk.splice(0, 1)[0];
    let row = cur[0];
    let col = cur[1];
    if(row == n - 1 && col == n - 1)
    {
      found = true;
      break;
    }
    if(row < n - 1 && visit[row + 1][col] == 0)
    {
      stk.push([row + 1, col]);
      visit[row + 1][col] = cur;
    }
    if(col < n - 1 && visit[row][col + 1] == 0)
    {
      stk.push([row, col + 1]);
      visit[row][col + 1] = cur;
    }
    if(col > 0 && visit[row][col - 1] == 0)
    {
      stk.push([row, col - 1]);
      visit[row][col - 1] = cur;
    }
    if(row > 0 && visit[row - 1][col] == 0)
    {
      stk.push([row - 1, col]);
      visit[row - 1][col] = cur;
    }
  }
  if(found)
  {
    let temp = visit[n - 1][n - 1];
    while(!(temp[0] == 0 && temp[1] == 0))
    {
      grid[temp[0]][temp[1]] = 1;
      temp = visit[temp[0]][temp[1]];
    }
    grid[0][0] = 1;
    grid[n - 1][n - 1] = 1;
  }
}

function mousePressed()
{
  mouseX -= cx;
  mouseY -= cy;
  let col = int((mouseX - sx) / (sw + dx));
  let row = int((mouseY - sy) / (sh + dy));
  if(!dpath && mouseX > sx && mouseY > sy && row < n && col < n)
  {
    if(grid[row][col] == 2)
      grid[row][col] = 0;
    else
      grid[row][col] = 2;
  }
  else
  {
    if(dpath == false)
    {
      dpath = true;
      findPath();
    }
    else
    {
      dpath = false;
      for(let row = 0;row < n;row ++)
      {
        for(let col = 0;col < n;col ++)
        {
          if(grid[row][col] == 1)
            grid[row][col] = 0;
        }
      }
    }
  }
}