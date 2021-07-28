let cx, cy;
let player;
let obs;
let stopGame;

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;

  player = new Dino();
  obs = new Obstacle(cx);
  stopGame = false;
}

function draw()
{
  if(!stopGame)
  {
    background(255);
    translate(cx, cy);
    drawGround();    
    
    obs.update();
    player.crouch(keyIsDown(40) || keyIsDown(83));
    player.jump(keyIsDown(38) || keyIsDown(87));
    player.autoInput(obs.getTranscript());
    stopGame = player.getCollide(obs.getTranscript());
    player.update();

    obs.draw();
    player.draw();
  }
}

function drawGround()
{
  strokeWeight(0);
  fill(0);
  rect(-cx, 0, 2 * cx, 4);
}