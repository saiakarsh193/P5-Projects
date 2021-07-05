let cx, cy;
let heart_image;
let tile_image;
let clover_image;
let pike_image;
let selected_id;
let cards = [];

let player1;
let player2;
let player3;
let leftset;

class card
{
  // Hearts, Tiles, Clovers, Pikes
  constructor(value, type, px=0, py=0)
  {
    this.value = value;
    this.type = type;
    this.id = this.value + this.type;
    if(this.type == "H" || this.type == "T")
      this.color = color(222, 46, 66);
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

class cardCollection
{
  constructor(set, px, py, width, height)
  {
    this.set = set;
    this.width = width;
    this.height = height;
    this.setPosition(px, py);
  }

  setPosition(px, py)
  {
    this.px = px;
    this.py = py;
    let dx = this.width / this.set.length;
    let dy = this.height / this.set.length;
    this.set.forEach((c, index) =>
    {
      c.px = this.px + index * dx;
      c.py = this.py + index * dy;
    });
  }

  resetPosition()
  {
    let dx = this.width / this.set.length;
    let dy = this.height / this.set.length;
    this.set.forEach((c, index) =>
    {
      c.px = this.px + index * dx;
      c.py = this.py + index * dy;
    });
  }

  draw()
  {
    this.set.forEach((c) =>
    {
      c.draw();
    });
  }
}

function setup()
{
  createCanvas(1200, 680);
  frameRate(10);

  cx = width / 2;
  cy = height / 2;

  heart_image = loadImage('symbols/heart.jpg');
  tile_image = loadImage('symbols/tile.jpg');
  clover_image = loadImage('symbols/clover.jpg');
  pike_image = loadImage('symbols/pike.jpg');
  cards = newDeck();
  cards = shuffleDeck(cards);
  player1 = new cardCollection(cards.slice(0, 3), -400, 100, 160, 0);
  player2 = new cardCollection(cards.slice(3, 6), -80, 100, 160, 0);
  player3 = new cardCollection(cards.slice(6, 9), 240, 100, 160, 0);
  leftset = new cardCollection(cards.slice(9, 52), -200, -100, 100, 0);
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
  player1.draw();
  player2.draw();
  player3.draw();
  leftset.draw();
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