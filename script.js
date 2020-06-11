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
const inicialY = 15;

const interval = setInterval(() => {
    move();
}, 1000);

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
let rowCounter = 0;
let flag = true;

//ОБРАБОТЧИКИ СОБЫТИЙ

//Отображение уровня
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

// Отключение действий браузера по умолчанию
document.addEventListener("keydown", function(event) {
    if (event.keyCode == 40 || event.keyCode == 38) {
        event.preventDefault();
    }
});

// Перемещение фигуры по нажатию клавиш
window.addEventListener('keydown', function(event) {

    let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
    let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
    let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
    let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

    function getNewState(direction) {
        flag = true;
        let figureNew = [
            document.querySelector(`[posX = "${+coordinates1[0]+direction}"][posY= "${coordinates1[1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0]+direction}"][posY= "${coordinates2[1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0]+direction}"][posY= "${coordinates3[1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0]+direction}"][posY= "${coordinates4[1]}"]`),
        ];

        for (let i = 0; i < figureNew.length; i++) {
            if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                flag = false;
            }
        }
        if (flag) {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }

            figureBody = figureNew;

            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
        }
    }
    if (event.keyCode == 37) {
        getNewState(-1);
    } else if (event.keyCode == 39) {
        getNewState(1);
    } else if (event.keyCode == 40) {
        move();
    }
});

//Заполнение игрового поля

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
    for (let y = 18; y > 0; y--) {
        for (let x = 1; x <= 10; x++) {
            excel[rowCounter].setAttribute('posX', x);
            excel[rowCounter].setAttribute('posY', y);
            rowCounter++;
        }
    }
}

//Получение и отрисовка случайной фигуры
function getFigure() {
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

// Передвижение фигуры с проверкой столкновения

function move() {
    let moveFlag = true;
    let coordinates = [
        [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
        [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
        [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
        [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
    ];

    for (let i = 0; i < coordinates.length; i++) {
        if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY= "${coordinates[i][1]-1}"]`).classList.contains('set')) {
            moveFlag = false;
            break;
        }
    }
    if (moveFlag) {
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
        }
        figureBody = [
            document.querySelector(`[posX = "${coordinates[0][0]}"][posY= "${coordinates[0][1]-1}"]`),
            document.querySelector(`[posX = "${coordinates[1][0]}"][posY= "${coordinates[1][1]-1}"]`),
            document.querySelector(`[posX = "${coordinates[2][0]}"][posY= "${coordinates[2][1]-1}"]`),
            document.querySelector(`[posX = "${coordinates[3][0]}"][posY= "${coordinates[3][1]-1}"]`),
        ];
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        }
    } else {
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
            figureBody[i].classList.add('set');
        }
        getFigure();
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
getFigure();
setTetrisFieldSize();