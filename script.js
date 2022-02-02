let cell = document.querySelector('.cell');

console.log(cell.dataset.type);


const boardManager = ()=>{
    let boardList = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];
    // ['cross', 'circle', 'none',
    // 'none' , 'cross' , 'circle',
    // 'none' , 'circle', 'cross'];

    const reset = function(){
        boardList = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];
    }

    const draw = function(){
        const boardChildren = document.querySelector('.board').children;
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
                divCross.addEventListener('click', ()=>{
                    boardList[i] = 'cross';
                    console.log(validate());
                    draw();
                });
                divCircle.addEventListener('click', ()=>{
                    boardList[i] = 'circle';
                    console.log(validate());
                    draw();
                }); 
            }
        }
    }

    // 0 1 2
    // 3 4 5
    // 6 7 8

    const validate = function(){
        return ((boardList[0] === boardList[1] && boardList[1] === boardList[2] && boardList[2] !== 'none') ||
                (boardList[3] === boardList[4] && boardList[4] === boardList[5] && boardList[5] !== 'none') ||
                (boardList[6] === boardList[7] && boardList[7] === boardList[8] && boardList[8] !== 'none') ||
                (boardList[0] === boardList[3] && boardList[3] === boardList[6] && boardList[6] !== 'none') ||
                (boardList[1] === boardList[4] && boardList[4] === boardList[7] && boardList[7] !== 'none') ||
                (boardList[2] === boardList[5] && boardList[5] === boardList[8] && boardList[8] !== 'none') ||
                (boardList[0] === boardList[4] && boardList[4] === boardList[8] && boardList[8] !== 'none') ||
                (boardList[2] === boardList[4] && boardList[4] === boardList[6] && boardList[6] !== 'none') );
    }

    return {draw, reset, validate};
}

let bb = boardManager();

bb.draw();


