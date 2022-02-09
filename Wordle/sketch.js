let cx, cy;
let wordle_matrix;
let color_pack;
let color_cur;
let sx = -250;
let sy = -300;
let ss = 90;
let sd = 10;
let target;
let gameChk = false;
let aleMess = "";

let cur_row = 0;
let cur_col = 0;

function setup()
{
  createCanvas(1600, 900);

  cx = width / 2;
  cy = height / 2;
  color_pack = {
    "default": {
      "primary-main": color(100, 100, 100),
      "primary-back": color(255, 255, 255),
      "not-main"    : color(255, 255, 255),
      "not-back"    : color(100, 100, 100),
      "maybe-main"  : color(255, 255, 255),
      "maybe-back"  : color(206, 209,   0),
      "perfect-main": color(255, 255, 255),
      "perfect-back": color( 41, 179,  11)
    }
  };
  wordle_matrix = new Array(6).fill(0).map(() => new Array(5).fill(' '));
  color_cur = "default";
  target = "helio";
}

function draw()
{
  background(color_pack[color_cur]["primary-back"]);
  translate(cx, cy);
  // title
  strokeWeight(2);
  textSize(81);
  textAlign(CENTER, BOTTOM);
  fill(color_pack[color_cur]["primary-main"]);
  stroke(color_pack[color_cur]["primary-main"]);
  text("Wordle", 0, sy - 30);
  // alert message
  textSize(44);
  textAlign(CENTER, TOP);
  fill(color_pack[color_cur]["primary-main"]);
  stroke(color_pack[color_cur]["primary-main"]);
  text(aleMess, 0, sy + (ss + sd) * 6 + 30);
  // tiles
  textSize(64);
  textAlign(CENTER, CENTER);
  for(let row = 0;row < 6;row ++)
  {
    for(let col = 0;col < 5;col ++)
    {
      if(wordle_matrix[row][col] != ' ')
      {
        let ttp = getCat(wordle_matrix[row][col], row, col);
        fill(color_pack[color_cur][ttp + "-back"]);
        if(ttp == "primary")
          stroke(color_pack[color_cur][ttp + "-main"]);
        else
          stroke(color_pack[color_cur][ttp + "-back"]);
        square(sx + col * (ss + sd), sy + row * (ss + sd), ss, 10);
        fill(color_pack[color_cur][ttp + "-main"]);
        stroke(color_pack[color_cur][ttp + "-main"]);
        text(wordle_matrix[row][col].toUpperCase(), sx + col * (ss + sd) + (ss / 2), sy + row * (ss + sd) + (ss / 2));
      }
      else
      {
        fill(color_pack[color_cur]["primary-back"]);
        stroke(color_pack[color_cur]["primary-main"]);
        square(sx + col * (ss + sd), sy + row * (ss + sd), ss, 10);
      }
    }
  }
  noLoop();
}

function getCat(letter, row, col)
{
  if(row >= cur_row)
    return "primary";
  let ttp = "";
  for(let i = 0;i < target.length;i ++)
  {
    if(letter == target[i])
    {
      if(col == i)
        ttp = "perfect";
      else if(ttp != "perfect")
        ttp = "maybe";
    }
  }
  if(ttp == "")
    ttp = "not";
  return ttp;
}

function isValidWord(word)
{
  for(let i = 0;i < t_total.length;i ++)
  {
    if(t_total[i] == word)
      return true
  }
  return false;
}

function keyPressed()
{
  let tch = key.toLowerCase();
  if(gameChk)
    return;
  aleMess = "";
  if(tch == 'enter')
  {
    if(cur_row < 6 && cur_col == 5)
    {
      let word = wordle_matrix[cur_row].join("");
      if(isValidWord(word))
      {
        cur_row ++;
        cur_col = 0;
        if(word == target)
        {
          aleMess = "You got it :)";
          gameChk = true;
        }
        else if(cur_row == 6)
        {
          aleMess = "Better luck next time :(";
          gameChk = true;
        }
      }
      else
        aleMess = "Invalid word!";
    }
  }
  else if(tch == 'backspace')
  {
    if(cur_row < 6 && cur_col > 0)
    {
      wordle_matrix[cur_row][cur_col - 1] = ' ';
      cur_col --;
    }
  }
  else if('a' <= tch && tch <= 'z' && tch.length == 1)
  {
    if(cur_row < 6 && cur_col < 5)
    {
      wordle_matrix[cur_row][cur_col] = tch;
      cur_col ++;
    }
  }
  loop();
}