let rob;
let data;
let ctr;
let cTime;
let lastMove;

function setup()
{
  createCanvas(1520, 770);
  rob = new robot();
  data = makeInstructions(getImage(40, 30));
  ctr = 0;
  cTime = 0;
  lastMove = 0;
}

function draw()
{
  background(255);
  let reached = rob.animateArms();
  rob.draw();
  if(reached && cTime - lastMove > 0.1)
  {
    rob.updateTarget(data[ctr]);
    lastMove = cTime;
    ctr ++;
  }
  cTime += deltaTime / 1000;
}

function makeInstructions(img)
{
  fill(0);
  noStroke(0);
  let data = [];
  let x_units = img[0].length;
  let x_stride = int(x_units / rob.segments[1]);
  let y_units = img.length;
  for(let j = 0;j < x_units;j += x_stride)
  {
    for(let i = 0;i < y_units;i ++)
    {
      for(let k = j;k < j + x_stride;k ++)
        data.push([map(k, 0, x_units - 1, rob.offset[0], rob.offset[0] + rob.f1_dims[0]) * rob.scale, map(i, 0, y_units - 1, rob.offset[1], rob.offset[1] + rob.f1_dims[1]) * rob.scale]);
    }
  }
  return data;
}

function getImage(width, height)
{
  return new Array(height).fill(0).map((v1, i) => new Array(width).fill(0).map((v2, j) => i + j));
}