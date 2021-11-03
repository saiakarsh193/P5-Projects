let rob;

function setup()
{
  createCanvas(1520, 770);
  rob = new robot();
}

function draw()
{
  background(200);
  rob.draw();
  rob.update(deltaTime / 1000);
}