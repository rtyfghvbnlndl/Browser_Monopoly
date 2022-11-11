//document.body.clientWidth
//保留两位小数，只舍不入
function float2(n,x){
    x=Math.floor(x*10**n)/10**n
    return x
}
//输入格子数，计算各边格子个数,计算css参数
function calsize(box,wid,hei){
    var x=4,y,w=0,pxY,perX
    var pad=float2(4,1*wid/100)
    var bor=float2(4,0.2*wid/100)
    while(w<box){
        w=0
        perX=float2(5,(1-(pad/wid+bor/wid)*(2*x))/x)
        pxY=perX*wid/4*3
        y=Math.floor(hei/(pxY+(pad+bor)*2))
        w=Object.getOwnPropertyNames(boxCodeNew(x,y,box)).length
        ++x
    //console.log(perX)
    }
    perf=wid/17
    var dict={
        x:x-1,
        y:y,
        pad:pad,
        bor:bor,
        perX:perX*100-0.5,
        pxY:pxY,
        perf:perf
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
                    width:calsize.perX+'%',
                    height:calsize.pxY+'px',
                    border:calsize.bor+'px'+' solid rgb(137, 216, 255)',
                    padding:calsize.pad+'px',
                    float:'left',
                    fontSize : calsize.perf+'%'
                } 
            }
            else{
                boxList[`${a}_${b}`].css={
                    width:calsize.perX+'%',
                    height:calsize.pxY+'px',
                    border:calsize.bor+'px'+' solid rgb(255, 255, 255)',
                    padding:calsize.pad+'px',
                    float:'left',
                    fontSize : calsize.perf+'%'
                }

            }
        }
    }
    console.log(boxList)
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
//给格子编号 已经不用啦，但是感觉也是一种方向
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
//新的boxcode
function boxCodeNew(x0,y0,l){
    var boxCodes={},n=1,x,y,nn
    //定义向上下左右
    function write(){
        boxCodes[`${x}_${y}`]=n
        //console.log(x,y,'write'+n)
        ++n
    }
    function up(){
        --y
        write()
    }
    function down(){
        ++y
        write()
    }
    function left(){
        --x
        write()
    }
    function right(){
        ++x
        write()
    }
    //开始点
    x=x0
    y=y0
    write()
    //条件判断方向
    //console.log(n,l)
    var t=0
    while(n<=l&&y0-2*t>=1+2*t){
        do{
            nn=n
            if(y==y0-2*t&&x>1+2*t&&x<x0+3-2*t)left()
            else if(x==1+2*t&&y>1+2*t&&y<y0+1-2*t)up()
            else if(y==1+2*t&&x<x0-2*t&&x>0+2*t)right()
            else if(x==x0-2*t&&y<y0-2-2*t&&y>0+2*t)down()
            //console.log(nn,n)

        }while(n<=l&&n!=nn)
    ++t
    }
    return boxCodes
}
//调试
//var dfw={1:["stay",0,111],2:["stay",0,222],3:["move",1,333],4:["stay",1,444],5:["stay",0,555],6:["stay",0,666],length:6}

//var calsize=calsize(12,1024,1024)
//console.log(calsize)

//var boxCode=boxCode(calX[0],calX[1],dfw.length)
//console.log(boxCode)
//var d=setBox(calX[0],calX[1],dfw,boxCode,calsize)
//console.log(JSON.stringify(d))