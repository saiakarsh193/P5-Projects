class Cube
{
  constructor()
  {
    this.sx = -50;    // Cube Orientation
    this.sy = -50;    //     5
    this.sw = 30;     //   3 0 1 2
    this.ofst = 20;   //     4
    this.orientation = [[5, 1, 4, 3], [5, 2, 4, 0], [5, 3, 4, 1], [5, 0, 4, 2], [0, 1, 2, 3], [2, 1, 0, 3]];
    this.rotmap = [[[2, 0], [2, 1], [2, 2], [0, 0], [1, 0], [2, 0], [0, 2], [0, 1], [0, 0], [2, 2], [1, 2], [0, 2]], [[2, 2], [1, 2], [0, 2], [0, 0], [1, 0], [2, 0], [2, 2], [1, 2], [0, 2], [2, 2], [1, 2], [0, 2]], [[0, 2], [0, 1], [0, 0], [0, 0], [1, 0], [2, 0], [2, 0], [2, 1], [2, 2], [2, 2], [1, 2], [0, 2]], [[0, 0], [1, 0], [2, 0], [0, 0], [1, 0], [2, 0], [0, 0], [1, 0], [2, 0], [2, 2], [1, 2], [0, 2]], [[2, 0], [2, 1], [2, 2], [2, 0], [2, 1], [2, 2], [2, 0], [2, 1], [2, 2], [2, 0], [2, 1], [2, 2]], [[0, 2], [0, 1], [0, 0], [0, 2], [0, 1], [0, 0], [0, 2], [0, 1], [0, 0], [0, 2], [0, 1], [0, 0]]];
    this.sideTocmap = ["G", "O", "B", "R", "W", "Y"];
    this.cTocolormap = {"G": "green", "O": "orange", "B": "blue", "R": "red", "W": "white", "Y": "yellow"};
    this.sideTooffsetmap = [[this.sx, this.sy], [this.sx + (3 * this.sw + this.ofst), this.sy], [this.sx + 2 * (3 * this.sw + this.ofst), this.sy], [this.sx - (3 * this.sw + this.ofst), this.sy], [this.sx, this.sy + (3 * this.sw + this.ofst)], [this.sx, this.sy - (3 * this.sw + this.ofst)]];
    this.setupCube();
    this.moves = [];
  }

  setupCube()
  {
    this.cube = new Array(6).fill(0).map(() => new Array(3).fill(0).map(() => new Array(3).fill("W")));
    for(let side = 0;side < 6;side ++)
    {
      for(let row = 0;row < 3; row ++)
      {
        for(let col = 0;col < 3; col ++)
          this.cube[side][row][col] = this.sideTocmap[side];
      }
    }
  }

  rotateClock(side)
  {
    let temp = [this.cube[side][0][1], this.cube[side][0][2]];
    this.cube[side][0][1] = this.cube[side][1][0];
    this.cube[side][0][2] = this.cube[side][0][0];
    this.cube[side][0][0] = this.cube[side][2][0];
    this.cube[side][1][0] = this.cube[side][2][1];
    this.cube[side][2][0] = this.cube[side][2][2];
    this.cube[side][2][1] = this.cube[side][1][2];
    this.cube[side][1][2] = temp[0];
    this.cube[side][2][2] = temp[1];
    temp = [this.cube[this.orientation[side][0]][this.rotmap[side][0][0]][this.rotmap[side][0][1]], this.cube[this.orientation[side][0]][this.rotmap[side][1][0]][this.rotmap[side][1][1]], this.cube[this.orientation[side][0]][this.rotmap[side][2][0]][this.rotmap[side][2][1]]];
    for(let i = 0;i < 3;i ++)
    {
      this.cube[this.orientation[side][0]][this.rotmap[side][0 + i][0]][this.rotmap[side][0 + i][1]] = this.cube[this.orientation[side][3]][this.rotmap[side][9 + i][0]][this.rotmap[side][9 + i][1]];
      this.cube[this.orientation[side][3]][this.rotmap[side][9 + i][0]][this.rotmap[side][9 + i][1]] = this.cube[this.orientation[side][2]][this.rotmap[side][6 + i][0]][this.rotmap[side][6 + i][1]];
      this.cube[this.orientation[side][2]][this.rotmap[side][6 + i][0]][this.rotmap[side][6 + i][1]] = this.cube[this.orientation[side][1]][this.rotmap[side][3 + i][0]][this.rotmap[side][3 + i][1]];
      this.cube[this.orientation[side][1]][this.rotmap[side][3 + i][0]][this.rotmap[side][3 + i][1]] = temp[0 + i];
    }
  }

  rotateAntiClock(side)
  {
    let temp = [this.cube[side][0][1], this.cube[side][0][2]];
    this.cube[side][0][1] = this.cube[side][1][2];
    this.cube[side][0][2] = this.cube[side][2][2];
    this.cube[side][1][2] = this.cube[side][2][1];
    this.cube[side][2][2] = this.cube[side][2][0];
    this.cube[side][2][0] = this.cube[side][0][0];
    this.cube[side][2][1] = this.cube[side][1][0];
    this.cube[side][0][0] = temp[1];
    this.cube[side][1][0] = temp[0];
    temp = [this.cube[this.orientation[side][0]][this.rotmap[side][0][0]][this.rotmap[side][0][1]], this.cube[this.orientation[side][0]][this.rotmap[side][1][0]][this.rotmap[side][1][1]], this.cube[this.orientation[side][0]][this.rotmap[side][2][0]][this.rotmap[side][2][1]]];
    for(let i = 0;i < 3;i ++)
    {
      this.cube[this.orientation[side][0]][this.rotmap[side][0 + i][0]][this.rotmap[side][0 + i][1]] = this.cube[this.orientation[side][1]][this.rotmap[side][3 + i][0]][this.rotmap[side][3 + i][1]];
      this.cube[this.orientation[side][1]][this.rotmap[side][3 + i][0]][this.rotmap[side][3 + i][1]] = this.cube[this.orientation[side][2]][this.rotmap[side][6 + i][0]][this.rotmap[side][6 + i][1]];
      this.cube[this.orientation[side][2]][this.rotmap[side][6 + i][0]][this.rotmap[side][6 + i][1]] = this.cube[this.orientation[side][3]][this.rotmap[side][9 + i][0]][this.rotmap[side][9 + i][1]];
      this.cube[this.orientation[side][3]][this.rotmap[side][9 + i][0]][this.rotmap[side][9 + i][1]] = temp[0 + i];
    }
  }

  rotateMidClock(type)
  {
    if(type == 'E')
    {
      let temp = [this.cube[0][1][0], this.cube[0][1][1], this.cube[0][1][2]];
      for(let i = 0;i < 3;i ++)
      {
        this.cube[0][1][0 + i] = this.cube[3][1][0 + i];
        this.cube[3][1][0 + i] = this.cube[2][1][0 + i];
        this.cube[2][1][0 + i] = this.cube[1][1][0 + i];
        this.cube[1][1][0 + i] = temp[0 + i];
      }
    }
    else if(type == 'M')
    {
      let temp = [this.cube[0][0][1], this.cube[0][1][1], this.cube[0][2][1]];
      for(let i = 0;i < 3;i ++)
      {
        this.cube[0][0 + i][1] = this.cube[5][0 + i][1];
        this.cube[5][0 + i][1] = this.cube[2][2 - i][1];
        this.cube[2][2 - i][1] = this.cube[4][0 + i][1];
        this.cube[4][0 + i][1] = temp[0 + i];
      }
    }
    else if(type == 'S')
    {
      let temp = [this.cube[5][1][0], this.cube[5][1][1], this.cube[5][1][2]];
      for(let i = 0;i < 3;i ++)
      {
        this.cube[5][1][0 + i] = this.cube[3][2 - i][1];
        this.cube[3][2 - i][1] = this.cube[4][1][2 - i];
        this.cube[4][1][2 - i] = this.cube[1][0 + i][1];
        this.cube[1][0 + i][1] = temp[0 + i];
      }
    }
  }

  rotateMidAntiClock(type)
  {
    if(type == 'E')
    {
      let temp = [this.cube[0][1][0], this.cube[0][1][1], this.cube[0][1][2]];
      for(let i = 0;i < 3;i ++)
      {
        this.cube[0][1][0 + i] = this.cube[1][1][0 + i];
        this.cube[1][1][0 + i] = this.cube[2][1][0 + i];
        this.cube[2][1][0 + i] = this.cube[3][1][0 + i];
        this.cube[3][1][0 + i] = temp[0 + i];
      }
    }
    else if(type == 'M')
    {
      let temp = [this.cube[0][0][1], this.cube[0][1][1], this.cube[0][2][1]];
      for(let i = 0;i < 3;i ++)
      {
        this.cube[0][0 + i][1] = this.cube[4][0 + i][1];
        this.cube[4][0 + i][1] = this.cube[2][2 - i][1];
        this.cube[2][2 - i][1] = this.cube[5][0 + i][1];
        this.cube[5][0 + i][1] = temp[0 + i];
      }
    }
    else if(type == 'S')
    {
      let temp = [this.cube[5][1][0], this.cube[5][1][1], this.cube[5][1][2]];
      for(let i = 0;i < 3;i ++)
      {
        this.cube[5][1][0 + i] = this.cube[1][0 + i][1];
        this.cube[1][0 + i][1] = this.cube[4][1][2 - i];
        this.cube[4][1][2 - i] = this.cube[3][2 - i][1];
        this.cube[3][2 - i][1] = temp[0 + i];
      }
    }
  }

  move(type)
  {
    if(type == 'U')
      this.rotateClock(5);
    else if(type == 'UP')
      this.rotateAntiClock(5);
    else if(type == 'D')
      this.rotateClock(4);
    else if(type == 'DP')
      this.rotateAntiClock(4);
    else if(type == 'R')
      this.rotateClock(1);
    else if(type == 'RP')
      this.rotateAntiClock(1);
    else if(type == 'L')
      this.rotateClock(3);
    else if(type == 'LP')
      this.rotateAntiClock(3);
    else if(type == 'F')
      this.rotateClock(0);
    else if(type == 'FP')
      this.rotateAntiClock(0);
    else if(type == 'B')
      this.rotateClock(2);
    else if(type == 'BP')
      this.rotateAntiClock(2);
    else if(type == 'E')
      this.rotateMidClock('E')
    else if(type == 'EP')
      this.rotateMidAntiClock('E')
    else if(type == 'M')
      this.rotateMidClock('M')
    else if(type == 'MP')
      this.rotateMidAntiClock('M')
    else if(type == 'S')
      this.rotateMidClock('S')
    else if(type == 'SP')
      this.rotateMidAntiClock('S')
    else if(type == 'x')
    {
      this.move('LP');
      this.move('MP');
      this.move('R');
    }
    else if(type == 'xP')
    {
      this.move('L');
      this.move('M');
      this.move('RP');
    }
    else if(type == 'y')
    {
      this.move('U');
      this.move('EP');
      this.move('DP');
    }
    else if(type == 'yP')
    {
      this.move('UP');
      this.move('E');
      this.move('D');
    }
    else if(type == 'z')
    {
      this.move('F');
      this.move('S');
      this.move('BP');
    }
    else if(type == 'zP')
    {
      this.move('FP');
      this.move('SP');
      this.move('B');
    }
    else if(type == 'u')
    {
      this.move('U');
      this.move('EP');
    }
    else if(type == 'uP')
    {
      this.move('UP');
      this.move('E');
    }
    else if(type == 'd')
    {
      this.move('D');
      this.move('E');
    }
    else if(type == 'dP')
    {
      this.move('DP');
      this.move('EP');
    }
    else if(type == 'r')
    {
      this.move('R');
      this.move('MP');
    }
    else if(type == 'rP')
    {
      this.move('RP');
      this.move('M');
    }
    else if(type == 'l')
    {
      this.move('L');
      this.move('M');
    }
    else if(type == 'lP')
    {
      this.move('LP');
      this.move('MP');
    }
    else if(type == 'f')
    {
      this.move('F');
      this.move('S');
    }
    else if(type == 'fP')
    {
      this.move('FP');
      this.move('SP');
    }
    else if(type == 'b')
    {
      this.move('B');
      this.move('SP');
    }
    else if(type == 'bP')
    {
      this.move('BP');
      this.move('S');
    }
  }

  addMoves(moves, condense = true)
  {
    moves = parseFormula(moves, condense);
    for(let i = 0;i < moves.length;i ++)
      this.moves.push(moves[i]);
  }

  getFaces()
  {
    return this.cube;
  }

  draw()
  {
    stroke(0);
    strokeWeight(2);
    for(let side = 0;side < 6;side ++)
    {
      for(let row = 0;row < 3; row ++)
      {
        for(let col = 0;col < 3; col ++)
        {
          fill(this.cTocolormap[this.cube[side][row][col]]);
          rect(this.sideTooffsetmap[side][0] + col * this.sw, this.sideTooffsetmap[side][1] + row * this.sw, this.sw, this.sw, 4);
        }
      }
    }
  }

  movesEmpty()
  {
    if(this.moves.length == 0)
      return true
    else
      return false
  }

  update()
  {
    if(this.moves.length > 0)
      this.move(this.moves.splice(0, 1));
  }

  updateAll()
  {
    while(this.moves.length > 0)
      this.move(this.moves.splice(0, 1));
  }
}