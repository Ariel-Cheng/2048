/**
 * Created by Aqua on 2016/1/21.
 */
/**
 *
 * @returns {Array|*}
 */
function init() {
    var i = 0;
    var j = 0;
    brick=new Array();
    for (i = 0; i < 4; i++) {
        brick[i]=new Array();
        for (j = 0; j < 4; j++) {
            brick[i][j]=0;

        }
    }
    newBrick();
    newBrick();
    refreshScore();
    return brick;
}

function checkOver(){
    var i, j;

    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            if(brick[i][j]==2048&&confirm("YOU WIN!!  PLAY AGAIN??")){
                init();
                paint();

            }
        }
    }

    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            if(brick[i][j]==0){
                return;//把控制权返还给页面
            }

            //if(brick[i][j]==brick[i+1][j] ){
            //    return;
            //}
            //if(brick[i][j]==brick[i][j+1] ){
            //    return;
            //}
            if(i + 1 < 4)
            {
                if(brick[i][j] == brick[i + 1][j])
                {
                    return;
                }
            }

            if(j + 1 < 4)
            {
                if(brick[i][j] == brick[i][j + 1])
                {
                    return;
                }
            }
        }
    }



    if(confirm("YOU LOSE!!  PLAY AGAIN??")){
        init();
        paint();


    }

}

function newBrick(){


    do {
        var row = Math.floor(Math.random()*4);//随机数取整
        var col = Math.floor(Math.random()*4);
    }while(brick[row][col]!=0);

    brick[row][col]=4-(Math.random()>=0.3)*2;

}

function remove(){
    var i;
    for(i=0;i<4;i++){
    if(queue[i]==queue[i+1]){
        queue[i]=2*queue[i];
        queue[i+1]=0;
    }else if(queue[i]==queue[i+2] && queue[i+1]==0)
        {
           queue[i]=2*queue[i+2];
            queue[i+2]=0;
        }else if(queue[i]==queue[i+3] && queue[i+1]==0 && queue[i+2]==0)
        {
            queue[i]=2*queue[i+3];
            queue[i+3]=0;
        }

    }
}

function move(flag){
    queue=new Array();

    test=new Array();//测试是否需要newBrick，格子都满了的时候就不能
    var needBrick= false;
    var i=0;
    var j=0;
    var k=0;
    for( j=0;j<4;j++) {

        if (flag == 1) {
            for ( i = 0; i < 4; i++) {
                queue[i] =test[i]= brick[i][j];
                brick[i][j] = 0;

            }
            i = 0;//初始化下标
            remove();
            for (k = 0; k < 4; k++) {
                if (queue[k] != 0) {
                    brick[i][j] = queue[k];
                    i++;
                }
            }
            for(i=0;i<4;i++){
                if(test[i]!=brick[i][j]){
                    needBrick=true;
                }
            }

        }
        if (flag == 2) {
            for ( i = 0; i < 4; i++) {
                queue[i] = test[3-i]=brick[3-i][j];
                brick[3-i][j] = 0;
            }
            remove();
            i = 0;//初始化下标
            for (k = 0; k < 4; k++) {
                if (queue[k] != 0) {
                    brick[3 - i][j] = queue[k];
                    i++;
                }

            }
            for(i=0;i<4;i++){
                if(test[i]!=brick[i][j]){
                    needBrick=true;
                }
            }
        }

        if (flag == 3) {
            for (i = 0; i < 4; i++) {
                queue[i] =test[i]= brick[j][i];
                brick[j][i] = 0;
            }
             i= 0;//初始化下标
            remove();
            for (k = 0; k < 4; k++) {
                if (queue[k] != 0) {
                    brick[j][i] = queue[k];
                    i++;
                }
            }
            for(i=0;i<4;i++){
                if(test[i]!=brick[j][i]){
                    needBrick=true;
                }
            }

        }
        if (flag == 4) {
            for ( i = 0; i < 4; i++) {
                queue[i] = test[3-i]=brick[j][3-i];
                brick[j][3-i] = 0;
            }
            i = 0;//初始化下标
            remove();
            for (k = 0; k < 4; k++) {
                if (queue[k] != 0) {
                    brick[j][3 - i] = queue[k];
                    i++;
                }
            }
            for(i=0;i<4;i++){
                if(test[i]!=brick[j][i]){
                    needBrick=true;
                }
            }
        }
    }
    if(needBrick==true){
        newBrick();
    }

    refreshScore();
}
function refreshScore() {
    var score=0;
    var i,j;
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            score+=brick[i][j];
        }
    }
    document.getElementById("score").innerHTML="分数："+score;
    var highScore =document.getElementById("best").innerHTML;
    if(score>highScore){
        highScore=score;
    }
    document.getElementById("best").innerHTML=highScore;

}



function paint() {
    var box=document.getElementsByClassName("grid-cell");
    var index=0;
    for(var j=0;j<4;j++){
        for(var i=0;i<4;i++){
            index=4*i+j;
            if(brick[i][j]==0){
                box[index].innerHTML="";
            }else{
                if(box[index].childElementCount){
                    var childs=box[index].childNodes;
                    box[index].removeChild(childs[0]);
                }

                var inner=document.createElement("div");
                inner.setAttribute("class","mode"+brick[i][j]);
                inner.innerHTML=brick[i][j];
                box[index].appendChild(inner);
            }
        }
    }
}

window.onload= function()
{
    init();
    paint();

    document.onkeydown=function(event){
        var e = event || window.event ;

        if(e.keyCode == 87 || e.keyCode == 38 ){//上或者W
            move(1);
            paint();
            checkOver();
        }
        if(e.keyCode == 40 || e.keyCode == 83){//下或者S
            move(2);
            paint();
            checkOver();
        }
        if(e.keyCode == 65 || e.keyCode == 37){//左或者A
            move(3);
            paint();
            checkOver();
        }
        if(e.keyCode == 68 || e.keyCode == 39 ){//右或者D
            move(4);
            paint();
            checkOver();
        }
    };
};

