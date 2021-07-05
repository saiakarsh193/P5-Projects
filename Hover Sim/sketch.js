let body;

let g;
let e;
let lScale;
let cTime;
let cx, cy;
let ground;

class Hover
{
  constructor() 
  {
    this.mass = 2;
    this.position_x = 0;
    this.position_y = ground + 20;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.acceleration_x = 0;
    this.acceleration_y = 0;
    this.inertia = 200;
    this.position_ang = 0;
    this.velocity_ang = 0;
    this.acceleration_ang = 0;
    this.length = 20;
    this.height = 5;
    this.thrust = 40;
    this.leftEngine = 0;
    this.rightEngine = 0;
    this.autoPilot = false;
    this.AP_y = 0;
    this.ASL = false; // Automatic Stablization and Landing (ASL)
    this.ASL_smoothness = 50;
    this.updateCorners();

    this.channel_length = 40;
    this.channel_rate = 20;
    this.position_x_channel = [];
    this.position_y_channel = [];
    this.velocity_x_channel = [];
    this.velocity_y_channel = [];
    this.updateChannels();
  }

  updateState(dT)
  {
    if(this.ASL)
    {
      this.autoPilot = true;
      this.AP_y = ground + this.height / 2 + map(this.position_y, ground, ground + 1000, 0, this.ASL_smoothness);
    }

    this.applyAutoPilot();
    this.applyEngines();

    this.velocity_x += this.acceleration_x * dT;
    this.velocity_y += (this.acceleration_y + g) * dT;
    this.position_x += this.velocity_x * dT;
    this.position_y += this.velocity_y * dT;

    this.velocity_ang += this.acceleration_ang * dT;
    this.position_ang += this.velocity_ang * dT;
    if(this.position_ang > PI)
    {
      this.position_ang = -(2 * PI - this.position_ang);
    }
    if(this.position_ang < -PI)
    {
      this.position_ang = (2 * PI + this.position_ang);
    }

    this.updateCorners();
    this.handleGroundCollision();
    this.updateChannels();
  }

  updateChannels()
  {
    if(frameCount % this.channel_rate == 0)
    {
      if(this.position_x_channel.length == this.channel_length)
      {
        this.position_x_channel.splice(0, 1);
        this.position_y_channel.splice(0, 1);
        this.velocity_x_channel.splice(0, 1);
        this.velocity_y_channel.splice(0, 1);
      }
      this.position_x_channel.push([this.position_x, cTime]);
      this.position_y_channel.push([this.position_y, cTime]);
      this.velocity_x_channel.push([this.velocity_x, cTime]);
      this.velocity_y_channel.push([this.velocity_y, cTime]);
    }
  }

  updateCorners()
  {
    //0   1
    //2   3
    var corners = [];
    corners.push(this.rotateCoordinates(this.position_x - (this.length / 2), this.position_y + (this.height / 2)));
    corners.push(this.rotateCoordinates(this.position_x + (this.length / 2), this.position_y + (this.height / 2)));
    corners.push(this.rotateCoordinates(this.position_x - (this.length / 2), this.position_y - (this.height / 2)));
    corners.push(this.rotateCoordinates(this.position_x + (this.length / 2), this.position_y - (this.height / 2)));
    this.corners = corners;
  }

  rotateCoordinates(x, y)
  {
    x -= this.position_x;
    y -= this.position_y;
    var nx = x * cos(this.position_ang) + y * sin(this.position_ang);
    var ny = x * -sin(this.position_ang) + y * cos(this.position_ang);
    nx += this.position_x;
    ny += this.position_y;
    return [nx, ny];
  }

  setInput(up, down, clockwise, anticlockwise)
  {
    if((up || down || clockwise || anticlockwise) && !this.ASL)
    {
      this.autoPilot = false;
    }
    else
    {
      if(!this.autoPilot)
      {
        this.setEngines(0, 0);
      }
      return;
    }
    if(up)
    {
      this.setEngines(1, 1);
    }
    else if(down)
    {
      this.setEngines(-1, -1);
    }
    else if(clockwise)
    {
      this.setEngines(1, -1);
    }
    else if(anticlockwise)
    {
      this.setEngines(-1, 1);
    }
  }

  applyAutoPilot()
  {
    if(this.autoPilot)
    {
      this.setEngines(0, 0);

      var cV = 0.5;
      var dAng = 0.02;
      var dV = 0.05;

      if(abs(this.position_ang) > PI / 4)
      {
        cV *= 6;
      }

      if(this.position_ang > 0)
      {
        cV = -cV;
      }

      if(!this.AP_velocityAng(cV, dV, dAng))
      {
        if(!this.AP_balance(dV, dAng))
        {
          this.AP_hover(this.AP_y);
        }
      }
    }
  }

  AP_velocityAng(target, dV, dAng)
  {
    if(abs(this.velocity_ang - target) > dV && abs(this.position_ang) > dAng)
    {
      if(this.velocity_ang > target)
      {
        this.setEngines(-1, 1);
      }
      else
      {
        this.setEngines(1, -1);
      }
      return true;
    }
    else
    {
      return false;
    }
  }

  AP_balance(dV, dAng)
  {
    if(abs(this.velocity_ang) > dV)
    {
      var dang = Math.pow(this.velocity_ang, 2) / (2 * 2 * (this.thrust * (this.length / 2) / this.inertia));
      if(this.velocity_ang > 0)
      {
        if(abs(this.position_ang + dang) < dAng)
        {
          this.setEngines(-1, 1);
        }
        else if(abs(this.position_ang - dang) < dAng)
        {
          this.setEngines(1, -1);
        }
      }
      else
      {
        if(abs(this.position_ang + dang) < dAng)
        {
          this.setEngines(1, -1);
        }
        else if(abs(this.position_ang - dang) < dAng)
        {
          this.setEngines(-1, 1);
        }
      }
      return true;
    }
    else
    {
      return false;
    }
  }

  AP_hover(height)
  {
    var DH = this.position_y - height;
    if(abs(DH) > 0.1)
    {
      if(DH > 0)
      {
        if(this.velocity_y < -Math.sqrt(abs(2 * (g - this.thrust / this.mass) * DH)))
        {
          this.setEngines(1, 1);
        }
        else
        {
          this.setEngines(0, 0);
        }
      }
      else
      {
        if(this.velocity_y < Math.sqrt(abs(2 * g * DH)))
        {
          this.setEngines(1, 1);
        }
        else
        {
          this.setEngines(0, 0);
        }
      }
      return true;
    }
    else
    {
      return false;
    }
  }

  setEngines(left, right)
  {
    this.leftEngine = left;
    this.rightEngine = right;
  }

  applyEngines()
  {
    this.acceleration_ang = 0;
    this.acceleration_x = 0;
    this.acceleration_y = 0;
    if(this.leftEngine == 1)
    {
      this.acceleration_ang += this.thrust * (this.length / 2) / this.inertia;
      this.acceleration_x += this.thrust * sin(this.position_ang) / this.mass;
      this.acceleration_y += this.thrust * cos(this.position_ang) / this.mass;
    }
    if(this.leftEngine == -1)
    {
      this.acceleration_ang += -this.thrust * (this.length / 2) / this.inertia;
      this.acceleration_x += -this.thrust * sin(this.position_ang) / this.mass;
      this.acceleration_y += -this.thrust * cos(this.position_ang) / this.mass;
    }
    if(this.rightEngine == 1)
    {
      this.acceleration_ang += -this.thrust * (this.length / 2) / this.inertia;
      this.acceleration_x += this.thrust * sin(this.position_ang) / this.mass;
      this.acceleration_y += this.thrust * cos(this.position_ang) / this.mass;
    }
    if(this.rightEngine == -1)
    {
      this.acceleration_ang += this.thrust * (this.length / 2) / this.inertia;
      this.acceleration_x += -this.thrust * sin(this.position_ang) / this.mass;
      this.acceleration_y += -this.thrust * cos(this.position_ang) / this.mass;
    }
  }

  drawBody()
  {
    stroke(0);
    strokeWeight(lScale);
    noFill();
    line((this.corners[0][0] + this.corners[2][0]) * lScale / 2, -(this.corners[0][1] + this.corners[2][1]) * lScale / 2, (this.corners[1][0] + this.corners[3][0]) * lScale / 2, -(this.corners[1][1] + this.corners[3][1]) * lScale / 2);
    line(this.corners[0][0] * lScale, -this.corners[0][1] * lScale, this.corners[2][0] * lScale, -this.corners[2][1] * lScale);
    line(this.corners[1][0] * lScale, -this.corners[1][1] * lScale, this.corners[3][0] * lScale, -this.corners[3][1] * lScale);
  }

  drawExhaust()
  {
    var exhaust = this.thrust * 0.015;
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();
    if(this.leftEngine == 1)
    {
      var lc = [this.corners[2][0] + exhaust * (this.corners[2][0] - this.corners[0][0]), this.corners[2][1] + exhaust * (this.corners[2][1] - this.corners[0][1])];
      line(this.corners[2][0] * lScale, -this.corners[2][1] * lScale, lc[0] * lScale, -lc[1] * lScale);
    }
    if(this.leftEngine == -1)
    {
      var lc = [this.corners[0][0] + exhaust * (this.corners[0][0] - this.corners[2][0]), this.corners[0][1] + exhaust * (this.corners[0][1] - this.corners[2][1])];
      line(this.corners[0][0] * lScale, -this.corners[0][1] * lScale, lc[0] * lScale, -lc[1] * lScale);
    }
    if(this.rightEngine == 1)
    {
      var rc = [this.corners[3][0] + exhaust * (this.corners[3][0] - this.corners[1][0]), this.corners[3][1] + exhaust * (this.corners[3][1] - this.corners[1][1])];
      line(this.corners[3][0] * lScale, -this.corners[3][1] * lScale, rc[0] * lScale, -rc[1] * lScale);
    }
    if(this.rightEngine == -1)
    {
      var rc = [this.corners[1][0] + exhaust * (this.corners[1][0] - this.corners[3][0]), this.corners[1][1] + exhaust * (this.corners[1][1] - this.corners[3][1])];
      line(this.corners[1][0] * lScale, -this.corners[1][1] * lScale, rc[0] * lScale, -rc[1] * lScale);
    }
  }

  drawBoundary()
  {
    stroke(0, 255, 0);
    strokeWeight(2);
    noFill();
    line(this.corners[0][0] * lScale, -this.corners[0][1] * lScale, this.corners[1][0] * lScale, -this.corners[1][1] * lScale);
    line(this.corners[1][0] * lScale, -this.corners[1][1] * lScale, this.corners[3][0] * lScale, -this.corners[3][1] * lScale);
    line(this.corners[3][0] * lScale, -this.corners[3][1] * lScale, this.corners[2][0] * lScale, -this.corners[2][1] * lScale);
    line(this.corners[2][0] * lScale, -this.corners[2][1] * lScale, this.corners[0][0] * lScale, -this.corners[0][1] * lScale);
  }

  drawGimbal(radius=50, maxheight=500)
  {
    var px = cx - 100;
    var py = -cy + 100;
    var tx = px;
    var ty = py - radius / 3;
    tx -= px;
    ty -= py;
    var nx = tx * cos(this.position_ang) + ty * sin(this.position_ang);
    var ny = tx * -sin(this.position_ang) + ty * cos(this.position_ang);
    nx *= -1;
    nx += px;
    ny += py;

    strokeWeight(0);
    fill(0);
    circle(px, py, 2 * radius);

    stroke(150);
    strokeWeight(lScale);
    noFill();
    line(px, py, nx, ny);

    stroke(255, 0, 0);
    arc(px, py, 2 * radius, 2 * radius, PI / 2, PI / 2 + map(this.position_y, ground, ground + maxheight, 0, 2 * PI));

    strokeWeight(2);
    stroke(0, 255, 0);
    line(px, py, px, py - (this.velocity_y < -radius ? -radius : (this.velocity_y > radius ? radius : this.velocity_y)));

    stroke(0, 0, 255);
    line(px, py, px + (this.velocity_x < -radius ? -radius : (this.velocity_x > radius ? radius : this.velocity_x)), py);
  }

  drawTelemetry()
  {
    let sx = -cx + 35;
    let sy = -cy + 80;
    let dx = 120;
    let dy = 20;
    fill(0, 0, 0, 0);
    stroke(0);
    strokeWeight(2);
    rect(sx - 10, sy - 60, 230, 250);
    line(sx - 10, sy - 20, sx + 220, sy - 20);
    fill(0);
    strokeWeight(0);
    textSize(14);
    textFont('Georgia');
    text("Telemetry", sx + 77, sy - 35);
    text("pX:  " + round(this.position_x, 2) + " m", sx + 0 * dx, sy + 0 * dy);
    text("pY:  " + round(this.position_y, 2) + " m", sx + 0 * dx, sy + 1 * dy);
    text("vX:  " + round(this.velocity_x, 2) + " m/s", sx + 0 * dx, sy + 2 * dy);
    text("vY:  " + round(this.velocity_y, 2) + " m/s", sx + 0 * dx, sy + 3 * dy);
    text("aX:  " + round(this.acceleration_x, 2) + " m2/s", sx + 0 * dx, sy + 4 * dy);
    text("aY:  " + round(this.acceleration_y + g, 2) + " m2/s", sx + 0 * dx, sy + 5 * dy);
    text("pθ:  " + round(this.position_ang, 2) + " m", sx + 0 * dx, sy + 6 * dy);
    text("vθ:  " + round(this.velocity_ang, 2) + " m/s", sx + 0 * dx, sy + 7 * dy);
    text("aθ:  " + round(this.acceleration_ang, 2) + " m2/s", sx + 0 * dx, sy + 8 * dy);
    text("T+:  " + round(cTime, 2) + " s", sx + 0 * dx, sy + 9 * dy);

    text("M:  " + round(this.mass, 2) + " kg", sx + 1 * dx, sy + 0 * dy);
    text("I:  " + round(this.inertia, 2) + " kgm2", sx + 1 * dx, sy + 1 * dy);
    text("Th:  " + round(this.thrust, 2) + " N", sx + 1 * dx, sy + 2 * dy);
    text("LE:  " + this.leftEngine, sx + 1 * dx, sy + 3 * dy);
    text("RE:  " + this.rightEngine, sx + 1 * dx, sy + 4 * dy);
    text("ASL:  " + (this.ASL ? "ON" : "OFF"), sx + 1 * dx, sy + 6 * dy);
    text("AP:  " + (this.autoPilot ? "ON" : "OFF"), sx + 1 * dx, sy + 7 * dy);
    if(this.autoPilot)
    {
      text("APY:  " + round(this.AP_y, 2) + " m", sx + 1 * dx, sy + 8 * dy);
    }
  }

  drawAllGraphs()
  {
    // sx, sy, width, height, padding, channel array, (y axis bounds), color, label
    // this.drawGraph(-cx + 25, -cy + 290, 300, 150, 10, this.position_x_channel, -100, 100, color(255, 0, 0), "pX");
    // this.drawGraph(-cx + 25, -cy + 460, 300, 150, 10, this.position_y_channel, ground, ground + 500, color(0, 0, 255), "pY");
    this.drawGraph(-300, -cy + 50, 300, 150, 10, this.velocity_x_channel, -50, 50, color(255, 0, 0), "vX");
    this.drawGraph(50, -cy + 50, 300, 150, 10, this.velocity_y_channel, -100, 100, color(0, 0, 255), "vY");
  }

  drawGraph(sx, sy, wdt, hgt, pad, data, minv, maxv, color, label)
  {
    fill(0);
    strokeWeight(0);
    textSize(14);
    textFont('Georgia');
    text(label, sx + 2 * pad, sy + 2 * pad);

    noFill();
    stroke(0);
    strokeWeight(2);
    rect(sx, sy, wdt, hgt);
    line(sx + pad, sy + hgt - pad, sx + wdt - pad, sy + hgt - pad);
    line(sx + pad, sy + pad, sx + pad, sy + hgt - pad);
    stroke(color);
    strokeWeight(1);
    beginShape();
    for(var i = 0;i < data.length;i ++)
    {
      var py = data[i][0];
      var px = data[i][1];
      py = max(minv, py);
      py = min(maxv, py);
      py = map(py, minv, maxv, sy + hgt - pad, sy + pad);
      px = map(i, 0, this.channel_length - 1, sx + pad, sx + wdt - pad);
      vertex(px, py);
    }
    endShape();
  }
  
  handleGroundCollision()
  {
    var lowCorner = min(this.corners[0][1], this.corners[1][1], this.corners[2][1], this.corners[3][1]);
    if(lowCorner < ground)
    {
      this.reset();
      this.updateCorners();
    }
  }

  reset()
  {
    this.velocity_x = 0;
    this.acceleration_x = 0;
    this.position_y = ground + this.height / 2;
    this.velocity_y = 0;
    this.acceleration_y = 0;
    this.position_ang = 0;
    this.velocity_ang = 0;
    this.acceleration_ang = 0;
    this.autoPilot = false;
    this.ASL = false;
  }
}

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;

  cTime = 0;
  g = -9.8;
  e = 0.5;
  lScale = 5;
  ground = -60;

  body = new Hover();
}

function draw()
{
  background(175);
  translate(cx, cy);

  let dT = min(deltaTime, 50) / 1000;
  drawGround();
  handleBody(body, dT);
  cTime += dT;
}

function drawGround()
{
  stroke(0);
  strokeWeight(lScale);
  line((-width / 2) * lScale, (-ground) * lScale, (width / 2) * lScale, (-ground) * lScale);
}

function handleBody(body, dT)
{
  body.setInput(keyIsDown(38) || keyIsDown(87), keyIsDown(40) || keyIsDown(83), keyIsDown(37) || keyIsDown(65), keyIsDown(39) || keyIsDown(68));
  if(keyIsDown(79))
  {
    body.ASL = true;
  }
  else if(keyIsDown(80))
  {
    body.ASL = false;
  }
  if(keyIsDown(90))
  {
    body.autoPilot = true;
    body.AP_y = body.position_y;
  }
  else if(keyIsDown(88))
  {
    body.autoPilot = false;
  }
  body.updateState(dT);
  body.drawBody();
  body.drawExhaust();
  // body.drawBoundary();
  body.drawGimbal();
  body.drawTelemetry();
  body.drawAllGraphs();
}