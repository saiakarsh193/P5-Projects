class Sprite
{
    constructor(smap, params)
    {
        this.smap = smap;
        this.smap_rows = this.smap.length;
        this.smap_columns = this.smap[0].length;
        for(var i = 1;i < this.smap_rows;i ++)
        {
            if(this.smap[i].length != this.smap_columns)
                alert("ERROR: Invalid sprite map shape");
        }
        this.params = params;
    }

    render()
    {
        noStroke();
        for(var i = 0;i < this.smap_rows;i ++)
        {
            for(var j = 0;j < this.smap_columns;j ++)
            {
                if(this.smap[i][j] != '.')
                {
                    fill(this.params.color_palette[this.smap[i][j]]);
                    square(this.params.pixel_size * (this.x + j), this.params.pixel_size * (this.y + i), this.params.pixel_size);
                }
            }
        }
    }
}

