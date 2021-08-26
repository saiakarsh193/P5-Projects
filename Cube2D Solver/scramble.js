function getScramble(length)
{
    let vMoves = ['U', 'D', 'R', 'L', 'F', 'B'];// 'Uw', 'Dw', 'Rw', 'Lw', 'Fw', 'Bw', 'E', 'M', 'S', 'x', 'y', 'z'];
    let temp = [];
    for(let i = 0;i < length;i ++)
    {
        let tm = vMoves[int(random() * vMoves.length)];
        if(random() > 0.7)
            tm += '\'';
        temp.push(tm);
    }
    temp.push('');
    let ans = temp[0];
    let ctr = 1;
    for(let i = 1;i < temp.length;i ++)
    {
        if(temp[i] == temp[i - 1])
            ctr ++;
        else
        {
            if(ctr % 2 == 0)
                ans += 2;
            ans += temp[i];
            ctr = 1;
        }
    }
    print(ans);
    return ans;
}