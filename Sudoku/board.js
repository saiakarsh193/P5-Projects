class Board
{
    constructor(border_color, text_color_in, text_color_out, background_color, highlight_pri_color, highlight_sec_color)
    {
        this.cell_width = 50;
        this.border_small_width = 2;
        this.border_big_width = 4;
        this.border_color = border_color;
        this.text_color_in = text_color_in;
        this.text_color_out = text_color_out;
        this.background_color = background_color;
        this.highlight_pri_color = highlight_pri_color;
        this.highlight_sec_color = highlight_sec_color;
        this.chunk_width = 3 * this.cell_width + 2 * this.border_small_width;
        this.total_width = 3 * this.chunk_width + 2 * this.border_big_width;
        this.main_temp = this.calcTops(0, 0, this.chunk_width, this.border_big_width);
        this.sec_temp = [];
        for(let i = 1;i < this.main_temp.length;i ++)
        {
            this.sec_temp.push(this.calcTops(this.main_temp[i][0] + this.chunk_width / 2, this.main_temp[i][1] + this.chunk_width / 2, this.cell_width, this.border_small_width));
        }

        this.hidden_states = this.makeSudoku();
        this.open_states = this.selectInitial(this.hidden_states);

        this.high_cell = [-1, -1];
        this.high_chunk = -1;
    }

    makeSudoku()
    {
        let temp = new Array(9).fill(0).map(() => new Array(9).fill(0));
        for(let i = 0;i < 9;i ++)
        {
            for(let j = 0;j < 9;j ++)
            {
                temp[i][j] = int(Math.random() * 9) + 1;
            }
        }
        return temp;
    }

    selectInitial(hidden)
    {
        let temp = new Array(9).fill(0).map(() => new Array(9).fill(0));
        for(let i = 0;i < 9;i ++)
        {
            for(let j = 0;j < 9;j ++)
            {
                temp[i][j] = hidden[i][j];
            }
        }
        temp[0][0] = 0;
        return temp;
    }

    calcTops(center_x, center_y, cell, border)
    {
        let points = [
            [center_x - (cell / 2) - border - cell - border, center_y - (cell / 2) - border - cell - border, 3 * cell + 4 * border],
            [center_x - (cell / 2) - border - cell, center_y - (cell / 2) - border - cell],
            [center_x - (cell / 2), center_y - (cell / 2) - border - cell],
            [center_x + (cell / 2) + border, center_y - (cell / 2) - border - cell],
            [center_x - (cell / 2) - border - cell, center_y - (cell / 2)],
            [center_x - (cell / 2), center_y - (cell / 2)],
            [center_x + (cell / 2) + border, center_y - (cell / 2)],
            [center_x - (cell / 2) - border - cell, center_y + (cell / 2) + border],
            [center_x - (cell / 2), center_y + (cell / 2) + border],
            [center_x + (cell / 2) + border, center_y + (cell / 2) + border],
        ];
        return points;
    }

    posToCord(i, j)
    {
        return [Math.floor((i - 1) / 3) * 3 + Math.floor((j - 1) / 3), ((i - 1) % 3) * 3 + ((j - 1) % 3)];
    }

    draw()
    {
        noStroke();
        fill(this.border_color);
        square(this.main_temp[0][0], this.main_temp[0][1], this.main_temp[0][2]);
        textAlign(CENTER, CENTER);
        textSize(25);
        for(let i = 1;i < this.main_temp.length;i ++)
        {
            for(let j = 1;j < this.sec_temp[i - 1].length;j ++)
            {
                let cord = this.posToCord(i, j);
                if(this.high_cell[0] == cord[0] && this.high_cell[1] == cord[1])
                    fill(this.highlight_pri_color);
                else if(this.high_cell[0] == cord[0] || this.high_cell[1] == cord[1] || i == this.high_chunk)
                    fill(this.highlight_sec_color);
                else
                    fill(this.background_color);
                square(this.sec_temp[i - 1][j][0], this.sec_temp[i - 1][j][1], this.cell_width);
                if(this.open_states[cord[0]][cord[1]] != 0)
                {
                    fill(this.text_color_in);
                    text(this.open_states[cord[0]][cord[1]], this.sec_temp[i - 1][j][0] + (this.cell_width / 2), this.sec_temp[i - 1][j][1] + (this.cell_width / 2));
                }
                
            }
        }
    }

    click(x, y)
    {
        if(x >= this.main_temp[0][0] && x < (this.main_temp[0][0] + this.main_temp[0][2]) && y >= this.main_temp[0][1] && y < (this.main_temp[0][1] + this.main_temp[0][2]))
        {
            for(let i = 1;i < this.main_temp.length;i ++)
            {
                for(let j = 1;j < this.sec_temp[i - 1].length;j ++)
                {
                    if(x >= this.sec_temp[i - 1][j][0] && x < (this.sec_temp[i - 1][j][0] + this.cell_width) && y >= this.sec_temp[i - 1][j][1] && y < (this.sec_temp[i - 1][j][1] + this.cell_width))
                    {
                        this.high_cell = this.posToCord(i, j);
                        this.high_chunk = i;
                    }
                }
            }
        }
    }
}