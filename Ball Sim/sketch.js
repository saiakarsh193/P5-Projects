let cx, cy;
let board;

function setup()
{
  createCanvas(1200, 680);
  cx = width / 2;
  cy = height / 2;
  board = new Board();
}

function draw()
{
  background(0);
  translate(cx, cy);
  board.draw();
  board.update(deltaTime/1000);
}