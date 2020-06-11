//Объявление констант
const cellSize = 40;
const tetrisCells = 180;
const cellBorderWidth = 1;
const borderedCellSize = cellSize + cellBorderWidth
const tetrisFrontFieldHeight = borderedCellSize * (tetrisCells - 40) / 10
const tetrisFieldWidth = borderedCellSize * 10;
const level = document.querySelector('.menu-page__btn-lvl');
const menuHider = document.querySelector('.menu-page__btn-start');
const openMenu = document.querySelector('.game-page__left-bar__btn-menu');
const backTetris = document.createElement('div');
const frontTetris = document.getElementsByClassName('game-page__tetris-front')[0];
const excel = document.getElementsByClassName('excel');
const cells = document.getElementsByClassName('excel');
const inicialX = 5;
const inicialY = 10;
const figuresArray = [
    // вертикальная палка
    [
        [0, 1],
        [0, 2],
        [0, 3]
    ],
    // квадрат
    [
        [1, 0],
        [0, 1],
        [1, 1]
    ],
    // L
    [
        [1, 0],
        [0, 1],
        [0, 2]
    ],
    // Зеркальная L 
    [
        [1, 0],
        [1, 1],
        [1, 2]
    ],
    // Танк
    [
        [1, 0],
        [2, 0],
        [1, 1]
    ],
    // молния влево
    [
        [1, 0],
        [-1, 1],
        [0, 1]
    ],
    // молния вправо
    [
        [1, 0],
        [1, 1],
        [2, 1]
    ],

];

let currentFigure = 0;
let figureBody = 0;
//Обработчики событий

// Отображение уровня
level.addEventListener('mouseup', () => {
    const value = level.value;
    document.getElementById('menu-page-lvl').textContent = `Level: ${value}`;
    document.getElementById('game-page-lvl').textContent = `Level: ${value}`;
});
// Переключатель меню 
menuHider.addEventListener('click', () => {
    document.querySelector('.menu-page').classList.toggle('hidden');
    document.querySelector('.game-page').classList.toggle('hidden');
});
openMenu.addEventListener('click', () => {
    document.querySelector('.menu-page').classList.toggle('hidden');
    document.querySelector('.game-page').classList.toggle('hidden');
});

//Добавление клеток

function drawFill() {
    backTetris.classList.add('game-page__tetris-back');

    for (let i = 0; i < tetrisCells; i++) {
        const excel = document.createElement('div');
        excel.classList.add('excel');
        backTetris.appendChild(excel);
    }

    frontTetris.appendChild(backTetris);
}
//Присвоение клеткам координат x/y

function setCellsCoorinates() {

    let i = 0;

    for (let y = 18; y > 0; y--) {
        for (let x = 1; x <= 10; x++) {
            excel[i].setAttribute('posX', x);
            excel[i].setAttribute('posY', y);
            i++;
        }
    }
}

//Получение и отрисовка случайной фигуры
function getRandomFigure() {
    function getRandom() {
        return Math.round(Math.random() * (figuresArray.length - 1));
    }
    currentFigure = getRandom();

    figureBody = [
        document.querySelector(`[posX="${inicialX}"][posY="${inicialY}"]`),
        document.querySelector(`[posX="${inicialX+figuresArray[currentFigure][0][0]}"][posY="${inicialY+figuresArray[currentFigure][0][1]}"]`),
        document.querySelector(`[posX="${inicialX+figuresArray[currentFigure][1][0]}"][posY="${inicialY+figuresArray[currentFigure][1][1]}"]`),
        document.querySelector(`[posX="${inicialX+figuresArray[currentFigure][2][0]}"][posY="${inicialY+figuresArray[currentFigure][2][1]}"]`),
    ]

    for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.add('figure');
    }
}

//Устанавливаем размеры клетки
function setCellSize() {

    for (let i = 0; i < cells.length; i++) {
        cells[i].style.width = `${cellSize}px`;
        cells[i].style.height = `${cellSize}px`;
        cells[i].style.borderRight = `${cellBorderWidth}px solid #FFB800`;
        cells[i].style.borderBottom = `${cellBorderWidth}px solid #FFB800`;
    }
}

//Устанавливаем размеры игрового поля
function setTetrisFieldSize() {
    document.querySelector('.game-page__tetris-front').style.width = `${tetrisFieldWidth}px`;
    document.querySelector('.game-page__tetris-back').style.width = `${tetrisFieldWidth}px`;
    document.querySelector('.game-page__tetris-front').style.height = `${tetrisFrontFieldHeight}px`;
}

drawFill();
setCellsCoorinates();
setCellSize();
getRandomFigure();
setTetrisFieldSize();