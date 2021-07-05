let cx, cy;
let xscale = 10;
let yscale = 10;
let points = [];
let cumval = [];

function setup()
{
  randomSeed(2);
  createCanvas(1200, 680);
  cx = width / 2;
  cy = height / 2;
  calculatePoints(-40, 40, 0.1);
  frameRate(10);
}

function draw()
{
  background(200);
  translate(cx, cy);
  // drawNumberLine();
  drawPoints();
  updatePoints();
}

function fx(x)
{
  // return sin(x) + sin(2 * x) + sin(PI / 2 + x) + 2 * cos(3 * x);
  return 20 * random() - 10;
}

function calculatePoints(lx, rx, dx)
{
  for(var i = lx;i <= rx;i += dx)
  {    
    points.push([i, fx(i)]);
    cumval.push(points[points.length - 1][1]);
  }
  for(i = 1;i < cumval.length;i ++)
  {
    cumval[i] += cumval[i - 1];
  }
}

function updatePoints()
{
  var temp = new Array(points.length).fill(0).map((value, index) => [points[index][0], points[index][1]]);
  var dist = frameCount;
  for(i = 0;i < points.length;i ++)
  {
    var l = max(0, i - dist);
    l = (l == 0) ? 0 : l - 1;
    var r = min(points.length - 1, i + dist);
    temp[i] = [points[i][0], (cumval[r] - cumval[l]) / (2 * dist + 1)];
  }
  points = temp;
}

function drawNumberLine()
{
  s_line(points[0][0], 0, points[points.length - 1][0], 0);
  for(var i = 0;i < points.length;i ++)
  {
    s_point(points[i][0], 0);
  }
}

function drawPoints()
{
  for(var i = 1;i < points.length;i ++)
  {
    s_line(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1]);
  }
}

function s_line(x1, y1, x2, y2)
{
  stroke(0);
  strokeWeight(2);
  line(x1 * xscale, -y1 * yscale, x2 * xscale, -y2 * yscale);
}

function s_point(x, y)
{
  stroke(0);
  strokeWeight(4);
  point(x * xscale, -y * yscale);
}