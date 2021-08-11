let cx, cy;
let data;
let scale = 10;

function setup()
{
  createCanvas(1200, 680);
  // frameRate(10);
  cx = width / 2;
  cy = height / 2;
  getData('simdata.json');
}

function draw()
{
  background(200);
  translate(cx, cy);
  drawIter(frameCount);
}

function drawIter(iter)
{
  iter = min(iter, data.length - 1);
  stroke(0);
  strokeWeight(0);
  fill(0);
  for(let i = 0;i < data[iter].length;i ++)
    circle(data[iter][i][1] * scale, -data[iter][i][2] * scale, 10);
}

function getData(file)
{
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4)
    {
      if(rawFile.status === 200 || rawFile.status == 0)
        data = JSON.parse(rawFile.responseText);
    }
  }
  rawFile.send(null);
}
