
const MINENUMBER_num=8;
let isgameOver_bool=false;
let isWin_bool=false;
let gameMap_nums2D=[
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
];
//-1地雷,0空格,1.2.3...地雷數量

let openState_nums2D=[
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
];
//0蓋上,1打開,2旗幟

//程式主要執行位置
addButtonsToHTML();
initialize();

//設定按鈕
document.addEventListener("DOMContentLoaded", function(){
    //重新開始
    document.getElementById("resetButton").onclick=initialize;
});

//初始化
function initialize(){
    isgameOver_bool=false;
    isWin_bool=false;
    resetGameMapAndOpenState();
    generateMines();
    generateNumbersAroundMines();
    setButtonsImage();
    displayMap();
    setGameState();
}

//顯示地圖
function displayMap(){
    for(let i_num = 0; i_num < 8; i_num++){
        for(let j_num = 0; j_num < 8; j_num++){
            if(!isgameOver_bool && openState_nums2D[i_num][j_num] !== 1){
                continue;
            }
            document.getElementById("image"+i_num+"-"+j_num).style.visibility = "visible";
            if(gameMap_nums2D[i_num][j_num] === -1){
                document.getElementById("image"+i_num+"-"+j_num).setAttribute("src", "mine.png");
            } else {
                document.getElementById("image"+i_num+"-"+j_num).setAttribute("src", gameMap_nums2D[i_num][j_num]+".png");
            }
        }
    }
}

//重設地圖
function resetGameMapAndOpenState(){
    gameMap_nums2D=[
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ];

    openState_nums2D=[
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ];

    for(let i_num=0; i_num<8; i_num++){
        for(let j_num=0; j_num<8; j_num++){
            document.getElementById("image"+i_num+"-"+j_num).style.visibility = "hidden";
        }
    }
}

//生成按鈕
function addButtonsToHTML(){
    for(let i_num=0;i_num<8;i_num++){
        for(let j_num=0;j_num<8;j_num++){
            let newButton=document.createElement('button');
            newButton.id="button"+String(i_num)+"-"+String(j_num);
            newButton.className='buttons';

            let newButtonImage=document.createElement('img');
            newButtonImage.id="image"+String(i_num)+"-"+String(j_num);
            newButtonImage.setAttribute("src","flag.png");
            newButtonImage.style.visibility=`hidden`;

            newButton.appendChild(newButtonImage);
            newButton.onclick = (function(j_num, i_num) {
                return function() {
                    handleButtonClick(j_num, i_num);
                };
            })(j_num, i_num);
            document.getElementById("gameBox").appendChild(newButton);
        }
    }
}

//檢查是否勝利
function checkWin() {
    if(isgameOver_bool){
       return; 
    }
    let countUnopened_num=0;
    for(let i_num=0;i_num<8;i_num++){
        for(let j_num=0;j_num<8;j_num++){
            if(openState_nums2D[i_num][j_num]===0){
                countUnopened_num++;
            }
        }
    }
    if(countUnopened_num===MINENUMBER_num){
        isWin_bool=true;
    }
    else{
        isWin_bool=false;
    }
}

//設定遊玩狀態的文字
function setGameState(){
    if(isWin_bool===false && isgameOver_bool===false){
        document.getElementById("gameState").textContent="Playing";
    }
    else if (isWin_bool) {
        document.getElementById("gameState").textContent="You win";
    } 
    else if (isgameOver_bool){
        document.getElementById("gameState").textContent="Gameover!";
    }
}

//處裡遊戲點擊事件
function handleButtonClick(j_num, i_num){
    let x_num = j_num, y_num = i_num;
    if(isgameOver_bool || isWin_bool){
        return;
    }
    if(gameMap_nums2D[y_num][x_num] === -1){
        isgameOver_bool = true;
        displayMap();
    } else {
        openBlock(x_num, y_num);
    }
    checkWin();
    displayMap();
    setGameState()
}

//用來打開的迴圈
function openBlock(x_num, y_num) {
    if (openState_nums2D[y_num][x_num] === 1) {
        return;
    }
    openState_nums2D[y_num][x_num] = 1;
    if (gameMap_nums2D[y_num][x_num] === 0) {
        for (let xAdd_num = -1; xAdd_num <= 1; xAdd_num++) {
            for (let yAdd_num = -1; yAdd_num <= 1; yAdd_num++) {
                if (x_num + xAdd_num >= 0 && x_num + xAdd_num < 8 && y_num + yAdd_num >= 0 && y_num + yAdd_num < 8) {
                    openBlock(x_num + xAdd_num, y_num + yAdd_num);
                }
            }
        }
    }
}

//設定按鈕圖片
function setButtonsImage(){
    for(let i_num=0;i_num<8;i_num++){
        for(let j_num=0;j_num<8;j_num++){
            if(gameMap_nums2D[i_num][j_num]===-1){
                document.getElementById("image"+String(i_num)+"-"+String(j_num)).setAttribute("src","mine.png");
            }
            else{
                document.getElementById("image"+String(i_num)+"-"+String(j_num)).setAttribute("src",gameMap_nums2D[i_num][j_num]+".png");
            }
        }
    }
}

//生成地雷
function generateMines(){
    for(let i_num=0;i_num<MINENUMBER_num;i_num++){
        let x_num,y_num;
        do{
            x_num=Math.floor(Math.random()*8);
            y_num=Math.floor(Math.random()*8);
        } while (gameMap_nums2D[y_num][x_num]===-1);
        gameMap_nums2D[y_num][x_num]=-1;
    }
}

//生成地雷周邊數字
function generateNumbersAroundMines(){
    for(let i_num=0;i_num<8;i_num++){
        for(let j_num=0;j_num<8;j_num++){
            if(gameMap_nums2D[i_num][j_num]===-1){
                continue;
            }
            gameMap_nums2D[i_num][j_num]=countAroundMinesForBlock(i_num,j_num);
        }
    }
}

//計算格子周圍的地雷數
function countAroundMinesForBlock(i_num,j_num){
    let mineCount_num = 0;
    for (let xAdd_num = -1; xAdd_num <= 1; xAdd_num++) {
        for (let yAdd_num = -1; yAdd_num <= 1; yAdd_num++) {
            if (i_num + xAdd_num >= 0 && i_num + xAdd_num < 8 && j_num + yAdd_num >= 0 && j_num + yAdd_num < 8) {
                if (gameMap_nums2D[i_num + xAdd_num][j_num + yAdd_num] === -1) {
                    mineCount_num++;
                }
            }
        }
    }
    return mineCount_num;
}



