let cx, cy;
let cTime;
let sx;
let sy;
let sw;
let sh;
let dx;
let dy;

let set;
let grid;
let sTime;
let lookTime;
let startLevel;
let currentLevel;

function setup()
{
  createCanvas(1200, 680);
  cx = width / 2;
  cy = height / 2;
  startLevel = 4;
  setGrid(10);
  newGame();
}

function draw()
{
  background(200);
  translate(cx, cy);
  drawSupport();
  drawTiles();
  if(set[set.length - 1][1] == 1)
    gotoLevel(++ currentLevel);
  cTime += deltaTime / 1000;
}

function drawTiles()
{
  stroke(0);
  strokeWeight(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  for(let i = 0;i < set.length;i ++)
  {
    let coor = toGrid(set[i][0]);
    if(set[i][1] == 0)
      fill(0);
    else
      fill(255);
    // rect(sx + coor[1] * (sw + dx), sy + coor[0] * (sh + dy), sw, sh);
    circle(sx + coor[1] * (sw + dx) + (sw / 2), sy + coor[0] * (sh + dy) + (sh / 2), sw);
    if(cTime - sTime < lookTime || set[i][1] == 1)
    {
      if(set[i][1] == 0)
        fill(255);
      else
        fill(0);
      text(i + 1, sx + coor[1] * (sw + dx) + (sw / 2), sy + coor[0] * (sh + dy) + (sh / 2) + 3);
    }
  }
}

function setGrid(val)
{
  grid = val;
  sx = -250;
  sy = -275;
  dx = 5;
  dy = 5;
  let tw = -2 * sx;
  let th = -2 * sy;
  tw -= (grid - 1) * dx;
  th -= (grid - 1) * dy;
  sw = tw / grid;
  sh = th / grid;
}

function drawSupport()
{
  stroke(0);
  strokeWeight(0);
  fill(0);
  textSize(30);
  textAlign(LEFT, TOP);
  text("Time: " + round(cTime, 1), -cx, -cy);
  text("Level: " + (currentLevel - startLevel + 1), -cx, -cy + 30)

  stroke(0);
  strokeWeight(5);
  noFill();
  for(let i = 1;i < set.length;i ++)
  {
    if(set[i][1] == 1)
    {
      let coor1 = toGrid(set[i - 1][0]);
      let coor2 = toGrid(set[i][0]);
      line(sx + coor1[1] * (sw + dx) + (sw / 2), sy + coor1[0] * (sh + dy) + (sh / 2), sx + coor2[1] * (sw + dx) + (sw / 2), sy + coor2[0] * (sh + dy) + (sh / 2));
    }
    else
      break;
  }
}

function newGame()
{
  cTime = 0;
  currentLevel = startLevel;
  gotoLevel(currentLevel);
}

function gotoLevel(level)
{
  set = createSet(level);
  lookTime = getLookTime(level);
  sTime = cTime;
}

function createSet(val)
{
  val = min(grid * grid, val);
  let temp = new Array(val).fill(0).map(() => [0, 0]);
  let vis = new Array(grid * grid).fill(0);
  for(let i = 0;i < val;i ++)
  {
    let ch = int(Math.random() * grid * grid);
    while(vis[ch] == 1)
      ch = (ch + 1) % (grid * grid);
    vis[ch] = 1;
    temp[i][0] = ch;
  }
  return temp;
}

function getLookTime(val)
{
  if(val >= 1 && val <= 5)
    return 3;
  else
    return val;
}

function toGrid(val)
{
  let row = int(val / grid);
  let col = val - row * grid;
  return [row, col];
}

function toIndex(row, col)
{
  return grid * row + col;
}

function mousePressed()
{
  if(cTime - sTime < lookTime)
    return;
  mouseX -= cx;
  mouseY -= cy;
  let col = int((mouseX - sx) / (sw + dx));
  let row = int((mouseY - sy) / (sh + dy));
  let ind = toIndex(row, col);
  for(let i = 0;i < set.length;i ++)
  {
    if(set[i][0] == ind)
    {
      if(i == 0 || (i > 0 && set[i - 1][1] == 1))
        set[i][1] = 1;
      else
        newGame();
    }
  }
}