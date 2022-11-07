//document.body.clientWidth

//输入格子数，计算各边格子个数
function calX(box){
    var x=4,y,w=0
    while(w<box){
        w=0
        y=Math.floor(x)
        x1=x
        y1=y
        do{
            w+=2*(x1+y1)-5
            x1-=4
            y1-=4
        }while(x1>=7&&y1>=7)
        ++x
    //console.log(w,x-1,y)
    }
    return [x-1,y]

}
//保留两位小数，只舍不入
function float2(x){
    x=Math.floor(x*100)/100
    return x
}
//计算css参数
function calsize(x,y,wid){
    pad=float2(2*wid/100)
    bor=float2(0.2*wid/100)
    perX=float2((wid-(pad+bor)*(2*x+1))/x)
    perY=Math.floor(perX/4*3)
    perf=wid/12
    var dict={
        "pad":pad,
        "bor":bor,
        "perX":perX,
        "perY":perY,
        "perf":perf
    }
    return dict
}


//生成格子
function setBox(x,y,dfw,boxCode,calsize){
    //console.log(x,y)
    var boxList={}
    for(b=1;b<=y;++b){
        for(a=1;a<=x;++a){
            boxList[`${a}_${b}`]={}
            boxList[`${a}_${b}`].id=`${a}_${b}`
            var num=boxCode[`${a}_${b}`]
            if(typeof num!="undefined"){
                boxList[`${a}_${b}`].content=dfw[num][2]
                boxList[`${a}_${b}`].number=num
                boxList[`${a}_${b}`].css={
                    width:calsize.perX+'px',
                    height:calsize.perY+'px',
                    border:calsize.bor+'px'+' solid rgb(137, 216, 255)',
                    padding:calsize.pad+'px',
                    float:'left',
                    fontSize : calsize.perf+'%'
                } 
            }
            else{
                boxList[`${a}_${b}`].css={
                    width:calsize.perX+'px',
                    height:calsize.perY+'px',
                    border:calsize.bor+'px'+' solid rgb(255, 255, 255)',
                    padding:calsize.pad+'px',
                    float:'left',
                    fontSize : calsize.perf+'%'
                }

            }
        }
    }
    return boxList
}
//批量给css的dict赋值
function setcss(x,y,dict,ob){
    for(b=1;b<=y;++b){
        for(a=1;a<=x;++a){
            dict[`styleObject${a}_${b}`]=ob
        }
    }
}
//给格子编号
function boxCode(x,y,l){
    var boxCodes={}
    x1=x
    y1=y
    var n=1,p=0
    do{
        for(i=x1;i>1;--i){
            if(n>l)break;
            a=i+2*p
            b=y1+2*p
            boxCodes[`${a}_${b}`]=n
            ++n
        }
        for(i=y1;i>1;--i){
            if(n>l)break;
            a=1+2*p
            b=i+2*p
            boxCodes[`${a}_${b}`]=n
            ++n
        }
        for(i=1;i<x1;++i){
            if(n>l)break;
            a=i+2*p
            b=1+2*p
            boxCodes[`${a}_${b}`]=n
            ++n
        }
        for(i=1;i<y1-1;++i){
            if(n>l)break;
            a=x1+2*p
            b=i+2*p
            boxCodes[`${a}_${b}`]=n
            ++n
        }
        x1-=4
        y1-=4
        ++p
    }while(x1>=7&&y1>=7)
    return boxCodes
}
//调试
//var dfw={1:["stay",0,111],2:["stay",0,222],3:["move",1,333],4:["stay",1,444],5:["stay",0,555],6:["stay",0,666],length:6}
///var calX=calX(6)

//var calsize=calsize(calX[0],calX[1],1024)
//console.log(b)

//var boxCode=boxCode(calX[0],calX[1],dfw.length)
//console.log(boxCode)
//var d=setBox(calX[0],calX[1],dfw,boxCode,calsize)
//console.log(JSON.stringify(d))