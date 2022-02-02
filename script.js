let victoryDiv = document.querySelector('#victory-div');
let currentPlayerDiv = document.querySelector('#currentPlayerDiv');
let scoreBoardDiv = document.querySelector('#score-board');

const BoardManager = ()=>{
    let boardList = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];
    let playedOnce = false;
    let gameOver = false;
    // ['cross', 'circle', 'none',
    // 'none' , 'cross' , 'circle',
    // 'none' , 'circle', 'cross'];

    const reset = function(){
        boardList = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];
        victoryDiv.textContent = '';
        playedOnce = false;
        gameOver = false;
        draw();
    }

    const draw = function(){
        const boardChildren = document.querySelector('.board').children;
        if(!gameOver) {currentPlayerDiv.textContent = `Current Player: ${currentPlayer.name}`;}
        for(let i=0; i<boardChildren.length; ++i){
            if(boardList[i] !== 'none'){
                boardChildren[i].querySelector('.img-single').src = `${boardList[i]}.svg`;
                boardChildren[i].querySelector('div').style.display = 'none';
                boardChildren[i].querySelector('.img-single').style.display = 'block';
                boardChildren[i].querySelector('.btn-single').style.display = 'none';
            }
            else{
                boardChildren[i].querySelector('.img-single').style.display = 'none';
                boardChildren[i].querySelector('div').style.display = 'flex';
                if(playedOnce){
                    boardChildren[i].querySelector('.btn-single').style.display = 'block';
                    if(gameOver){
                        console.log('hello');
                        boardChildren[i].querySelector('.btn-single').style.display = 'none';
                        boardChildren[i].querySelector('div').style.display = 'none';
                        continue;
                    }
                    boardChildren[i].querySelector('div').style.display = 'none';
                    boardChildren[i].querySelector('.btn-single').src = `${currentPlayer.plays}1.svg`
                    boardChildren[i].querySelector('.btn-single').onclick =  ()=>{
                        boardList[i] = currentPlayer.plays;
                        validate();
                        currentPlayer.swap();
                        draw();
                    };
                }
                else{
                    boardChildren[i].querySelector('.btn-single').style.display = 'none';
                    const divCross = boardChildren[i].querySelector('.btn-cross');
                    const divCircle = boardChildren[i].querySelector('.btn-circle');
                    divCross.onclick = ()=>{
                        playedOnce = true;
                        currentPlayer.setPlays('cross');
                        boardList[i] = 'cross';
                        validate();
                        currentPlayer.swap();
                        draw();
                    };
                    divCircle.onclick = ()=>{
                        playedOnce = true;
                        currentPlayer.setPlays('circle');
                        boardList[i] = 'circle';
                        validate();
                        currentPlayer.swap();
                        draw();
                    }; 
                }
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
            currentPlayerDiv.textContent = '';
            currentPlayer.wins += 1;
            scoreBoardDiv.textContent = `${player1.name}: ${player1.wins} | ${player2.name}: ${player2.wins}`
            gameOver = true;
            return true;
        }
        return false;
    }

    return {draw, reset, validate};
}

let Player = (a_name)=>{
    let name = a_name;
    let plays = 'nothing';
    let wins = 0;
    
    let swap=()=>{
        currentPlayer = currentPlayer===player1 ? player2:player1;
    }
    let setInit=()=>{
        currentPlayer = (Math.floor(Math.random() * 11)%2 === 0)? player1:player2;
        currentPlayer.plays = 'nothing';
        otherPlayer().plays = 'nothing';
    }
    let otherPlayer = ()=>{
        return currentPlayer===player1? player2:player1;
    }
    let setPlays=(a_plays)=>{
        currentPlayer.plays = a_plays;
        otherPlayer().plays = a_plays==='circle'?'cross':'circle';
    }
    return {name, plays, wins, swap, setInit, setPlays}
}

let player1 = Player('Dolly');
let player2 = Player('Rudra');
player1.setInit();

let bb = BoardManager();
bb.draw();

document.querySelector('#btn-restart').onclick = ()=>{
    player1.setInit();
    bb.reset();
}


