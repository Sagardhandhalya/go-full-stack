export function drawConnetionChart(ctx,res,out,name){
    if(res){
        ctx.strokeStyle ="darkblue"
        ctx.fillStyle="darkblue"
        ctx.lineWidth="2"
        ctx.font = "bold 12pt Comic Sans MS";
        let  m = res.length*50+100;
        // ctx.strokeRect(10,m/2 ,80, 50);
        ctx.fillText(`${name}`,2,m/2+30)
       
        for(let i=1;i<=res.length;i++)
        {
            ctx.beginPath()
            ctx.moveTo(90,m/2+25)
            ctx.lineTo(110,m/2+25)
            ctx.lineTo(110,60*i+25)
            ctx.fillText(`${res[i-1].name}`,130,60*i+20)
            ctx.lineTo(250,60*i+25)
            ctx.stroke();
            ctx.fillText(`${out[res[i-1].p2]}`,280,60*i+30)
        }
    }
    else{
        ctx.strokeStyle ="darkblue"
        ctx.fillStyle="darkblue"
        ctx.lineWidth="2"
        ctx.font = "bold 12pt Comic Sans MS";
        ctx.fillText(`${name}`,2,100)
        ctx.beginPath()
        ctx.moveTo(90,95)
        ctx.lineTo(120,95)
        ctx.stroke();
    }
}