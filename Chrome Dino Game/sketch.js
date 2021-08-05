let cx, cy;
let player;
let obs;
let stopGame;
let sourceSheet;

let dino_stand_sp;
let dino_crouch_sp;
let cactus_small_sp;
let cactus_big_sp;
let bird_sp;
let ground_sp;

function preload() 
{
  sourceSheet = loadImage('spritesheet.jpg');
}

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;

  setSprites();
  player = new Dino(dino_stand_sp, dino_crouch_sp);
  obs = new Obstacle(cx, cactus_small_sp, cactus_big_sp, bird_sp);
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
    // player.setInput(keyIsDown(38) || keyIsDown(87), keyIsDown(40) || keyIsDown(83));
    player.autoInput(obs.getTranscript());
    stopGame = player.getCollide(obs.getTranscript(), -0.8);
    player.update();
    obs.draw();
    player.draw();
  }
}

function drawGround()
{
  image(ground_sp[0], -cx, -5);
  image(ground_sp[1], -cx + 400, -5);
  image(ground_sp[2], -cx + 800, -5);
}

function setSprites()
{
  dino_stand_sp = [
    extractImage(sourceSheet, 1170, 10, 56, 60), 
    extractImage(sourceSheet, 1230, 10, 56, 60), 
    extractImage(sourceSheet, 1291, 10, 56, 60),
    extractImage(sourceSheet, 1351, 10, 56, 60)];
  dino_crouch_sp = [
    extractImage(sourceSheet, 1532, 33, 79, 38), 
    extractImage(sourceSheet, 1614, 33, 79, 38)];
  cactus_small_sp = [
    extractImage(sourceSheet, 315, 8, 25, 47),
    extractImage(sourceSheet, 338, 8, 25, 47),
    extractImage(sourceSheet, 361, 8, 25, 47),
    extractImage(sourceSheet, 385, 8, 25, 47),
    extractImage(sourceSheet, 408, 8, 25, 47),
    extractImage(sourceSheet, 432, 8, 25, 47)];
  cactus_big_sp = [
    extractImage(sourceSheet, 458, 7, 35, 66),
    extractImage(sourceSheet, 492, 7, 35, 66),
    extractImage(sourceSheet, 527, 7, 35, 66),
    extractImage(sourceSheet, 597, 7, 35, 66),
    extractImage(sourceSheet, 631, 7, 35, 66)];
  bird_sp = [
    extractImage(sourceSheet, 252, 9, 59, 41),
    extractImage(sourceSheet, 190, 19, 59, 41)];

  ground_sp = [
    extractImage(sourceSheet, 40, 80, 400, 21),
    extractImage(sourceSheet, 440, 80, 400, 21),
    extractImage(sourceSheet, 840, 80, 400, 21),
    extractImage(sourceSheet, 1240, 80, 400, 21)];
}

function extractImage(source, x, y, dx, dy)
{
  let tar = source.get(x, y, dx, dy);
  // tar.resize(w, h);
  return tar;
}