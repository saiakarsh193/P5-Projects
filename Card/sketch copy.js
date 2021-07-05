let cx, cy;
let heart_image;
let tile_image;
let clover_image;
let pike_image;
let cards = [];
let selected_id;

class card
{
  // Hearts, Tiles, Clovers, Pikes
  constructor(value, type, px=0, py=0)
  {
    this.value = value;
    this.type = type;
    this.id = this.value + this.type;
    if(this.type == "H" || this.type == "T")
      this.color = color(215, 0, 0);
    else
      this.color = color(0, 0, 0);
    if(this.type == "H")
      this.image = heart_image;
    else if(this.type == "T")
      this.image = tile_image;
    else if(this.type == "C")
      this.image = clover_image;
    else
      this.image = pike_image;
    this.height = 72;
    this.width = 50;
    this.smoothness = 5;
    this.idx = 27;
    this.idy = 5;
    this.iw = 20;
    this.ih = 20;
    this.tdx = 5;
    this.tdy = 5;
    this.px = px;
    this.py = py;
  }

  draw(px=this.px, py=this.py)
  {
    if(this.id == selected_id)
      stroke(255, 255, 0);
    else
      stroke(0);
    strokeWeight(2);
    fill(255);
    rect(px, py, this.width, this.height, this.smoothness);
    image(this.image, px + this.idx, py + this.idy, this.iw, this.ih);
    fill(this.color);
    stroke(this.color);
    strokeWeight(1);
    textSize(20);
    textAlign(LEFT, TOP);
    text(this.value, px + this.tdx, py + this.tdy);
  }
}

function setup()
{
  createCanvas(1200, 680);

  cx = width / 2;
  cy = height / 2;

  heart_image = loadImage('symbols/heart.jpg');
  tile_image = loadImage('symbols/tile.jpg');
  clover_image = loadImage('symbols/clover.jpg');
  pike_image = loadImage('symbols/pike.jpg');
  cards = newDeck();
  cards = shuffleDeck(cards);
  setPosition(cards, -400, 0, 20, 0);
  cards = cards.slice(0, 10);
}

function newDeck()
{
  let tempcards = [];
  tempcards.push(new card("A", "H"));
  tempcards.push(new card("2", "H"));
  tempcards.push(new card("3", "H"));
  tempcards.push(new card("4", "H"));
  tempcards.push(new card("5", "H"));
  tempcards.push(new card("6", "H"));
  tempcards.push(new card("7", "H"));
  tempcards.push(new card("8", "H"));
  tempcards.push(new card("9", "H"));
  tempcards.push(new card("10", "H"));
  tempcards.push(new card("J", "H"));
  tempcards.push(new card("Q", "H"));
  tempcards.push(new card("K", "H"));

  tempcards.push(new card("A", "T"));
  tempcards.push(new card("2", "T"));
  tempcards.push(new card("3", "T"));
  tempcards.push(new card("4", "T"));
  tempcards.push(new card("5", "T"));
  tempcards.push(new card("6", "T"));
  tempcards.push(new card("7", "T"));
  tempcards.push(new card("8", "T"));
  tempcards.push(new card("9", "T"));
  tempcards.push(new card("10", "T"));
  tempcards.push(new card("J", "T"));
  tempcards.push(new card("Q", "T"));
  tempcards.push(new card("K", "T"));

  tempcards.push(new card("A", "C"));
  tempcards.push(new card("2", "C"));
  tempcards.push(new card("3", "C"));
  tempcards.push(new card("4", "C"));
  tempcards.push(new card("5", "C"));
  tempcards.push(new card("6", "C"));
  tempcards.push(new card("7", "C"));
  tempcards.push(new card("8", "C"));
  tempcards.push(new card("9", "C"));
  tempcards.push(new card("10", "C"));
  tempcards.push(new card("J", "C"));
  tempcards.push(new card("Q", "C"));
  tempcards.push(new card("K", "C"));

  tempcards.push(new card("A", "P"));
  tempcards.push(new card("2", "P"));
  tempcards.push(new card("3", "P"));
  tempcards.push(new card("4", "P"));
  tempcards.push(new card("5", "P"));
  tempcards.push(new card("6", "P"));
  tempcards.push(new card("7", "P"));
  tempcards.push(new card("8", "P"));
  tempcards.push(new card("9", "P"));
  tempcards.push(new card("10", "P"));
  tempcards.push(new card("J", "P"));
  tempcards.push(new card("Q", "P"));
  tempcards.push(new card("K", "P"));
  return tempcards;
}

function shuffleDeck(array)
{
  var currentIndex = array.length, randomIndex;
  while (0 !== currentIndex)
  {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex --;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function draw()
{
  background(0, 160, 0);
  translate(cx, cy);
  drawSet(cards);
}

function drawSet(set)
{
  set.forEach((c, index) =>
  {
    c.draw();
  });
}

function setPosition(set, sx, sy, dx, dy)
{
  set.forEach((c, index) =>
  {
    c.px = sx + index * dx;
    c.py = sy + index * dy;
  });
}

function mousePressed()
{
  mouseX -= cx;
  mouseY -= cy;
  let new_id = "";
  cards.forEach((c) =>
  {
    if(mouseX >= c.px && mouseX <= c.px + c.width && mouseY >= c.py && mouseY <= c.py + c.height)
    {
      new_id = c.id;
    }
  });
  if(new_id == selected_id)
    selected_id = "";
  else
    selected_id = new_id;
}