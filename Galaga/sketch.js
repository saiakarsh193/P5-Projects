let cx, cy;
let player;
let bullets = [];
let mobs = [];
let params = {
    rows: 160,
    columns: 300,
    pixel_size: 6,
    translate_x_offset: 50,
    translate_y_offset: 50,
    enable_grid: false,
    enable_vertical_move: false,
    enable_double_bullets: true,
};
let ctime = 0;

function setup()
{
    createCanvas(1900, 1060);
    params.color_palette = {
        '!':    color(  0,   0,   0), // black (background)
        'r':    color(255,   0,   0), // red
        'o':    color(222,  71,   0), // orange
        'g':    color(  0, 255,   0), // green
        's':    color(  0, 151, 151), // sea-green
        'b':    color(  0, 104, 222), // blue
        '^':    color(  0,   0, 222), // dark blue
        'c':    color(  0, 255, 222), // cyan
        'p':    color(255,   0, 222), // pink
        'v':    color(151,   0, 222), // violet
        'y':    color(255, 255,   0), // yellow
        'd':    color(255, 184,   0), // gold
        'w':    color(222, 222, 222), // white
        '@':    color(184, 184, 222), // gray
    };
    player = new Rocket(params);
    mobs.push(new Mob(0, 0, params));
}

function draw()
{
    background(params.color_palette['!']);
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
    mobs.forEach((mob) => mob.render());
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
