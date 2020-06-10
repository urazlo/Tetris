// Отображение уровня
const level = document.querySelector('.btn-lvl');
level.addEventListener('mouseup', () => {
    const value = level.value;
    document.getElementById('menuPg-lvl').textContent = `Level: ${value}`;
    document.getElementById('gamePg-lvl').textContent = `Level: ${value}`;
});

// Menu switch
const hideMenu = document.querySelector('.btn-strt');
hideMenu.addEventListener('click', () => {
    document.querySelector('.menuPg').classList.toggle('hidden');
    document.querySelector('.gamePg').classList.toggle('hidden');
});

const openMenu = document.querySelector('.btn-menu');
openMenu.addEventListener('click', () => {
    document.querySelector('.menuPg').classList.toggle('hidden');
    document.querySelector('.gamePg').classList.toggle('hidden');
});

const cellSize = 40;
const tetrisCells = 180;
const cellBorderWidth = 1;
const borderedCellSize = cellSize + cellBorderWidth
const tetrisFrontFieldHeight = borderedCellSize * (tetrisCells - 40) / 10
const tetrisFieldWidth = borderedCellSize * 10;

//Наполнение игрового поля

const backTetris = document.createElement('div');
backTetris.classList.add('gamePg-backTetris');

for (let i = 0; i < tetrisCells; i++) {
    let excel = document.createElement('div');
    excel.classList.add('excel');
    backTetris.appendChild(excel);
}

const frontTetris = document.getElementsByClassName('gamePg-frontTetris')[0];
frontTetris.appendChild(backTetris);

let excel = document.getElementsByClassName('excel');
let i = 0;

for (let y = 18; y > 0; y--) {
    for (let x = 1; x < 11; x++) {
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        i++;
    }
}


let x = 5;
let y = 10;

const figuresArray = [
    [
        [0, 1],
        [0, 2],
        [0, 3]
    ],

    [
        [1, 0],
        [0, 1],
        [1, 1]
    ]
]

let currentFIgure = 0;
let figureBody = 0;

function getFigure() {
    function getRandom() {
        return Math.round(Math.random() * (figuresArray.length - 1))
    }
    currentFigure = getRandom();

    figureBody = [
        document.querySelector(`[posX="${x}"][posY="${y}"]`),
        document.querySelector(`[posX="${x+figuresArray[currentFigure][0][0]}"][posY="${y+figuresArray[currentFigure][0][1]}"]`),
        document.querySelector(`[posX="${x+figuresArray[currentFigure][1][0]}"][posY="${y+figuresArray[currentFigure][1][1]}"]`),
        document.querySelector(`[posX="${x+figuresArray[currentFigure][2][0]}"][posY="${y+figuresArray[currentFigure][2][1]}"]`),
    ]

    for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.add('figure');
    }
}

setCellSize();
getFigure();



//Устанавливаем размеры клетки
function setCellSize() {
    const cells = document.getElementsByClassName('excel');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.width = `${cellSize}px`;
        cells[i].style.height = `${cellSize}px`;
        cells[i].style.borderRight = `${cellBorderWidth}px solid red`;
        cells[i].style.borderBottom = `${cellBorderWidth}px solid red`;
    }
}

//Устанавливаем размеры игрового поля
document.querySelector('.gamePg-frontTetris').style.width = `${tetrisFieldWidth}px`;
document.querySelector('.gamePg-backTetris').style.width = `${tetrisFieldWidth}px`;
document.querySelector('.gamePg-frontTetris').style.height = `${tetrisFrontFieldHeight}px`;