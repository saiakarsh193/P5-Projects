let cx, cy;
let mainboard;

let border_color;
let text_color_in;
let text_color_out;
let background_color;
let highlight_pri_color;
let highlight_sec_color;

function setup()
{
  createCanvas(1500, 770);

  cx = width / 2;
  cy = height / 2;

  border_color        = color(120, 120, 120);
  text_color_in       = color( 50,  50,  50);
  text_color_out      = color( 28,  58, 189);
  background_color    = color(255, 255, 255);
  highlight_pri_color = color(255, 255, 150);
  highlight_sec_color = color(230, 230, 230);

  mainboard = new Board(border_color, text_color_in, text_color_out, background_color, highlight_pri_color, highlight_sec_color);
}

function draw()
{
  background(background_color);
  translate(cx, cy);
  mainboard.draw();
}

function mousePressed()
{
  mainboard.click(mouseX - cx, mouseY - cy);
}