let cx, cy;
let objects = [];

function setup()
{
  createCanvas(1200, 680);
  cx = width / 2;
  cy = height / 2;
  let bset = 
  {
    "sprite":
    {
      "type": "",
      "parameters": []
    },
    "shader":
    {
      "fill": [0, 0, 0],
      "stroke": [0, 0, 0],
      "strokeWeight": 2
    },
    "collider":
    {
      "type": "circle",
      "parameters": [0, 0, 25]
    }
  };
  objects.push(new Body([0, 0], bset));
  objects.push(new Body([25, 0], bset));
  checkCollisions();
}

function draw()
{
  for(let i = 0;i < objects.length;i ++)
    objects[i].update();

  background(240);
  translate(cx, cy);
  for(let i = 0;i < objects.length;i ++)
    objects[i].draw();
}

function checkCollisions()
{
  for(let i = 0;i < objects.length;i ++)
  {
    for(let j = i + 1;j < objects.length;j ++)
    {
      if(["collider"] in objects[i].state && ["collider"] in objects[j].state)
      {
        if(objects[i].state["collider"]["type"] == "circle" && objects[j].state["collider"]["type"] == "circle")
        {
          if(collisionCircleCircle(objects[i].state["collider"]["parameters"], objects[j].state["collider"]["parameters"]))
          {
            objects[i].onCollide(objects[j]);
            objects[j].onCollide(objects[i]);
          }
        }
      }
    }
  }
}

function collisionCircleCircle(params1, params2)
{
  if(Math.sqrt(Math.pow(params1[0] - params2[0], 2) + Math.pow(params1[1] - params2[1], 2)) <= params1[2] + params2[2])
    return true;
  else
    return false;
}