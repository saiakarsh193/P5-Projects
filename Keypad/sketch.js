let keyalpdx = 10;
let keyalpdy = 45;
let keyheight = 50;
let keydx = 10;

let keydata = [];
let wordlist = [];

let strstartposx = 300;
let strstartposy = 100;
let strwidth = 700;
let strdy = 30;

let tarstr = "";
let indstr = 0;
let colstr = [];

let defFont;
let extFont;
let cTime = 0;

function setup()
{
  createCanvas(1200, 680);

  setKeyData();
  // setWordList("data.txt");
  setWordList("words_alpha.txt");

  defFont = textFont();
  extFont = loadFont('CascadiaCodePL.ttf');
}

function draw()
{
  background(230);

  if(indstr === tarstr.length)
  {
    setTargetString();
  }

  textFont(extFont);
  printStr();
  textFont(defFont);
  printKeyboard();
  cTime += deltaTime;
}

function setKeyData()
{
  keydata.push({"letter": "`", "keycode": 192, "keywidth": keyheight - 15, "keyposx": 325 + -2 * (keydx + keyheight), "keyposy": 250});
  keydata.push({"letter": "1", "keycode": 49, "keywidth": keyheight, "keyposx": 250 + 0 * (keydx + keyheight), "keyposy": 250});
  keydata.push({"letter": "2", "keycode": 50, "keywidth": keyheight, "keyposx": 250 + 1 * (keydx + keyheight), "keyposy": 250});
  keydata.push({"letter": "3", "keycode": 51, "keywidth": keyheight, "keyposx": 250 + 2 * (keydx + keyheight), "keyposy": 250});
  keydata.push({"letter": "4", "keycode": 52, "keywidth": keyheight, "keyposx": 250 + 3 * (keydx + keyheight), "keyposy": 250});
  keydata.push({"letter": "5", "keycode": 53, "keywidth": keyheight, "keyposx": 250 + 4 * (keydx + keyheight), "keyposy": 250});
  keydata.push({"letter": "6", "keycode": 54, "keywidth": keyheight, "keyposx": 250 + 5 * (keydx + keyheight), "keyposy": 250});
  keydata.push({"letter": "7", "keycode": 55, "keywidth": keyheight, "keyposx": 250 + 6 * (keydx + keyheight), "keyposy": 250});
  keydata.push({"letter": "8", "keycode": 56, "keywidth": keyheight, "keyposx": 250 + 7 * (keydx + keyheight), "keyposy": 250});
  keydata.push({"letter": "9", "keycode": 57, "keywidth": keyheight, "keyposx": 250 + 8 * (keydx + keyheight), "keyposy": 250});
  keydata.push({"letter": "0", "keycode": 48, "keywidth": keyheight, "keyposx": 250 + 9 * (keydx + keyheight), "keyposy": 250});
  keydata.push({"letter": "-", "keycode": 189, "keywidth": keyheight, "keyposx": 250 + 10 * (keydx + keyheight), "keyposy": 250});
  keydata.push({"letter": "=", "keycode": 187, "keywidth": keyheight, "keyposx": 250 + 11 * (keydx + keyheight), "keyposy": 250});
  keydata.push({"letter": "←", "keycode": 8, "keywidth": keyheight + 50, "keyposx": 250 + 12 * (keydx + keyheight), "keyposy": 250});

  keydata.push({"letter": "ᛃ", "keycode": 9, "keywidth": keyheight + 10, "keyposx": 325 + -2 * (keydx + keyheight), "keyposy": 310});
  keydata.push({"letter": "q", "keycode": 81, "keywidth": keyheight, "keyposx": 275 + 0 * (keydx + keyheight), "keyposy": 310});
  keydata.push({"letter": "w", "keycode": 87, "keywidth": keyheight, "keyposx": 275 + 1 * (keydx + keyheight), "keyposy": 310});
  keydata.push({"letter": "e", "keycode": 69, "keywidth": keyheight, "keyposx": 275 + 2 * (keydx + keyheight), "keyposy": 310});
  keydata.push({"letter": "r", "keycode": 82, "keywidth": keyheight, "keyposx": 275 + 3 * (keydx + keyheight), "keyposy": 310});
  keydata.push({"letter": "t", "keycode": 84, "keywidth": keyheight, "keyposx": 275 + 4 * (keydx + keyheight), "keyposy": 310});
  keydata.push({"letter": "y", "keycode": 89, "keywidth": keyheight, "keyposx": 275 + 5 * (keydx + keyheight), "keyposy": 310});
  keydata.push({"letter": "u", "keycode": 85, "keywidth": keyheight, "keyposx": 275 + 6 * (keydx + keyheight), "keyposy": 310});
  keydata.push({"letter": "i", "keycode": 73, "keywidth": keyheight, "keyposx": 275 + 7 * (keydx + keyheight), "keyposy": 310});
  keydata.push({"letter": "o", "keycode": 79, "keywidth": keyheight, "keyposx": 275 + 8 * (keydx + keyheight), "keyposy": 310});
  keydata.push({"letter": "p", "keycode": 80, "keywidth": keyheight, "keyposx": 275 + 9 * (keydx + keyheight), "keyposy": 310});
  keydata.push({"letter": "[", "keycode": 219, "keywidth": keyheight, "keyposx": 275 + 10 * (keydx + keyheight), "keyposy": 310});
  keydata.push({"letter": "]", "keycode": 221, "keywidth": keyheight, "keyposx": 275 + 11 * (keydx + keyheight), "keyposy": 310});
  keydata.push({"letter": "\\", "keycode": 220, "keywidth": keyheight + 25, "keyposx": 275 + 12 * (keydx + keyheight), "keyposy": 310});

  keydata.push({"letter": "ᛨ", "keycode": 20, "keywidth": keyheight + 35, "keyposx": 325 + -2 * (keydx + keyheight), "keyposy": 370});
  keydata.push({"letter": "a", "keycode": 65, "keywidth": keyheight, "keyposx": 300 + 0 * (keydx + keyheight), "keyposy": 370});
  keydata.push({"letter": "s", "keycode": 83, "keywidth": keyheight, "keyposx": 300 + 1 * (keydx + keyheight), "keyposy": 370});
  keydata.push({"letter": "d", "keycode": 68, "keywidth": keyheight, "keyposx": 300 + 2 * (keydx + keyheight), "keyposy": 370});
  keydata.push({"letter": "f", "keycode": 70, "keywidth": keyheight, "keyposx": 300 + 3 * (keydx + keyheight), "keyposy": 370});
  keydata.push({"letter": "g", "keycode": 71, "keywidth": keyheight, "keyposx": 300 + 4 * (keydx + keyheight), "keyposy": 370});
  keydata.push({"letter": "h", "keycode": 72, "keywidth": keyheight, "keyposx": 300 + 5 * (keydx + keyheight), "keyposy": 370});
  keydata.push({"letter": "j", "keycode": 74, "keywidth": keyheight, "keyposx": 300 + 6 * (keydx + keyheight), "keyposy": 370});
  keydata.push({"letter": "k", "keycode": 75, "keywidth": keyheight, "keyposx": 300 + 7 * (keydx + keyheight), "keyposy": 370});
  keydata.push({"letter": "l", "keycode": 76, "keywidth": keyheight, "keyposx": 300 + 8 * (keydx + keyheight), "keyposy": 370});
  keydata.push({"letter": ";", "keycode": 186, "keywidth": keyheight, "keyposx": 300 + 9 * (keydx + keyheight), "keyposy": 370});
  keydata.push({"letter": "'", "keycode": 222, "keywidth": keyheight, "keyposx": 300 + 10 * (keydx + keyheight), "keyposy": 370});
  keydata.push({"letter": "↵", "keycode": 13, "keywidth": keyheight + 60, "keyposx": 300 + 11 * (keydx + keyheight), "keyposy": 370});

  keydata.push({"letter": "↑", "keycode": 16, "keywidth": keyheight + 60, "keyposx": 325 + -2 * (keydx + keyheight), "keyposy": 430});
  keydata.push({"letter": "z", "keycode": 90, "keywidth": keyheight, "keyposx": 325 + 0 * (keydx + keyheight), "keyposy": 430});
  keydata.push({"letter": "x", "keycode": 88, "keywidth": keyheight, "keyposx": 325 + 1 * (keydx + keyheight), "keyposy": 430});
  keydata.push({"letter": "c", "keycode": 67, "keywidth": keyheight, "keyposx": 325 + 2 * (keydx + keyheight), "keyposy": 430});
  keydata.push({"letter": "v", "keycode": 86, "keywidth": keyheight, "keyposx": 325 + 3 * (keydx + keyheight), "keyposy": 430});
  keydata.push({"letter": "b", "keycode": 66, "keywidth": keyheight, "keyposx": 325 + 4 * (keydx + keyheight), "keyposy": 430});
  keydata.push({"letter": "n", "keycode": 78, "keywidth": keyheight, "keyposx": 325 + 5 * (keydx + keyheight), "keyposy": 430});
  keydata.push({"letter": "m", "keycode": 77, "keywidth": keyheight, "keyposx": 325 + 6 * (keydx + keyheight), "keyposy": 430});
  keydata.push({"letter": ",", "keycode": 188, "keywidth": keyheight, "keyposx": 325 + 7 * (keydx + keyheight), "keyposy": 430});
  keydata.push({"letter": ".", "keycode": 190, "keywidth": keyheight, "keyposx": 325 + 8 * (keydx + keyheight), "keyposy": 430});
  keydata.push({"letter": "/", "keycode": 191, "keywidth": keyheight, "keyposx": 325 + 9 * (keydx + keyheight), "keyposy": 430});
  keydata.push({"letter": "↑", "keycode": 16, "keywidth": keyheight + 95, "keyposx": 325 + 10 * (keydx + keyheight), "keyposy": 430});

  keydata.push({"letter": "🌣", "keycode": 17, "keywidth": keyheight, "keyposx": 325 + -2 * (keydx + keyheight), "keyposy": 490});
  keydata.push({"letter": "☢", "keycode": 0, "keywidth": keyheight, "keyposx": 325 + -1 * (keydx + keyheight), "keyposy": 490});
  keydata.push({"letter": "🜋", "keycode": 91, "keywidth": keyheight, "keyposx": 325 + 0 * (keydx + keyheight), "keyposy": 490});
  keydata.push({"letter": "₪", "keycode": 18, "keywidth": keyheight, "keyposx": 325 + 1 * (keydx + keyheight), "keyposy": 490});
  keydata.push({"letter": " ", "keycode": 32, "keywidth": keyheight + 275, "keyposx": 325 + 2 * (keydx + keyheight), "keyposy": 490});
  keydata.push({"letter": "₪", "keycode": 18, "keywidth": keyheight, "keyposx": 300 + 8 * (keydx + keyheight), "keyposy": 490});
  keydata.push({"letter": "❂", "keycode": 17, "keywidth": keyheight, "keyposx": 300 + 9 * (keydx + keyheight), "keyposy": 490});
  keydata.push({"letter": "<", "keycode": 37, "keywidth": keyheight, "keyposx": 300 + 10 * (keydx + keyheight), "keyposy": 490});
  keydata.push({"letter": "^", "keycode": 38, "keywidth": keyheight, "keyposx": 300 + 11 * (keydx + keyheight), "keyposy": 490});
  keydata.push({"letter": "˅", "keycode": 40, "keywidth": keyheight, "keyposx": 300 + 11 * (keydx + keyheight), "keyposy": 515});
  keydata.push({"letter": ">", "keycode": 39, "keywidth": keyheight, "keyposx": 300 + 12 * (keydx + keyheight), "keyposy": 490});
}

function setWordList(file)
{
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4)
    {
      if(rawFile.status === 200 || rawFile.status == 0)
      {
        var allText = rawFile.responseText;
        var lines = allText.split("\n");
        for (var i = 0; i < lines.length; i++)
        {
          if (/\S/.test(lines[i])) 
          {
            wordlist.push(trim(lines[i]));
          }
        }
      }
    }
  }
  rawFile.send(null);
}

function setTargetString()
{
  let slen = 10 + int(Math.random() * 10);
  let tstr = "";
  for(let i = 0;i < slen;i ++)
  {
    tstr += wordlist[int(Math.random() * wordlist.length)] + " ";
  }
  tarstr = tstr.trim();
  indstr = 0;
  colstr = new Array(tstr.length).fill(true);
}

function printStr()
{
  strokeWeight(0);
  textSize(25);
  textAlign(LEFT, TOP);
  let curposx = strstartposx;
  let curposy = strstartposy;
  for(let i = 0;i < tarstr.length;i ++)
  {
    if(i < indstr)
    {
      colstr[i] ? fill(100) : fill(255, 0, 0);
    }
    else if(i === indstr)
    {
      fill(0);
      rect(curposx, curposy, 14, 25);
      fill(255);
    }
    else
    {
      fill(0);
    }
    let tchar = tarstr[i] === ' ' ? '␣' : tarstr[i];
    text(tchar, curposx, curposy);
    curposx += textWidth(tchar);
    if(curposx - strstartposx >= strwidth)
    {
      curposy += strdy;
      curposx = strstartposx;
    }
  }
}

function printKeyboard()
{
  keydata.forEach((key) =>
  {
    stroke(0);
    strokeWeight(2);
    fill(keyIsDown(key["keycode"]) ? 0 : 255);
    if(key["keycode"] === 38 || key["keycode"] === 40)
    {
      if(key["keycode"] === 38)
        rect(key["keyposx"], key["keyposy"], key["keywidth"], (keyheight / 2), 7, 7, 0, 0);
      else
        rect(key["keyposx"], key["keyposy"], key["keywidth"], (keyheight / 2), 0, 0, 7, 7);
    }
    else
    {
      rect(key["keyposx"], key["keyposy"], key["keywidth"], keyheight, 7);
    }

    strokeWeight(0);
    fill(keyIsDown(key["keycode"]) ? 255 : 0);
    textSize(25);
    textAlign(LEFT, BOTTOM);
    if(key["keycode"] === 38 || key["keycode"] === 40)
    {
      text(keyIsDown(16) ? key["letter"].toUpperCase() : key["letter"], key["keyposx"] + keyalpdx, key["keyposy"] + (keyalpdy / 1.5));
    }
    else
    {
      text(keyIsDown(16) ? key["letter"].toUpperCase() : key["letter"], key["keyposx"] + keyalpdx, key["keyposy"] + keyalpdy);
    }
  });
}

function keyTyped()
{
  if(tarstr.length > 0)
  {
    if(key === tarstr[indstr])
    {
      indstr ++;
    }
    else
    {
      colstr[indstr] = false;
    }
  }
}