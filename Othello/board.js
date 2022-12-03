class Board
{
    constructor(size=8)
    {
        this.start_x = 50;
        this.start_y = 50;
        this.board_size = 500;
        this.grid_size = size;
        this.cell_size = this.board_size / this.grid_size;
        this.disc_diameter = this.cell_size * 0.8;

        this.grid = new Array(this.grid_size).fill(0).map(() => new Array(this.grid_size).fill('N'));
        this.turn = 'B';

        this.grid[int(this.grid_size / 2) - 1][int(this.grid_size / 2) - 1] = 'W';
        this.grid[int(this.grid_size / 2) - 1][int(this.grid_size / 2)    ] = 'B';
        this.grid[int(this.grid_size / 2)    ][int(this.grid_size / 2) - 1] = 'B';
        this.grid[int(this.grid_size / 2)    ][int(this.grid_size / 2)    ] = 'W';

        this.color_pallete = {
            'green': color(70, 144, 105),
            'grey': color(18, 26, 25),
            'white': color(240, 240, 240),
        }

        this.updateValidPositions();
    }

    indexToTopLeft(row, column)
    {
        return [this.start_y + (this.cell_size * column), this.start_x + (this.cell_size * row)];
    }

    indexToCentre(row, column)
    {
        let tl = this.indexToTopLeft(row, column);
        return [tl[0] + (this.cell_size / 2), tl[1] + (this.cell_size / 2)];
    }

    draw()
    {
        stroke('black');
        strokeWeight(0.5);
        for(var row = 0;row < this.grid_size;row ++)
        {
            for(var col = 0;col < this.grid_size;col ++)
            {
                // square
                let tl = this.indexToTopLeft(row, col);
                fill(this.color_pallete.green);
                square(tl[0], tl[1], this.cell_size);

                // disc
                let cen = this.indexToCentre(row, col);
                if(this.grid[row][col] == 'W')
                {
                    fill(this.color_pallete.white);
                    circle(cen[0], cen[1], this.disc_diameter);
                }
                else if(this.grid[row][col] == 'B')
                {
                    fill(this.color_pallete.grey);
                    circle(cen[0], cen[1], this.disc_diameter);
                }
                // continue;
                // valid position
                if(this.isIndexValid(row, col))
                {
                    noFill();
                    circle(cen[0], cen[1], this.disc_diameter);
                }
            }
        }
        return;
        stroke(0);
        strokeWeight(3);
        noFill();
        for(var row = 0;row < this.grid_size;row += 2)
        {
            for(var col = 0;col < this.grid_size;col += 2)
            {
                let tl = this.indexToTopLeft(row, col);
                square(tl[0], tl[1], this.cell_size * 2);
            }
        }
    }

    _getIterable(start, end)
    {
        let diff0 = end[0] - start[0];
        let diff1 = end[1] - start[1];
        let count = max(abs(diff0), abs(diff1));
        let del0 = diff0 / count;
        let del1 = diff1 / count;
        let iter = [[start[0], start[1]]];
        for(var i = 1;i <= count;i ++)
            iter.push([start[0] + i * del0, start[1] + i * del1]);
        return iter;
    }

    _getValidPositions(iter)
    {
        let lastcur = -1;
        let lastopp = -1;
        for(var i = 0;i < iter.length;i ++)
        {
            var cur = this.grid[iter[i][0]][iter[i][1]];
            if(cur == 'N')
            {
                if(lastcur != -1 && lastopp != -1)
                    this.valid_positions.push([iter[i], iter[lastcur]]);
                lastcur = -1;
                lastopp = -1;
            }
            else if(this.turn == cur)
            {
                lastcur = i;
                lastopp = -1;
            }
            else
                lastopp = i;
        }
    }

    updateValidPositions()
    {
        this.valid_positions = [];
        // horizontal
        for(let i = 0;i < this.grid_size;i ++)
        {
            this._getValidPositions(this._getIterable([i, 0], [i, this.grid_size - 1]));
            this._getValidPositions(this._getIterable([i, this.grid_size - 1], [i, 0]));
        }
        
        // vertical
        for(let i = 0;i < this.grid_size;i ++)
        {
            this._getValidPositions(this._getIterable([0, i], [this.grid_size - 1, i]));        
            this._getValidPositions(this._getIterable([this.grid_size - 1, i], [0, i]));
        }

        // diagonal topleft to bottomright
        for(let i = 0;i < this.grid_size;i ++)
        {
            this._getValidPositions(this._getIterable([this.grid_size - 1 - i, 0], [this.grid_size - 1, i]));
            this._getValidPositions(this._getIterable([this.grid_size - 1, i], [this.grid_size - 1 - i, 0]));
        }
        for(let i = 1;i < this.grid_size;i ++)
        {
            this._getValidPositions(this._getIterable([0, i], [this.grid_size - 1 - i, this.grid_size - 1]));
            this._getValidPositions(this._getIterable([this.grid_size - 1 - i, this.grid_size - 1], [0, i]));
        }

        // diagonal bottomleft to topright
        for(let i = 0;i < this.grid_size;i ++)
        {
            this._getValidPositions(this._getIterable([i, 0], [0, i]));
            this._getValidPositions(this._getIterable([0, i], [i, 0]));
        }
        for(let i = 1;i < this.grid_size;i ++)
        {
            this._getValidPositions(this._getIterable([this.grid_size - 1, i], [i, this.grid_size - 1]));
            this._getValidPositions(this._getIterable([i, this.grid_size - 1], [this.grid_size - 1, i]));
        }
    }

    isIndexValid(row, col)
    {
        if(row == -1 || col == -1 || this.grid[row][col] != 'N')
            return false;
        let isvalid = false;
        for(let i = 0;i < this.valid_positions.length;i ++)
        {
            if(this.valid_positions[i][0][0] == row && this.valid_positions[i][0][1] == col)
            {
                isvalid = true;
                break;
            }
        }
        return isvalid;
    }

    flipDiscs(row, col)
    {
        let target = 'B';
        if(this.turn == 'W')
            target = 'W';
        for(let i = 0;i < this.valid_positions.length;i ++)
        {
            if(this.valid_positions[i][0][0] == row && this.valid_positions[i][0][1] == col)
            {
                let citer = this._getIterable(this.valid_positions[i][0], this.valid_positions[i][1]);
                for(let j = 0;j < citer.length;j ++)
                    this.grid[citer[j][0]][citer[j][1]] = target;
            }
        }
    }

    mousePositionToIndex(x, y)
    {
        if(x < this.start_x || x > this.start_x + this.board_size || y < this.start_y || y > this.start_y + this.board_size)
            return [-1, -1];
        else
            return [int((y - this.start_y) / this.cell_size), int((x - this.start_x) / this.cell_size)];
    }

    _changeTurn()
    {
        if(this.turn == 'B')
            this.turn = 'W';
        else
            this.turn = 'B';
    }

    click(mx, my)
    {
        let pos = this.mousePositionToIndex(mx, my);
        if(this.isIndexValid(pos[0], pos[1]))
        {
            this.flipDiscs(pos[0], pos[1]);
            this._changeTurn();
            this.updateValidPositions();
            if(this.valid_positions.length == 0)
            {
                alert("No valid move for " + this.turn);
                this._changeTurn();
                this.updateValidPositions();
            }
        }
    }
}