let cx, cy;

let sw = 30;
let sd = 2;
let tcols = 27;
let trows = 5;

let sx = -(tcols * sw / 2);
let sy = -(trows * sw / 2);
let numd = [
  [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]], // 0
  [[0, 1, 0], [1, 1, 0], [0, 1, 0], [0, 1, 0], [1, 1, 1]], // 1
  [[1, 1, 1], [0, 0, 1], [1, 1, 1], [1, 0, 0], [1, 1, 1]], // 2
  [[1, 1, 1], [0, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]], // 3
  [[1, 0, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [0, 0, 1]], // 4
  [[1, 1, 1], [1, 0, 0], [1, 1, 1], [0, 0, 1], [1, 1, 1]], // 5
  [[1, 1, 1], [1, 0, 0], [1, 1, 1], [1, 0, 1], [1, 1, 1]], // 6
  [[1, 1, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]], // 7
  [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]], // 8
  [[1, 1, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]]  // 9
];
let mat;
let hour_format = 24; // 12 or 24

function setup()
{
  createCanvas(1600, 900);

  cx = width / 2;
  cy = height / 2;

  mat = new Array(trows).fill(0).map(() => new Array(tcols).fill(0));
}

function updateMat()
{
  let h = hour() % hour_format;
  let h1 = int(h / 10);
  let h2 = h % 10;
  let m = minute();
  let m1 = int(m / 10);
  let m2 = m % 10;
  let s = second();
  let s1 = int(s / 10);
  let s2 = s % 10;
  let div = [0, 1, 0, 1, 0];
  for(let i = 0;i < 5;i ++)
  {
    for(let j = 0;j < 3;j ++)
    {
      mat[i][j +  0] = numd[h1][i][j];
      mat[i][j +  4] = numd[h2][i][j];
      mat[i][j + 10] = numd[m1][i][j];
      mat[i][j + 14] = numd[m2][i][j];
      mat[i][j + 20] = numd[s1][i][j];
      mat[i][j + 24] = numd[s2][i][j];
    }
    mat[i][ 8] = div[i];
    mat[i][18] = div[i];
  }
}

function draw()
{
  background(0);
  translate(cx, cy);
  updateMat();
  noStroke();
  for(let i = 0;i < trows;i ++)
  {
    for(let j = 0;j < tcols;j ++)
    {
      if(mat[i][j] == 0)
        fill(0);
      else
        fill(255);
      square((sx + j * sw) + sd, (sy + i * sw) + sd, sw - 2 * sd);
    }
  }
}