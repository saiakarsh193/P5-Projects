let cx, cy;
let player;
let bullets = [];
let params = {
    rows: 60,
    columns: 100,
    pixel_size: 8,
    enable_grid: true,
    enable_vertical_move: false,
    translate_x_offset: 50,
    translate_y_offset: 50,
};
let ctime = 0;

function setup()
{
    createCanvas(1200, 680);
    params.color_palette = {
        'r':    color(255,   0,   0),
        'g':    color(  0, 255,   0),
        'b':    color(  0,   0, 255),
        'y':    color(255, 238, 143),
        'w':    color(255, 255, 255),
    };
    player = new Rocket(params);
}

function draw()
{
    background(0);
    translate(params.translate_x_offset, params.translate_y_offset);
    renderObjects();
    updateObjects();
    handleEvents();
}

function renderObjects()
{
    // grid
    if(params.enable_grid)
    {
        stroke(255, 255, 255, 100);
        strokeWeight(1);
        noFill();
        for(var i = 0;i <= params.rows;i ++)
            line(0, i * params.pixel_size, params.columns * params.pixel_size, i * params.pixel_size);
        for(var i = 0;i <= params.columns;i ++)
            line(i * params.pixel_size, 0, i * params.pixel_size, params.rows * params.pixel_size);
    }

    player.render();
    bullets.forEach((bullet) => bullet.render());
}

function updateObjects()
{
    bullets.forEach((bullet) => bullet.update());
    // removing obsolete (isUsed = true) bullets
    var i = bullets.length;
    while(i --)
    {
        if(bullets[i].isUsed)
            bullets.splice(i, 1);
    }
    ctime += deltaTime / 1000;
}

function handleEvents()
{
    player.handleEvents(bullets, ctime);
}
