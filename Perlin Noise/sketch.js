let noiseScale = 0.005;
let cTime = 0;

function setup()
{
  createCanvas(1200, 680);
  pixelDensity(1);
  background(255);
  frameRate(1);
}

function draw()
{
  loadPixels();
  for(var i = 0;i < height;i ++)
  {
    for(var j = 0;j < width;j ++)
    {
      let noiseVal = noise(i * noiseScale, j * noiseScale, cTime);
      var index = (j + i * width) * 4;
      var val = color(noiseVal * 255);
      pixels[index] = red(val);
      pixels[index + 1] = green(val);
      pixels[index + 2] = blue(val);
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
  cTime += deltaTime;
}