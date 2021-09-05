let cx, cy;
let cb;
let sol;

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;

  cb = new Cube();
  // let scramble = getScramble(10);
  let scramble = "RB'UFF'FD2D'F";
  cb.addMoves(scramble);
  cb.updateAll();
  
  sol = new Solver();
}

function draw()
{
  background(200);
  translate(cx, cy);
  if(cb.movesEmpty())
    cb.addMoves(sol.getMoves(cb.getFaces()));
  if(frameCount % 30 == 0)
    cb.update();
  cb.draw();
}