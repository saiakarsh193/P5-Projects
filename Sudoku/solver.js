class Solver
{
    constructor()
    {
        this.MAX_ITER = 100000;
        this.global_stop_counter = 0;
    }

    findEmptyCell(board)
    {
        for(let i = 0;i < 9;i ++)
        {
            for(let j = 0;j < 9;j ++)
            {
                if(board[i][j] == 0)
                    return [i, j];
            }
        }
        return null;
    }

    validPos(board, target, position)
    {
        for(let i = 0;i < 9;i ++)
        {
            if(board[position[0]][position[1]] == target && position[1] != i)
                return false;
        }

        for(let i = 0;i < 9;i ++)
        {
            
        }
    }

    solve(board)
    {
        let position = this.findEmptyCell(board);
        if(!Boolean(position))
            return true;
        for(let i = 1;i <= 9;i ++)
        {
            if(this.validPos(board, i, position))
            {
                board[position[0]][position[1]] = i;
                if(this.solve(board))
                    return true;
                board[position[0]][position[1]] = 0;
            }
        }
        return false;
    }
}

board = [
    [7, 8, 0, 4, 0, 0, 1, 2, 0],
    [6, 0, 0, 0, 7, 5, 0, 0, 9],
    [0, 0, 0, 6, 0, 1, 0, 7, 8],
    [0, 0, 7, 0, 4, 0, 2, 6, 0],
    [0, 0, 1, 0, 5, 0, 9, 3, 0],
    [9, 0, 4, 0, 6, 0, 0, 0, 5],
    [0, 7, 0, 3, 0, 0, 0, 1, 2],
    [1, 2, 0, 0, 0, 7, 4, 0, 0],
    [0, 4, 9, 2, 0, 6, 0, 0, 7]
];

sol = new Solver();
sol.solve(board);
console.debug(board);