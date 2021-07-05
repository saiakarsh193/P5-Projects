var nval = new Array(20, 10, 10, 5);
var nodeval = [];
var nodepos = [];
var weightval = [];
var biasval = [];

var sy = 50;
var ey = 630;
var sx = 50;
var ex = 1150;
var nodeRad = 50;
var txtSize = 14;

function setup()
{
  createCanvas(1200, 680);
  nodeRad = map(nval[0], 10, 30, 50, 15);
  txtSize = map(nval[0], 10, 30, 25, 8);

  for(var i = 0;i < nval.length;i ++)
  {
    nodeval.push(new Array(nval[i]).fill(0));
    biasval.push(new Array(nval[i]).fill(0));
    nodepos.push(new Array(nval[i]).fill(0).map((val, index) => new Array(map(i, 0, nval.length - 1, sx, ex), map(index, 0, nval[i] - 1, sy, ey))));
  }
  for(var i = 0;i < nval.length - 1;i ++)
  {
    weightval.push(new Array(nval[i + 1]).fill(0).map(() => new Array(nval[i]).fill(0).map(() => Math.random())));
  }

  var inpvec = new Array(nval[0]).fill(0).map(() => Math.random());
  calcNodeVal(inpvec);
}

function draw()
{
  background(0);
  strokeWeight(1.5);

  for(var i = 0;i < nval.length - 1;i ++)
  {
    for(var j = 0;j < nval[i];j ++)
    {
      for(var k = 0;k < nval[i + 1];k ++)
      {
        stroke(map(weightval[i][k][j], 0, 1, 0, 255));
        line(nodepos[i][j][0], nodepos[i][j][1], nodepos[i + 1][k][0], nodepos[i + 1][k][1]);
      }
    }
  }

  for(var i = 0;i < nval.length;i ++)
  {
    for(var j = 0;j < nval[i];j ++)
    {
      stroke(255);
      fill(map(nodeval[i][j], 0, 1, 0, 255));
      circle(nodepos[i][j][0], nodepos[i][j][1], nodeRad);

      strokeWeight(0);
      textSize(txtSize);
      textAlign(CENTER, CENTER);
      fill(map(nodeval[i][j], 0, 1, 255, 0));
      text(round(nodeval[i][j], 1), nodepos[i][j][0], nodepos[i][j][1]);
      strokeWeight(1.5);
    }
  }
}

function calcNodeVal(vec)
{
  nodeval[0] = vec;
  for(var i = 1;i < nval.length;i ++)
  {
    nodeval[i] = matvecmult(weightval[i - 1], nodeval[i - 1], biasval[i]);
  }
  var sum = 0;
  for(var i = 0;i < nval[nval.length - 1];i ++)
  {
    sum += nodeval[nval.length - 1][i];
  }
  for(var i = 0;i < nval[nval.length - 1];i ++)
  {
    nodeval[nval.length - 1][i] /= sum;
  }
  print(nodeval[nval.length - 1]);
}

function matvecmult(mat, vec, bias)
{
  var rows = mat.length;
  var cols = mat[0].length;
  var ans = new Array(rows).fill(0);
  for(var i = 0;i < rows;i ++)
  {
    for(var j = 0;j < cols;j ++)
    {
      ans[i] += mat[i][j] * vec[j];
    }
  }
  for(var i = 0;i < rows;i ++)
  {
    ans[i] = sigmoid(ans[i] - bias[i]);
  }
  return ans;
}

function sigmoid(val)
{
  if(val < 0)
  {
    return 0;
  }
  else
  {
    return val / (1 + abs(val));
  }
}