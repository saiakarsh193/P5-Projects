class Cube
{
  constructor(sx, sy, side)
  {
    this.sx = -50;
    this.sy = -50;
    this.sw = 30;
    this.ofst = 20;
    //   5
    // 3 0 1 2
    //   4
    this.orientation = [
        [5, 1, 4, 3],
        [5, 2, 4, 0],
        [5, 3, 4, 1],
        [5, 0, 4, 2],
        [0, 1, 2, 3],
        [2, 1, 0, 3]];
    this.rotmap = [
        [[2, 0], [2, 1], [2, 2], [0, 0], [1, 0], [2, 0], [0, 2], [0, 1], [0, 0], [2, 2], [1, 2], [0, 2]],
        [[2, 2], [1, 2], [0, 2], [0, 0], [1, 0], [2, 0], [2, 2], [1, 2], [0, 2], [2, 2], [1, 2], [0, 2]],
        [[0, 2], [0, 1], [0, 0], [0, 0], [1, 0], [2, 0], [2, 0], [2, 1], [2, 2], [2, 2], [1, 2], [0, 2]],
        [[0, 0], [1, 0], [2, 0], [0, 0], [1, 0], [2, 0], [0, 0], [1, 0], [2, 0], [2, 2], [1, 2], [0, 2]],
        [[2, 0], [2, 1], [2, 2], [2, 0], [2, 1], [2, 2], [2, 0], [2, 1], [2, 2], [2, 0], [2, 1], [2, 2]],
        [[0, 2], [0, 1], [0, 0], [0, 2], [0, 1], [0, 0], [0, 2], [0, 1], [0, 0], [0, 2], [0, 1], [0, 0]]];
    this.sideTocmap = ["G", "O", "B", "R", "W", "Y"];
    this.cTocolormap = {"G": "green", "O": "orange", "B": "blue", "R": "red", "W": "white", "Y": "yellow"};
    this.sideTooffsetmap = [[this.sx, this.sy], [this.sx + (3 * this.sw + this.ofst), this.sy], [this.sx + 2 * (3 * this.sw + this.ofst), this.sy], [this.sx - (3 * this.sw + this.ofst), this.sy], [this.sx, this.sy + (3 * this.sw + this.ofst)], [this.sx, this.sy - (3 * this.sw + this.ofst)]];
    this.setupCube();
  }

  setupCube()
  {
    this.cube = new Array(6).fill(0).map(() => new Array(3).fill(0).map(() => new Array(3).fill("W")));
    for(let side = 0;side < 6;side ++)
    {
      for(let row = 0;row < 3; row ++)
      {
        for(let col = 0;col < 3; col ++)
        {
          this.cube[side][row][col] = this.sideTocmap[side];
        }
      }
    }
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
    this.cube[this.orientation[side][0]][this.rotmap[side][0][0]][this.rotmap[side][0][1]] = this.cube[this.orientation[side][3]][this.rotmap[side][9][0]][this.rotmap[side][9][1]];
    this.cube[this.orientation[side][0]][this.rotmap[side][1][0]][this.rotmap[side][1][1]] = this.cube[this.orientation[side][3]][this.rotmap[side][10][0]][this.rotmap[side][10][1]];
    this.cube[this.orientation[side][0]][this.rotmap[side][2][0]][this.rotmap[side][2][1]] = this.cube[this.orientation[side][3]][this.rotmap[side][11][0]][this.rotmap[side][11][1]];
    this.cube[this.orientation[side][3]][this.rotmap[side][9][0]][this.rotmap[side][9][1]] = this.cube[this.orientation[side][2]][this.rotmap[side][6][0]][this.rotmap[side][6][1]];
    this.cube[this.orientation[side][3]][this.rotmap[side][10][0]][this.rotmap[side][10][1]] = this.cube[this.orientation[side][2]][this.rotmap[side][7][0]][this.rotmap[side][7][1]];
    this.cube[this.orientation[side][3]][this.rotmap[side][11][0]][this.rotmap[side][11][1]] = this.cube[this.orientation[side][2]][this.rotmap[side][8][0]][this.rotmap[side][8][1]];
    this.cube[this.orientation[side][2]][this.rotmap[side][6][0]][this.rotmap[side][6][1]] = this.cube[this.orientation[side][1]][this.rotmap[side][3][0]][this.rotmap[side][3][1]];
    this.cube[this.orientation[side][2]][this.rotmap[side][7][0]][this.rotmap[side][7][1]] = this.cube[this.orientation[side][1]][this.rotmap[side][4][0]][this.rotmap[side][4][1]];
    this.cube[this.orientation[side][2]][this.rotmap[side][8][0]][this.rotmap[side][8][1]] = this.cube[this.orientation[side][1]][this.rotmap[side][5][0]][this.rotmap[side][5][1]];
    this.cube[this.orientation[side][1]][this.rotmap[side][3][0]][this.rotmap[side][3][1]] = temp[0];
    this.cube[this.orientation[side][1]][this.rotmap[side][4][0]][this.rotmap[side][4][1]] = temp[1];
    this.cube[this.orientation[side][1]][this.rotmap[side][5][0]][this.rotmap[side][5][1]] = temp[2];
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
    this.cube[this.orientation[side][0]][this.rotmap[side][0][0]][this.rotmap[side][0][1]] = this.cube[this.orientation[side][1]][this.rotmap[side][3][0]][this.rotmap[side][3][1]];
    this.cube[this.orientation[side][0]][this.rotmap[side][1][0]][this.rotmap[side][1][1]] = this.cube[this.orientation[side][1]][this.rotmap[side][4][0]][this.rotmap[side][4][1]];
    this.cube[this.orientation[side][0]][this.rotmap[side][2][0]][this.rotmap[side][2][1]] = this.cube[this.orientation[side][1]][this.rotmap[side][5][0]][this.rotmap[side][5][1]];
    this.cube[this.orientation[side][1]][this.rotmap[side][3][0]][this.rotmap[side][3][1]] = this.cube[this.orientation[side][2]][this.rotmap[side][6][0]][this.rotmap[side][6][1]];
    this.cube[this.orientation[side][1]][this.rotmap[side][4][0]][this.rotmap[side][4][1]] = this.cube[this.orientation[side][2]][this.rotmap[side][7][0]][this.rotmap[side][7][1]];
    this.cube[this.orientation[side][1]][this.rotmap[side][5][0]][this.rotmap[side][5][1]] = this.cube[this.orientation[side][2]][this.rotmap[side][8][0]][this.rotmap[side][8][1]];
    this.cube[this.orientation[side][2]][this.rotmap[side][6][0]][this.rotmap[side][6][1]] = this.cube[this.orientation[side][3]][this.rotmap[side][9][0]][this.rotmap[side][9][1]];
    this.cube[this.orientation[side][2]][this.rotmap[side][7][0]][this.rotmap[side][7][1]] = this.cube[this.orientation[side][3]][this.rotmap[side][10][0]][this.rotmap[side][10][1]];
    this.cube[this.orientation[side][2]][this.rotmap[side][8][0]][this.rotmap[side][8][1]] = this.cube[this.orientation[side][3]][this.rotmap[side][11][0]][this.rotmap[side][11][1]];
    this.cube[this.orientation[side][3]][this.rotmap[side][9][0]][this.rotmap[side][9][1]] = temp[0];
    this.cube[this.orientation[side][3]][this.rotmap[side][10][0]][this.rotmap[side][10][1]] = temp[1];
    this.cube[this.orientation[side][3]][this.rotmap[side][11][0]][this.rotmap[side][11][1]] = temp[2];
  }

  moveU()
  {
    this.rotateClock(5);
  }

  moveUP()
  {
    this.rotateAntiClock(5);
  }

  moveD()
  {
    this.rotateClock(4);
  }

  moveDP()
  {
    this.rotateAntiClock(4);
  }

  moveR()
  {
    this.rotateClock(1);
  }

  moveRP()
  {
    this.rotateAntiClock(1);
  }

  moveL()
  {
    this.rotateClock(3);
  }

  moveLP()
  {
    this.rotateAntiClock(3);
  }

  moveF()
  {
    this.rotateClock(0);
  }

  moveFP()
  {
    this.rotateAntiClock(0);
  }

  moveB()
  {
    this.rotateClock(2);
  }

  moveBP()
  {
    this.rotateAntiClock(2);
  }

  parseMoves(moves)
  {
    let ans = [];
    for(let i = 0;i < moves.length;i ++)
    {
        if(moves[i] == 'U' || moves[i] == 'D' || moves[i] == 'R' || moves[i] == 'L' || moves[i] == 'F' || moves[i] == 'B')
            ans.push(moves[i]);
        else if(moves[i] == "'" || moves[i] == 'P' || moves[i] == '3')
            ans[ans.length - 1] += 'P';
        else if(moves[i] == '2')
            ans.push(ans[ans.length - 1]);
        else
            return [];
    }
    return ans;
  }

  doMoves(moves)
  {
    moves = this.parseMoves(moves);
    for(let i = 0;i < moves.length;i ++)
    {
        if(moves[i] == 'U')
            this.moveU();
        else if(moves[i] == 'UP')
            this.moveUP();
        else if(moves[i] == 'D')
            this.moveD();
        else if(moves[i] == 'DP')
            this.moveDP();
        else if(moves[i] == 'R')
            this.moveR();
        else if(moves[i] == 'RP')
            this.moveRP();
        else if(moves[i] == 'L')
            this.moveL();
        else if(moves[i] == 'LP')
            this.moveLP();
        else if(moves[i] == 'F')
            this.moveF();
        else if(moves[i] == 'FP')
            this.moveFP();
        else if(moves[i] == 'B')
            this.moveB();
        else if(moves[i] == 'BP')
            this.moveBP();
    }
  }
}