let cx, cy;
let sx;
let sy;
let bheight;
let bwidth;
let yMax;
let yDiv;

let data = [];

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;
  bheight = 400;
  bwidth = 800;
  yMax = 150;
  yDiv = 10;
  sx = -(bwidth / 2);
  sy = -(bheight / 2);
  fetch("gamedata.json")
    .then(response => {
      return response.json();
    })
    .then(djson => data = djson);
}

function draw()
{
  if(!data)
    return;

  let len = data[0]["score"].length;
  
  background(255);
  translate(cx, cy)

  // Y-Axis Labels and Lines
  strokeWeight(1);
  textSize(14);
  textFont('Georgia');
  textAlign(RIGHT, CENTER);
  for(let i = 0;i <= yDiv;i ++)
  {
    let ty = map(i, yDiv, 0, sy, sy + bheight);
    stroke(200);
    fill(200);
    line(sx, ty, sx + bwidth, ty);
    stroke(0);
    fill(0);
    text(int(map(i, yDiv, 0, yMax, 0)), sx - 10, ty);
  }

  // X-Axis Labels
  stroke(0);
  fill(0);
  textAlign(CENTER);
  for(let i = 1;i < len;i ++)
  {
    let tx = map(i, 0, len - 1, sx, sx + bwidth);
    text(i, tx, sy + bheight + 20);
  }

  // Rect Box
  stroke(0);
  strokeWeight(3);
  noFill();
  rect(sx, sy, bwidth, bheight);

  data.forEach((player) =>
  {
    // Player Graph
    stroke(player["color"]);
    strokeWeight(3);
    noFill();
    let y = player["score"][0];
    let tx;
    let ty;
    beginShape();
    for(let i = 0;i < len;i ++)
    {
      if(i > 0)
        y += player["score"][i];
      tx = map(i, 0, len - 1, sx, sx + bwidth);
      ty = map(y, 0, yMax, sy + bheight, sy);
      vertex(tx, ty);
      circle(tx, ty, (player["score"][i] == 0)?10:5);
    }
    endShape();

    // Player Name
    strokeWeight(1);
    fill(player["color"]);
    textAlign(LEFT);
    text(player["name"] + " (" + y + ")", sx + bwidth + 10, ty);
  });
}