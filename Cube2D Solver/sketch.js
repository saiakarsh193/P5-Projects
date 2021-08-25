let cx, cy;
let cb;

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;

  cb = new Cube();
  cb.doMoves("U'2");
}

function draw()
{
  background(200);
  translate(cx, cy);
  if(frameCount % 30 == 0)
    cb.update();
  cb.draw();
}