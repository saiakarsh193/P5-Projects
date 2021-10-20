function getScramble(length)
{
	let vMoves = ['U', 'D', 'R', 'L', 'F', 'B'];// 'Uw', 'Dw', 'Rw', 'Lw', 'Fw', 'Bw', 'E', 'M', 'S', 'x', 'y', 'z'];
	let scr = "";
	for(let i = 0;i < length;i ++)
	{
		scr += vMoves[int(random() * vMoves.length)];
		if(random() > 0.7)
			scr += '\'';
	}
	return condenseFormula(scr);
}

function condenseFormula(form)
{
  // string to array
	let temp = [];
	for(let i = 0;i < form.length;i ++)
	{
		if((form[i] >= 'a' && form[i] <= 'z') || (form[i] >= 'A' && form[i] <= 'Z'))
			temp.push(form[i]);
		else
			temp[temp.length - 1] += form[i];
	}
  // array to 2d count array
	let val = [];
	for(let i = 0;i < temp.length;i ++)
	{
		if(val.length > 0 && val[val.length - 1][0] == temp[i])
			val[val.length - 1][1] += 1;
		else
			val.push([temp[i], 1]);
	}
  // limit count to 2 and inverse moves for 3
	for(let i = 0;i < val.length;i ++)
	{
		val[i][1] = ((val[i][1] - 1) % 4) + 1;
		if(val[i][1] == 3)
		{
			val[i][0] = (val[i][0].length == 2) ? val[i][0][0] : val[i][0] + '\'';
			val[i][1] = 1;
		}
		else if(val[i][1] == 4)
			val[i][1] = 0;
	}
  // removing negating moves
	for(let i = 0;i < val.length - 1;i ++)
	{
		if(val[i][0].length != val[i + 1][0].length && val[i][0][0] == val[i + 1][0][0])
		{
			let minv = min(val[i][1], val[i + 1][1]);
			val[i][1] -= minv;
			val[i + 1][1] -= minv;
		}
	}
  // 2d count array to string
	let cform = "";
	for(let i = 0;i < val.length;i ++)
	{
		if(val[i][1] > 0)
		{
			cform += val[i][0];
			if(val[i][1] == 2)
				cform += '2';
		}
	}
	return cform;
}

function parseFormula(moves, condense)
{
  if(!String.prototype.splice)
  {
    /**
     * {JSDoc}
     *
     * The splice() method changes the content of a string by removing a range of
     * characters and/or adding new characters.
     *
     * @this {String}
     * @param {number} start Index at which to start changing the string.
     * @param {number} delCount An integer indicating the number of old chars to remove.
     * @param {string} newSubStr The String that is spliced in.
     * @return {string} A new string with the spliced substring.
     */
    String.prototype.splice = function(start, delCount, newSubStr)
    {
      return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
  }
  if(condense)
    moves = condenseFormula(moves);
  let vwMoves = ['U', 'D', 'R', 'L', 'F', 'B'];
  // Convert w moves to base moves
  for(let i = 0;i < moves.length;i ++)
  {
    if(moves[i] == 'w')
    {
      moves = moves.splice(i, 1, "");
      if(i > 0 && vwMoves.indexOf(moves[i - 1]) >= 0)
      {
        let nv = moves[i - 1].toLowerCase();
        moves = moves.splice(i - 1, 1, nv);
      }
    }
  }
  // Convert outprimes to base moves
  let vMoves = ['U', 'D', 'R', 'L', 'F', 'B', 'E', 'M', 'S', 'x', 'y', 'z', 'u', 'd', 'r', 'l', 'f', 'b'];
  let cvm = -1;
  for(let i = 0;i < moves.length;i ++)
  {
    if(vMoves.indexOf(moves[i]) >= 0)
      cvm = i;
    if(moves[i] == '\'' || moves[i] == 'P')
    {
      moves = moves.splice(i, 1, "");
      if(cvm >= 0)
      {
        moves = moves.splice(cvm + 1, 0, "P");
        cvm = -1;
      }
    }
  }
  // Converting the characters into move blocks
  let ans = [];
  for(let i = 0;i < moves.length;i ++)
  {
    if(vMoves.indexOf(moves[i]) >= 0)
    {
      let cm = moves[i];
      let ctr = 1;
      if(i + 1 < moves.length && moves[i + 1] == 'P')
      {
        cm += 'P';
        ctr = 2;
      }
      let cnt = 1;
      if(i + ctr < moves.length && moves[i + ctr] >= '0' && moves[i + ctr] <= '9')
        cnt = moves[i + ctr].charCodeAt(0) - 48;
      for(let j = 0;j < cnt;j ++)
        ans.push(cm);
    }
  }
  return ans;
}