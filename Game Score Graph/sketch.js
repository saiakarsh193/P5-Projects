String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}  
 
let data;
 
function preload()
{
    data = loadJSON("data.json");
}
 
function setLineDash(list)
{
    drawingContext.setLineDash(list);
}
 
function get_player_color(mode, player = null)
{
    if (player !== null)
        randomSeed(player.hashCode());
    // return color(random(255), random(255), random(255));
        if (mode === "light")
        return color(random(200), random(200), random(200));
    return color(random(50, 255), random(50, 255), random(50, 255));
}
 
function setup()
{
    // prepare data (data -> pdata)
    let pdata = {};
    let c_players = data.players.length;
    let c_rounds = data.rounds.length;
    for (let p = 0; p < c_players; p ++)
    {
        let c_color;
        if (data.meta.use_hashed_colors)
            c_color = get_player_color(data.meta.color_mode, data.players[p]);
        else
            c_color = get_player_color(data.meta.color_mode, null);
        pdata[data.players[p]] = {"color": c_color, "cum_score": [0]};
    }
    for (let r = 0; r < c_rounds; r ++)
    {
        for (let p = 0; p < c_players; p ++)
            pdata[data.players[p]].cum_score.push(data.rounds[r][p]);
    }
    for (var player in pdata)
    {
        for (let i = 1; i < pdata[player].cum_score.length; i ++)
            pdata[player].cum_score[i] += pdata[player].cum_score[i - 1];
    }
    // print(pdata);
 
    // predefined color pallete
    let color_pallete = {
        "light": {
            "background": color(255),
            "primary": color(0),
            "grid": color(150)
        },
        "dark": {
            "background": color(0),
            "primary": color(255),
            "grid": color(100)
        }
    }
 
    createCanvas(data.meta.screen_width, data.meta.screen_height);
    background(color_pallete[data.meta.color_mode].background);
    translate(data.meta.screen_width / 2, data.meta.screen_height / 2);
 
    // title
    if (data.meta.use_title)
    {
        noStroke();
        fill(color_pallete[data.meta.color_mode].primary);
        textSize(40);
        textAlign(CENTER, BOTTOM);
        text(data.meta.title, 0, -data.meta.graph_height / 2 - textAscent() / 2);
    }
 
    // X axis
    if (data.meta.show_x_axis)
    {
        setLineDash([5, 5]);
        textSize(20);
        textAlign(CENTER, TOP);
        for (let r = 0; r <= c_rounds; r ++)
        {
            let cur_x = map(r, 0, c_rounds, -data.meta.graph_width / 2, data.meta.graph_width / 2);
            fill(color_pallete[data.meta.color_mode].primary);
            noStroke();
            text(r, cur_x, data.meta.graph_height / 2 + 10);
            if (data.meta.show_grid)
            {
                stroke(color_pallete[data.meta.color_mode].grid);
                line(cur_x, -data.meta.graph_height / 2, cur_x, data.meta.graph_height / 2);
            }
        }
        setLineDash([1]);
    }
 
    // Y axis
    if (data.meta.show_y_axis)
    {
        setLineDash([5, 5]);
        textSize(20);
        textAlign(RIGHT, CENTER);
        for (let sc = 0; sc <= data.meta.max_score; sc += data.meta.score_partition)
        {
            let cur_y = map(sc, 0, data.meta.max_score, data.meta.graph_height / 2, -data.meta.graph_height / 2);
            fill(color_pallete[data.meta.color_mode].primary);
            noStroke();
            text(sc, -data.meta.graph_width / 2 - 10, cur_y);
            if (data.meta.show_grid)
            {
                stroke(color_pallete[data.meta.color_mode].grid);
                line(-data.meta.graph_width / 2, cur_y, data.meta.graph_width / 2, cur_y);
            }
        }
        setLineDash([1]);
    }
 
    // legend
    if (data.meta.show_legend)
    {
        textAlign(LEFT, CENTER);
        let cur_i = 0;
        for (var player in pdata)
        {
            let cur_y = -data.meta.graph_height / 2 + cur_i * textAscent() * 2;
            noStroke();
            fill(pdata[player].color);
            circle(data.meta.graph_width / 2 + 20, cur_y + 10, 20);
            fill(color_pallete[data.meta.color_mode].primary);
            noStroke();
            text(player, data.meta.graph_width / 2 + 40, cur_y + 10);
            cur_i += 1;
        }
    }
 
    // boundary box
    if (data.meta.show_boundary)
    {
        noFill();
        stroke(color_pallete[data.meta.color_mode].primary);
        strokeWeight(2);
        rectMode(CENTER);
        rect(0, 0, data.meta.graph_width, data.meta.graph_height);
        rectMode(CORNER);
    }
 
    // graph
    if (data.meta.show_graph)
    {
        textSize(14);
        textAlign(RIGHT, BOTTOM);
        for (var player in pdata)
        {
            for (let r = 1; r < pdata[player].cum_score.length; r ++)
            {
                let cur_x = map(r, 0, c_rounds, -data.meta.graph_width / 2, data.meta.graph_width / 2);
                let cur_y = map(pdata[player].cum_score[r], 0, data.meta.max_score, data.meta.graph_height / 2, -data.meta.graph_height / 2);
                let prev_x = map(r - 1, 0, c_rounds, -data.meta.graph_width / 2, data.meta.graph_width / 2);
                let prev_y = map(pdata[player].cum_score[r - 1], 0, data.meta.max_score, data.meta.graph_height / 2, -data.meta.graph_height / 2);
                strokeWeight(4);
                fill(pdata[player].color);
                stroke(pdata[player].color);
                line(prev_x, prev_y, cur_x, cur_y);
                if (data.meta.show_graph_dot)
                    circle(cur_x, cur_y, 7);
                if (r === c_rounds && data.meta.show_graph_player_name)
                {
                    noStroke();
                    text(player + "(" + pdata[player].cum_score[pdata[player].cum_score.length - 1] + ")", cur_x, cur_y);
                }
            }
        }
    }
}
