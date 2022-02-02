let victoryDiv = document.querySelector('#victory-div');
let currentPlayerDiv = document.querySelector('#currentPlayerDiv');

const BoardManager = ()=>{
    let boardList = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];
    // ['cross', 'circle', 'none',
    // 'none' , 'cross' , 'circle',
    // 'none' , 'circle', 'cross'];

    const reset = function(){
        boardList = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];
        victoryDiv.textContent = '';
    }

    const draw = function(){
        const boardChildren = document.querySelector('.board').children;
        currentPlayerDiv.textContent = `Current Player: ${currentPlayer.name}`;
        for(let i=0; i<boardChildren.length; ++i){
            if(boardList[i] !== 'none'){
                boardChildren[i].querySelector('img').src = `${boardList[i]}.svg`;
                boardChildren[i].querySelector('div').style.display = 'none';
                boardChildren[i].querySelector('img').style.display = 'block';
            }
            else{
                boardChildren[i].querySelector('img').style.display = 'none';
                const divCross = boardChildren[i].querySelector('.btn-cross');
                const divCircle = boardChildren[i].querySelector('.btn-circle');
                divCross.onclick = ()=>{
                    boardList[i] = 'cross';
                    validate();
                    currentPlayer.swap();
                    draw();
                };
                divCircle.onclick = ()=>{
                    boardList[i] = 'circle';
                    validate();
                    currentPlayer.swap();
                    draw();
                }; 
            }
        }
    }

    // 0 1 2
    // 3 4 5
    // 6 7 8

    const validate = function(){
        if((boardList[0] === boardList[1] && boardList[1] === boardList[2] && boardList[2] !== 'none') ||
                (boardList[3] === boardList[4] && boardList[4] === boardList[5] && boardList[5] !== 'none') ||
                (boardList[6] === boardList[7] && boardList[7] === boardList[8] && boardList[8] !== 'none') ||
                (boardList[0] === boardList[3] && boardList[3] === boardList[6] && boardList[6] !== 'none') ||
                (boardList[1] === boardList[4] && boardList[4] === boardList[7] && boardList[7] !== 'none') ||
                (boardList[2] === boardList[5] && boardList[5] === boardList[8] && boardList[8] !== 'none') ||
                (boardList[0] === boardList[4] && boardList[4] === boardList[8] && boardList[8] !== 'none') ||
                (boardList[2] === boardList[4] && boardList[4] === boardList[6] && boardList[6] !== 'none') ){
            
            victoryDiv.textContent = `The Winner is ${currentPlayer.name}`;
        }
    }

    return {draw, reset, validate};
}

let Player = (a_name)=>{
    let name = a_name;
    
    let swap=()=>{
        currentPlayer = currentPlayer===player1 ? player2:player1;
    }
    let setInit=()=>{
        currentPlayer = (Math.floor(Math.random() * 11)%2 === 0)? player1:player2;
    }
    return {name, swap, setInit}
}

let player1 = Player('Deepak');
let player2 = Player('Rudra');
player1.setInit();

let bb = BoardManager();

bb.draw();


