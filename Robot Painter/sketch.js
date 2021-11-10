let rob;

function setup()
{
  createCanvas(1520, 770);
  rob = new robot();
}

function draw()
{
  background(255);
  rob.draw();
  rob.animateArms();
  rob.updateTarget([mouseX, mouseY]);
}