let rob;

function setup()
{
  createCanvas(1520, 770);
  rob = new robot();
}

function draw()
{
  background(255);
  rob.animateArms();
  rob.draw();
  rob.updateTarget([mouseX, mouseY]);
}