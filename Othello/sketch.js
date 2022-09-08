let board;

function setup()
{
    createCanvas(1200, 680);
    board = new Board();
}

function draw()
{
    background(200);
    board.draw();
}

function mousePressed()
{
    board.click(mouseX, mouseY);
}