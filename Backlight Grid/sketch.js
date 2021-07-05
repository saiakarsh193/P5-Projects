let gridcan;

let grows = 10;
let gcols = 10;

let sposx = 50;
let sposy = 50;

let gside = 15;
let gspace = 2;
let gdata;

function setup()
{
  createCanvas(1200, 680);

  gridcan = createGraphics(width, height);
}

function draw()
{
  background(255);

  strokeWeight(0);
  fill(200);
  circle(mouseX, mouseY, 100);

  gridcan.background(255);

  for(let i = 0;i < grows;i ++)
  {
    for(let j = 0;j < gcols;j ++)
    {
      gbox(sposx + (gside + gspace) * j, sposy + (gside + gspace) * i, gside, gside, 2);
    }
  }

  imageMode(CORNER);
  image(gridcan, 0, 0, width, height);
}

function gbox(bx, by, bwidth, bheight, bound)
{
  for(var i = by;i < by + bheight;i ++)
  {
    for(var j = bx;j < bx + bwidth;j ++)
    {
      var val = color(0, 0, 0, 2);
      gridcan.set(j, i, val);
    }
  }
  gridcan.updatePixels();
  gridcan.strokeWeight(0);
  gridcan.fill(255);
  gridcan.rect(bx + bound, by + bound, bwidth - 2 * bound, bheight - 2 * bound);
}