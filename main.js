var rec={}
var n=0
var xx //最大人数1开始需要赋值

function init_rec(z){
    if(z>0&&z<5){
        xx=z
        for(i=1;i<=z;++i){
            rec[i]={}
            rec[i].stay=0
            rec[i][0]={}
            rec[i][0].boxNum=0
        }
        //console.log(JSON.stringify(rec))
    }
    else console.log("人数不正确")

}

function start(x,y){
    //判断是否所有人完成
    var IsDone=1
    for(i=1;i<=xx;++i){

        if(typeof rec[i][n]=="undefined"){IsDone=0}
    }
    if(IsDone==1)++n
    
    
    //updata content boxNum done stay NO DICE
    function updata(){
        //防止溢出
        if(boxNum>dfw.length)boxNum=dfw.length
        if(boxNum<1)boxNum=1
        rec[x][n].boxNum=boxNum

        if(typeof rec[x][n].content=="undefined")rec[x][n].content=dfw[boxNum][2]
        else rec[x][n].content+=dfw[boxNum][2]
        if(dfw[boxNum][0]=="stay"){rec[x].stay+=dfw[boxNum][1]}
        rec[x][n].done=0
    }
//判断停留
    if(rec[x].stay!==0){
        --rec[x].stay
        rec[x][n]=JSON.parse(JSON.stringify(rec[x][n-1]))
        rec[x][n].dice=0
        rec[x][n].content=`停留 ${rec[x].stay+1}格`
    }
//正常
    else{
        var dice=Math.ceil(Math.random()*6)
        if(y!=0)dice=y
        var boxNum=rec[x][n-1].boxNum+dice
        //if(boxNum>dfw.length)boxNum=dfw.length
        rec[x][n]={}
        rec[x][n].dice=dice
        updata()
        while(dfw[boxNum][0]=="move"&&dfw[boxNum][1]!=0){
            boxNum+=dfw[boxNum][1]
            rec[x][n].content+=` 再跳${dfw[boxNum][1]}格 `

            updata()
        }
    }
    
    console.log(rec)
    return rec[x][n]
}
//调试

//init_rec(2)
//start(1,4)
//start(2,0)
//start(1,0)
//start(2,0)


