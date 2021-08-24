export function drawConnetionChart(ctx,res,out,name){
    if(res){
        ctx.strokeStyle ="darkblue"
        ctx.fillStyle="darkblue"
        ctx.lineWidth="2"
        ctx.font = "bold 12pt Comic Sans MS";
        let m = res.length*50+30;
        ctx.fillText(`${name}`,2,m/2)
       
        for(let i=0;i<res.length;i++)
        {
            ctx.beginPath()
            ctx.moveTo(90,m/2)
            ctx.lineTo(110,m/2)
            ctx.lineTo(110,60*i+30)
            ctx.fillText(`${res[i].name}`,130,60*i+25)
            ctx.lineTo(250,60*i+30)
            ctx.stroke();
            ctx.fillText(`${out[res[i].p2]}`,280,60*i+33)
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