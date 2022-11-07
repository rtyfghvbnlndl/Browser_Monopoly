function findKey(obj,value,compare=(a,b)=> a===b){
    return Object.keys(obj).find(k=>compare(obj[k],value))
}
function num2XY(current,boxCode,boxlist,pp){
    console.log(current)
    if(current[1]!=1&&current.boxNum!=0){
        XY=findKey(boxCode,current.boxNum)

        if(pp!=''){
            boxlist[`${XY}`].css={
                width:calsize.perX+'px',
                height:calsize.perY+'px',
                border:calsize.bor+'px'+' solid rgb(137, 216, 255)',
                padding:calsize.pad+'px',
                float:'left',
                fontSize : calsize.perf+'%',
                background: pp,
            }
        }
        else {
            boxlist[`${XY}`].css={
                width:calsize.perX+'px',
                height:calsize.perY+'px',
                border:calsize.bor+'px'+' solid rgb(137, 216, 255)',
                padding:calsize.pad+'px',
                float:'left',
                fontSize : calsize.perf+'%',
                background: 'white'
            }
        }
    }
    
}

