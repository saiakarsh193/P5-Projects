let grows = 42;
let gcols = 85;

let sposx = 25;
let sposy = 25;

let gside = 15;
let gspace = 2;
let gdata;

let fr = 5;

let isStart = false;

function setup()
{
  createCanvas(1500, 770);
  frameRate(fr);
  gdata = new Array(grows).fill(0).map(() => new Array(gcols).fill(0));
}

function draw()
{
  background(230);

  stroke(0);
  strokeWeight(0);

  if(isStart)
  {
    let ndata = JSON.parse(JSON.stringify(gdata));

    for(let i = 0;i < grows;i ++)
    {
      for(let j = 0;j < gcols;j ++)
      {
        let count = neighbour_count(i, j);
        if(gdata[i][j] == 1)
        {
          if(count <= 1 || count >= 4)
            ndata[i][j] = 0;
        }
        else
        {
          if(count == 3)
            ndata[i][j] = 1;
        }
      }
    }

    gdata = JSON.parse(JSON.stringify(ndata));
  }

  for(let i = 0;i < grows;i ++)
  {
    for(let j = 0;j < gcols;j ++)
    {
      if(gdata[i][j] == 1)
        fill(250, 100, 0);
      else
        fill(255);
      square(sposx + (gside + gspace) * j, sposy + (gside + gspace) * i, gside);
    }
  }
}

function mousePressed()
{
  let mrow = int((mouseY - sposy) / (gside + gspace));
  let mcol = int((mouseX - sposx) / (gside + gspace));
  if(mrow == 0 && mcol == 0)
    isStart = !isStart;
  if(isStart)
    return;
  if(gdata[mrow][mcol] == 0)
    gdata[mrow][mcol] = 1;
  else
    gdata[mrow][mcol] = 0;
}

function neighbour_count(row, col)
{
  let count = 0;
  if(row - 1 >= 0 && col - 1 >= 0 && gdata[row - 1][col - 1] == 1)
    count ++;
  if(row - 1 >= 0 && gdata[row - 1][col] == 1)
    count ++;
  if(row - 1 >= 0 && col + 1 < gcols && gdata[row - 1][col + 1] == 1)
    count ++;
  if(row + 1 < grows && col - 1 >= 0 && gdata[row + 1][col - 1] == 1)
    count ++;
  if(row + 1 < grows && gdata[row + 1][col] == 1)
    count ++;
  if(row + 1 < grows && col + 1 < gcols && gdata[row + 1][col + 1] == 1)
    count ++;
  if(col - 1 >= 0 && gdata[row][col - 1] == 1)
    count ++;
  if(col + 1 < gcols && gdata[row][col + 1] == 1)
    count ++;
  return count;
}