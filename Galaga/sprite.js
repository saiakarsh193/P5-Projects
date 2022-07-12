class Sprite
{
    constructor(sprite_name, params, start_index=0)
    {
        this.sprite_name = sprite_name;
        this.frames = convertRawSpriteToFrames(sprite_raw_values[sprite_name]);
        this.frame_count = this.frames.length;
        this.updateFrame(start_index);
        this.params = params;
    }

    updateFrame(new_index)
    {
        this.frame_index = new_index;
        this.frame_rows = this.frames[this.frame_index].length;
        this.frame_columns = this.frames[this.frame_index][0].length;
    }

    render()
    {
        noStroke();
        for(var i = 0;i < this.frame_rows;i ++)
        {
            for(var j = 0;j < this.frame_columns;j ++)
            {
                if(this.frames[this.frame_index][i][j] != '.')
                {
                    fill(this.params.color_palette[this.frames[this.frame_index][i][j]]);
                    square(this.params.pixel_size * (this.x + j), this.params.pixel_size * (this.y + i), this.params.pixel_size);
                }
            }
        }
    }
}

function convertRawSpriteToFrames(rspr)
{
    let fcount = rspr[0].split(" ").length;
    let frames = new Array(fcount).fill(0).map(() => []);
    for(let i = 0;i < rspr.length;i ++)
    {
        let tmp = rspr[i].split(" ");
        for(let j = 0;j < fcount;j ++)
            frames[j].push(tmp[j]);
    }
    return frames;
}
