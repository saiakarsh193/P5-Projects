var addlist = [];
var coordlist = [];
var unitcoord = [];
var path = [];
var n = 20;
var sx = 50;
var sy = 50;
var side = 600;
var edgelength = 20;

function setup()
{
  createCanvas(1200, 680);
  frameRate(4);

  n = int(location.search.substring(1).split("=")[1]);
  if(!n)
  {
    n = 10;
  }
  edgelength = side / n;
  
  var edgecount = 2 * n * (n - 1);
  var rep = new Array(edgecount).fill(0).map((value, index) => index);
  var size = new Array(edgecount).fill(1);
  var indexlist = shuffle(new Array(edgecount).fill(0).map((value, index) => index + 1));
  var neighbours = new Array(n * n).fill(0).map(() => new Array(0));
  unitcoord = new Array(n * n).fill(0);

  coordlist.push([sx, sy, sx + edgelength * n, sy]);
  coordlist.push([sx, sy, sx, sy + edgelength * n]);
  coordlist.push([sx + edgelength * n, sy, sx + edgelength * n, sy + edgelength * n]);
  coordlist.push([sx, sy + edgelength * n, sx + edgelength * n, sy + edgelength * n]);

  for(var i = 0;i < edgecount;i ++)
  {
    var sides = getSides(indexlist[i], n);
    if(!DSU(sides[0][0], sides[1][0], rep, size))
    {
      var lx, ly, rx, ry;
      if(sides[0][1] == sides[1][1])
      {
        lx = sx + edgelength * sides[0][2];
        ly = sy + edgelength * (sides[0][1] - 1);
        rx = lx;
        ry = ly + edgelength;
      }
      else
      {
        lx = sx + edgelength * (sides[0][2] - 1);
        ly = sy + edgelength * sides[0][1];
        rx = lx + edgelength;
        ry = ly;
      }
      coordlist.push([lx, ly, rx, ry]);
      addlist.push(indexlist[i]);
    }
    else
    {
      neighbours[sides[0][0]].push(sides[1][0]);
      unitcoord[sides[0][0]] = [sides[0][1], sides[0][2]];
      neighbours[sides[1][0]].push(sides[0][0]);
      unitcoord[sides[1][0]] = [sides[1][1], sides[1][2]];
    }
  }

  var parents = new Array(n * n).fill(0).map((value, index) => index);
  var stk = [];
  var cur;
  stk.push((n * n) - 1);
  while(stk.length > 0)
  {
    cur = stk.pop();
    for(var i = 0;i < neighbours[cur].length;i ++)
    {
      if(parents[neighbours[cur][i]] == neighbours[cur][i])
      {
        parents[neighbours[cur][i]] = cur;
        stk.push(neighbours[cur][i]);
      }
    }
  }
  cur = 0;
  path.push(cur);
  while(cur != (n * n) - 1)
  {
    cur = parents[cur];
    path.push(cur);
  }
}

function draw()
{
  background(200);
  drawEdges();
  drawPath();
}

function drawEdges()
{
  stroke(0);
  strokeWeight(2);
  for(var i = 0;i < coordlist.length;i ++)
  {
    line(coordlist[i][0], coordlist[i][1], coordlist[i][2], coordlist[i][3]);
  }
}

function drawPath()
{
  stroke(255, 0, 0);
  strokeWeight(2);
  for(var i = 1;i < min(frameCount, path.length);i ++)
  {
    var lx = sx + (edgelength / 2) + (unitcoord[path[i - 1]][1] - 1) * edgelength;
    var ly = sx + (edgelength / 2) + (unitcoord[path[i - 1]][0] - 1) * edgelength;
    var rx = sx + (edgelength / 2) + (unitcoord[path[i]][1] - 1) * edgelength;
    var ry = sx + (edgelength / 2) + (unitcoord[path[i]][0] - 1) * edgelength;
    line(lx, ly, rx, ry);
  }
}

function shuffle(array) 
{
  var currentIndex = array.length, randomIndex;
  while (0 !== currentIndex)
  {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex --;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function findRep(index, rep)
{
  while(rep[index] != index)
  {
    index = rep[index];
  }
  return index;
}

function DSU(x, y, rep, size)
{
  x = findRep(x, rep);
  y = findRep(y, rep);
  if(x != y)
  {
    if(size[x] > size[y])
    {
      rep[y] = x;
      size[x] += size[y];
    }
    else
    {
      rep[x] = y;
      size[y] += size[x];
    }
    return true;
  }
  else
  {
    return false;
  }
}

function getSides(index, size)
{
  var row, column;
  var row2, column2;
  if(index <= size * (size - 1))
  {
    row = ceil(index / (size - 1));
    column = index - (row - 1) * (size - 1)
    row2 = row;
    column2 = column + 1;
  }
  else
  {
    index -= size * (size - 1);
    row = ceil(index / size);
    column = index - (row - 1) * size;
    row2 = row + 1;
    column2 = column;
  }
  return [[getUnitIndex(row, column, size), row, column], [getUnitIndex(row2, column2, size), row2, column2]];
}

function getUnitIndex(row, column, size)
{
  return (row - 1) * size + (column - 1);
}