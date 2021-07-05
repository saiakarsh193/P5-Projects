let data;
let cscal;
let ctime = 0;

function setup() 
{
  createCanvas(1000, 600);
  data = new Array(height).fill(0).map(() => new Array(width).fill(0));
  cscal = 200;
  ctime = 0;
  // setData(cscal, -0.75, 0.1);
  pixelDensity(1);
  background(0, 0, 0);
}

function draw() 
{
  setData(cscal, -0.749, 0.1);
  loadPixels();
  for(var j = 0;j < height;j ++)
  {
    for(var i = 0;i < width;i ++)
    {
      var index = (i + j * width) * 4;
      var val = data[j][i] ? color(255, 255, 255) : color(0, 0, 0);
      pixels[index] = red(val);
      pixels[index + 1] = green(val);
      pixels[index + 2] = blue(val);
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
  cscal += 100 * pow(int(ctime / 1000), 2);
  ctime += deltaTime;
}

function setData(scale, Dx, Dy)
{
  for(var x = -width / 2;x <= width / 2;x ++)
  {
    for(var y = -height / 2;y <= height / 2;y ++)
    {
      data[round(map(y, height / 2, -height / 2, 0, height - 1))][round(map(x, -width / 2, width / 2, 0, width - 1))] = inSet(Dx + (x / scale), Dy + (y / scale));
    }
  }
}

function inSet(c, d)
{
  let a = 0;
  let b = 0;
  let n = 100;
  while(n --)
  {
    let aa = (a * a) - (b * b) + c;
    let bb = (2 * a * b) + d;
    a = aa;
    b = bb;
  }
  if(sqrt(a * a + b * b) < 10)
    return true;
  else
    return false;
}