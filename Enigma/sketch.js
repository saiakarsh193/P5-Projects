let keys = [];
let active_key;
let output_key;
let machine;

class Engima
{
  constructor()
  {
    this.A = [[23, 5, 13, 24, 21, 4, 3, 1, 20, 6, 11, 12, 14, 7, 8, 9, 18, 19, 16, 22, 10, 25, 15, 0, 2, 17], 
        [4, 3, 5, 25, 11, 0, 22, 2, 12, 1, 6, 7, 8, 24, 16, 9, 18, 10, 23, 14, 13, 15, 17, 19, 20, 21], 
        [12, 13, 24, 7, 3, 15, 5, 11, 4, 6, 14, 9, 10, 16, 17, 25, 2, 18, 19, 0, 20, 22, 23, 1, 8, 21],
        [2, 10, 6, 3, 12, 24, 20, 21, 4, 22, 23, 13, 15, 18, 25, 14, 11, 0, 7, 17, 16, 1, 5, 8, 9, 19],
        [15, 24, 16, 0, 2, 23, 18, 9, 17, 25, 1, 5, 13, 10, 4, 3, 11, 12, 6, 14, 8, 21, 7, 19, 22, 20]];
    this.C = [1, 0, 3, 2, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15, 14, 17, 16, 19, 18, 21, 20, 23, 22, 25, 24];
    this.rule = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  }

  getTrans(value)
  {
    for(let i = 0;i < this.rule.length;i ++)
    {
      if(this.rule[i] == value)
        return i;
    }
  }

  forwardTrans(value)
  {
    for(let i = 0;i < this.A.length;i ++)
      value = this.A[i][value];
    return value;
  }

  backwardTrans(value)
  {
    for(let i = this.A.length - 1;i >= 0;i --)
    {
      for(let j = 0;j < this.A[i].length;j ++)
      {
        if(this.A[i][j] == value)
        {
          value = j;
          break;
        }
      }
    }
    return value;
  }

  updateShaft(value, shaft)
  {
    let temp = new Array(shaft.length).fill(0);
    for(let i = 0;i < shaft.length;i ++)
      temp[(i + value) % shaft.length] = shaft[i];
    return temp;
  }

  crunch(input)
  {
    let initPos = this.getTrans(input);
		let temp = this.forwardTrans(initPos);
		temp = this.C[temp];
		let finalPos = this.backwardTrans(temp);
    for(let i = 0;i < this.A.length;i ++)
      this.A[i] = this.updateShaft(min(initPos, finalPos) + i, this.A[i]);
    return this.rule[finalPos];
  }

  draw()
  {
    let sx = 410;
    let sy = 100;
    let dx = 100;

    stroke(0);
    strokeWeight(0);
    fill(60);
    rect(sx - 25, sy - 75, (this.A.length - 1) * dx + 50, 150);
    fill(0);
    rect(sx - 25, sy - 25, (this.A.length - 1) * dx + 50, 50);

    for(let i = 0;i < this.A.length;i ++)
    {
      this.drawNum(this.A[i][25], sx + i * dx, sy - 50);
      this.drawNum(this.A[i][0], sx + i * dx, sy);
      this.drawNum(this.A[i][1], sx + i * dx, sy + 50);
    }

    // this.drawConnections();
  }

  drawNum(val, x, y)
  {
    stroke(0);
    strokeWeight(0);
    fill(255);
    rect(x - 20, y - 20, 40, 40);
    fill(0);
    textSize(25);
    textAlign(CENTER, CENTER);
    text(val, x, y);
  }

  drawConnections()
  {
    let sx = 710;
    let sy = 25;
    let sw = 400;
    let sh = 150;
    let bxl = sx + 10;
    let bxr = sx + sw - 10;
    let byl = sy + 35;
    let byr = sy + sh - 30;
    stroke(0);
    strokeWeight(2);
    noFill();
    rect(sx, sy, sw, sh);
    fill(255);
    rect(sx, sy, sw, sh);

    stroke(0);
    strokeWeight(1);
    fill(0);
    textSize(10);
    textAlign(CENTER, CENTER);
    for(let i = 0;i < 26;i ++)
    {
      let ax = map(i, 0, 25, bxl, bxr);
      let ay =  map(-1, 0, this.A.length - 1, byl, byr);
      fill(255);
      circle(ax, ay, 13);
      fill(0);
      text(i, ax, ay);
    }
    for(let i = 0;i < this.A.length;i ++)
    {
      for(let j = 0;j < 26;j ++)
      {
        let ax = map(j, 0, 25, bxl, bxr);
        let ay = map((i - 1), 0, this.A.length - 1, byl, byr);
        let bx = map(this.A[i][j], 0, 25, bxl, bxr);
        let by = map(i, 0, this.A.length - 1, byl, byr);
        line(ax, ay, bx, by);
        circle(bx, by, 5);
      }
    }
    for(let i = 0;i < 26;i ++)
    {
      let ax = map(i, 0, 25, bxl, bxr);
      let ay =  map(this.A.length, 0, this.A.length - 1, byl, byr);
      fill(255);
      circle(ax, ay, 13);
      fill(0);
      text(this.C[i], ax, ay);
      let bx = map(this.C[i], 0, 25, bxl, bxr);
      let by = map(this.A.length - 1, 0, this.A.length - 1, byl, byr);
      let cx = map(i, 0, 25, bxl, bxr);
      let cy = map(this.A.length - 1, 0, this.A.length - 1, byl, byr);
      line(ax, ay, bx, by);
      line(ax, ay, cx, cy);
    }
  }
}

function setup()
{
  createCanvas(1200, 680);
  setKeys();
  machine = new Engima();
}

function draw()
{
  background(200);
  drawInputKeys();
  drawOutputKeys();
  machine.draw();
}

function setKeys()
{
  let keydx = 75;
  let keydy = 70;
  let keynx = 30;
  let keysx = 275;
  let keysy = 450;
  keys.push({"value": "q", "code": 81, "x": keysx + (0 * keynx) + (0 * keydx), "y": keysy + 0 * keydy});
  keys.push({"value": "w", "code": 87, "x": keysx + (0 * keynx) + (1 * keydx), "y": keysy + 0 * keydy});
  keys.push({"value": "e", "code": 69, "x": keysx + (0 * keynx) + (2 * keydx), "y": keysy + 0 * keydy});
  keys.push({"value": "r", "code": 82, "x": keysx + (0 * keynx) + (3 * keydx), "y": keysy + 0 * keydy});
  keys.push({"value": "t", "code": 84, "x": keysx + (0 * keynx) + (4 * keydx), "y": keysy + 0 * keydy});
  keys.push({"value": "y", "code": 89, "x": keysx + (0 * keynx) + (5 * keydx), "y": keysy + 0 * keydy});
  keys.push({"value": "u", "code": 85, "x": keysx + (0 * keynx) + (6 * keydx), "y": keysy + 0 * keydy});
  keys.push({"value": "i", "code": 73, "x": keysx + (0 * keynx) + (7 * keydx), "y": keysy + 0 * keydy});
  keys.push({"value": "o", "code": 79, "x": keysx + (0 * keynx) + (8 * keydx), "y": keysy + 0 * keydy});
  keys.push({"value": "p", "code": 80, "x": keysx + (0 * keynx) + (9 * keydx), "y": keysy + 0 * keydy});

  keys.push({"value": "a", "code": 65, "x": keysx + (1 * keynx) + (0 * keydx), "y": keysy + 1 * keydy});
  keys.push({"value": "s", "code": 83, "x": keysx + (1 * keynx) + (1 * keydx), "y": keysy + 1 * keydy});
  keys.push({"value": "d", "code": 68, "x": keysx + (1 * keynx) + (2 * keydx), "y": keysy + 1 * keydy});
  keys.push({"value": "f", "code": 70, "x": keysx + (1 * keynx) + (3 * keydx), "y": keysy + 1 * keydy});
  keys.push({"value": "g", "code": 71, "x": keysx + (1 * keynx) + (4 * keydx), "y": keysy + 1 * keydy});
  keys.push({"value": "h", "code": 72, "x": keysx + (1 * keynx) + (5 * keydx), "y": keysy + 1 * keydy});
  keys.push({"value": "j", "code": 74, "x": keysx + (1 * keynx) + (6 * keydx), "y": keysy + 1 * keydy});
  keys.push({"value": "k", "code": 75, "x": keysx + (1 * keynx) + (7 * keydx), "y": keysy + 1 * keydy});
  keys.push({"value": "l", "code": 76, "x": keysx + (1 * keynx) + (8 * keydx), "y": keysy + 1 * keydy});
  
  keys.push({"value": "z", "code": 90, "x": keysx + (2 * keynx) + (0 * keydx), "y": keysy + 2 * keydy});
  keys.push({"value": "x", "code": 88, "x": keysx + (2 * keynx) + (1 * keydx), "y": keysy + 2 * keydy});
  keys.push({"value": "c", "code": 67, "x": keysx + (2 * keynx) + (2 * keydx), "y": keysy + 2 * keydy});
  keys.push({"value": "v", "code": 86, "x": keysx + (2 * keynx) + (3 * keydx), "y": keysy + 2 * keydy});
  keys.push({"value": "b", "code": 66, "x": keysx + (2 * keynx) + (4 * keydx), "y": keysy + 2 * keydy});
  keys.push({"value": "n", "code": 78, "x": keysx + (2 * keynx) + (5 * keydx), "y": keysy + 2 * keydy});
  keys.push({"value": "m", "code": 77, "x": keysx + (2 * keynx) + (6 * keydx), "y": keysy + 2 * keydy});
}

function drawInputKeys()
{
  for(let i = 0;i < keys.length;i ++)
  {
    stroke(0);
    strokeWeight(0);
    fill(0);
    circle(keys[i]["x"], keys[i]["y"], 50);
    if(active_key == keys[i]["value"])
      fill(100);
    else
      fill(255);
    circle(keys[i]["x"], keys[i]["y"], 40);
    fill(0);
    textSize(25);
    textAlign(CENTER, CENTER);
    text(keys[i]["value"].toUpperCase(), keys[i]["x"], keys[i]["y"]);
  }
}

function drawOutputKeys()
{
  let dver = 220;
  for(let i = 0;i < keys.length;i ++)
  {
    stroke(0);
    strokeWeight(0);
    if(output_key == keys[i]["value"])
      fill(221, 255, 71);
    else
      fill(100);
    circle(keys[i]["x"], keys[i]["y"] - dver, 50);
    fill(0);
    textSize(25);
    textAlign(CENTER, CENTER);
    text(keys[i]["value"].toUpperCase(), keys[i]["x"], keys[i]["y"] - dver);
  }
}

function keyPressed()
{
  if(!active_key)
  {
    for(let i = 0;i < keys.length;i ++)
    {
      if(keyIsDown(keys[i]["code"]))
      {
        active_key = keys[i]["value"];
        output_key = machine.crunch(active_key);
        break;
      }
    }
  }
}

function keyReleased()
{
  if(!keyIsDown(active_key))
  {
    active_key = "";
    output_key = "";
  }
}