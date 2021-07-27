let cx, cy;
let player;

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;

  player = new Dino();
}

function draw()
{
  background(255);
  translate(cx, cy);
  drawGround();
  player.crouch(keyIsDown(40) || keyIsDown(83));
  player.jump(keyIsDown(38) || keyIsDown(87));
  player.update();
  player.draw();
}

function drawGround()
{
  strokeWeight(0);
  fill(0);
  rect(-cx, 0, 2 * cx, 4);
}