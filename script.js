//Объявление констант
const cellSize = 40;
const tetrisCells = 180;
const cellBorderWidth = 1;
const borderedCellSize = cellSize + cellBorderWidth;
const tetrisFrontFieldHeight = borderedCellSize * (tetrisCells - 40) / 10;
const tetrisFieldWidth = borderedCellSize * 10;
const level = document.querySelector('.menu-page__btn-lvl');
const menuHider = document.querySelector('.menu-page__btn-start');
const menuOpener = document.querySelector('.game-page__left-bar__btn-menu');
const tetrisBackField = document.createElement('div');
const tetrisFrontField = document.getElementsByClassName('game-page__tetris-front')[0];
const excel = document.getElementsByClassName('cell');
const cellsArray = document.getElementsByClassName('cell');
const inicialX = 5;
const inicialY = 15;
let interval;
let gameStatus = true;
let gameSpeed;
let currentFigure = 0;
let figureBody = 0;
let rotate = 1;
let rotationFlag = true;
let figuresArray = [
    [
        [0, 1],
        [0, 2],
        [0, 3],
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2]
        ],
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2]
        ],
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2]
        ],
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2]
        ]
    ],
    [
        [1, 0],
        [0, 1],
        [1, 1],
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ]
    ],
    [
        [1, 0],
        [0, 1],
        [0, 2],
        [
            [0, 2],
            [-1, 1],
            [1, 1],
            [2, 0]
        ],
        [
            [2, 0],
            [1, 1],
            [1, -1],
            [0, -2]
        ],
        [
            [0, -2],
            [1, -1],
            [-1, -1],
            [-2, 0]
        ],
        [
            [-2, 0],
            [-1, -1],
            [-1, 1],
            [0, 2]
        ]
    ],
    [
        [1, 0],
        [1, 1],
        [1, 2],
        [
            [-1, 1],
            [-2, 0],
            [-1, -1],
            [0, -2]
        ],
        [
            [1, 1],
            [0, 2],
            [-1, 1],
            [-2, 0]
        ],
        [
            [1, -1],
            [2, 0],
            [1, 1],
            [0, 2]
        ],
        [
            [-1, -1],
            [0, -2],
            [1, -1],
            [2, 0]
        ]
    ],
    [
        [1, 0],
        [1, 1],
        [2, 1],
        [
            [1, 1],
            [0, 0],
            [1, -1],
            [0, -2]
        ],
        [
            [1, -1],
            [0, 0],
            [-1, -1],
            [-2, 0]
        ],
        [
            [-1, -1],
            [0, 0],
            [-1, 1],
            [0, 2]
        ],
        [
            [-1, 1],
            [0, 0],
            [1, 1],
            [2, 0]
        ]
    ],
    [
        [1, 0],
        [-1, 1],
        [0, 1],
        [
            [-1, 1],
            [-2, 0],
            [1, 1],
            [0, 0]
        ],
        [
            [1, 1],
            [0, 2],
            [1, -1],
            [0, 0]
        ],
        [
            [1, -1],
            [2, 0],
            [-1, -1],
            [0, 0]
        ],
        [
            [-1, -1],
            [0, -2],
            [-1, 1],
            [0, 0]
        ]
    ],
    [
        [1, 0],
        [2, 0],
        [1, 1],
        [
            [1, -1],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        [
            [0, 0],
            [-1, 0],
            [-1, 0],
            [1, -1]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [-1, 1]
        ],
        [
            [-1, 1],
            [1, 0],
            [1, 0],
            [0, 0]
        ]
    ],
]

//ОБРАБОТЧИКИ СОБЫТИЙ

//Отображение уровня
level.addEventListener('mouseup', () => {
    let value = level.value;
    document.getElementById('menu-page-lvl').textContent = `Level: ${value}`;
    document.getElementById('game-page-lvl').textContent = `Level: ${value}`;
});

// Переключатель меню 
menuHider.addEventListener('click', () => {
    document.querySelector('.menu-page').classList.toggle('hidden');
    document.querySelector('.game-page').classList.toggle('hidden');
    gameSpeed = 1200 - level.value * 100;
    gameStatus = true;
    setGameStatus(gameStatus, gameSpeed);
});
menuOpener.addEventListener('click', () => {
    document.querySelector('.menu-page').classList.toggle('hidden');
    document.querySelector('.game-page').classList.toggle('hidden');
    gameStatus = false;
    setGameStatus(gameStatus, gameSpeed);
});


// Перемещение фигуры по нажатию клавиш
window.addEventListener('keydown', function(event) {
    if (event.key == 'ArrowLeft') {
        move(-1, 0);
    } else if (event.key == 'ArrowRight') {
        move(1, 0);
    } else if (event.key == 'ArrowDown') {
        move(0, -1);
    } else if (event.key == 'ArrowUp') {
        move(0, 1);
    }
});

//ФУНКЦИИ

//Заполнение игрового поля
function drawFill() {
    tetrisBackField.classList.add('game-page__tetris-back');
    for (let i = 0; i < tetrisCells; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        tetrisBackField.appendChild(cell);
    }
    tetrisFrontField.appendChild(tetrisBackField);
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

//Добавляем клеткам фигуры класс "figure"
function addFigureClass(figureBody) {
    for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.add('figure');
    }
}

//Удаляем у клеток фигуры класс "figure"
function removeFigureClass(figureBody) {
    for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.remove('figure');
    }
}

//Получение случайной фигуры
function getFigure() {
    function getRandom() {
        return Math.round(Math.random() * (figuresArray.length - 1));
    }
    rotate = 1;
    currentFigure = getRandom();
    figureBody = [
        document.querySelector(`[posX="${inicialX}"][posY="${inicialY}"]`),
        document.querySelector(`[posX="${inicialX+figuresArray[currentFigure][0][0]}"][posY="${inicialY+figuresArray[currentFigure][0][1]}"]`),
        document.querySelector(`[posX="${inicialX+figuresArray[currentFigure][1][0]}"][posY="${inicialY+figuresArray[currentFigure][1][1]}"]`),
        document.querySelector(`[posX="${inicialX+figuresArray[currentFigure][2][0]}"][posY="${inicialY+figuresArray[currentFigure][2][1]}"]`),
    ];
    addFigureClass(figureBody);
}

// Передвижение фигуры
function move(xDirection, yDirection) {
    let moveFlag = true;
    let coordinates = [
        [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
        [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
        [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
        [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
    ];
    if (yDirection == -1) {
        for (let i = 0; i < coordinates.length; i++) {
            if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY= "${coordinates[i][1]-1}"]`).hasAttribute('stuckedFigure')) {
                moveFlag = false;
                break;
            }
        }
        if (moveFlag) {
            removeFigureClass(figureBody);
            figureBody = changeFigureBodyCoordinates(coordinates, xDirection, yDirection);
            addFigureClass(figureBody);
        } else {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].setAttribute('stuckedFigure', '');
            }
            for (let i = 1; i < 15; i++) {
                let count = 0;
                for (let k = 1; k < 11; k++) {
                    if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).hasAttribute('stuckedFigure')) {
                        count++;
                        if (count == 10) {
                            for (let m = 1; m < 11; m++) {
                                document.querySelector(`[posX = "${m}"][posY = "${i}"]`).removeAttribute('stuckedFigure');
                                document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('figure');
                            }
                            let stuckedFiguresArray = Array.from(document.querySelectorAll('[stuckedFigure]'));
                            let newStuckedFiguresArray = [];
                            for (let s = 0; s < stuckedFiguresArray.length; s++) {
                                let stuckedFiguresCoordinates = [stuckedFiguresArray[s].getAttribute('posX'), stuckedFiguresArray[s].getAttribute('posY')];
                                if (stuckedFiguresCoordinates[1] > i) {
                                    stuckedFiguresArray[s].removeAttribute('stuckedFigure');
                                    stuckedFiguresArray[s].classList.remove('figure');
                                    newStuckedFiguresArray.push(document.querySelector(`[posX = "${stuckedFiguresCoordinates[0]}"][posY = "${stuckedFiguresCoordinates[1]-1}"]`));
                                }
                            }
                            for (let a = 0; a < newStuckedFiguresArray.length; a++) {
                                newStuckedFiguresArray[a].setAttribute('stuckedFigure', '');
                                newStuckedFiguresArray[a].classList.add('figure');
                            }
                            i--;
                        }
                    }
                }
            }
            getFigure();
        }
    } else if (xDirection == 1 || xDirection == -1) {
        let figureNew = changeFigureBodyCoordinates(coordinates, xDirection, yDirection);
        for (let i = 0; i < figureNew.length; i++) {
            if (!figureNew[i] || figureNew[i].hasAttribute('stuckedFigure')) {
                moveFlag = false;
            }
        }
        if (moveFlag) {
            removeFigureClass(figureBody);
            figureBody = figureNew;
            addFigureClass(figureBody);
        }
    } else if (yDirection == 1) {
        rotationFlag = true;
        let figureNew = [
            document.querySelector(`[posX = "${+coordinates[0][0] + figuresArray[currentFigure][rotate + 2][0][0]}"][posY = "${
          +coordinates[0][1] + figuresArray[currentFigure][rotate + 2][0][1]}"]`),
            document.querySelector(`[posX = "${+coordinates[1][0] + figuresArray[currentFigure][rotate + 2][1][0]}"][posY = "${
          +coordinates[1][1] + figuresArray[currentFigure][rotate + 2][1][1]}"]`),
            document.querySelector(`[posX = "${+coordinates[2][0] + figuresArray[currentFigure][rotate + 2][2][0]}"][posY = "${
          +coordinates[2][1] + figuresArray[currentFigure][rotate + 2][2][1]}"]`),
            document.querySelector(`[posX = "${+coordinates[3][0] + figuresArray[currentFigure][rotate + 2][3][0]}"][posY = "${
          +coordinates[3][1] + figuresArray[currentFigure][rotate + 2][3][1]}"]`),
        ];
        for (let i = 0; i < figureNew.length; i++) {
            if (!figureNew[i] || figureNew[i].hasAttribute('stuckedFigure')) {
                rotationFlag = false;
            }
        }
        if (rotationFlag) {
            removeFigureClass(figureBody);
            figureBody = figureNew;
            addFigureClass(figureBody);

            if (rotate < 4) {
                rotate++;
            } else {
                rotate = 1;
            }
        }
    }
}

//Установка состояния игры
function setGameStatus(gameStatus, gameSpeed) {
    if (gameStatus) {
        getFigure();
        interval = setInterval(() => {
            move(0, -1);
        }, gameSpeed);
    } else {
        clearInterval(interval);
        for (let i = 0; i < tetrisCells; i++) {
            excel[i].classList.remove('figure');
            excel[i].removeAttribute('stuckedFigure');
        }
    }
}

// Изменение координат фигуры
function changeFigureBodyCoordinates(coordinates, xDirection, yDirection) {
    let changedFigureBody = [
        document.querySelector(`[posX = "${+coordinates[0][0]+xDirection}"][posY= "${+coordinates[0][1]+yDirection}"]`),
        document.querySelector(`[posX = "${+coordinates[1][0]+xDirection}"][posY= "${+coordinates[1][1]+yDirection}"]`),
        document.querySelector(`[posX = "${+coordinates[2][0]+xDirection}"][posY= "${+coordinates[2][1]+yDirection}"]`),
        document.querySelector(`[posX = "${+coordinates[3][0]+xDirection}"][posY= "${+coordinates[3][1]+yDirection}"]`),
    ];
    return changedFigureBody;
}

//Установка размеров клетки
function setCellSize() {
    for (let i = 0; i < cellsArray.length; i++) {
        cellsArray[i].style.width = `${cellSize}px`;
        cellsArray[i].style.height = `${cellSize}px`;
        cellsArray[i].style.borderRight = `${cellBorderWidth}px solid #FFB800`;
        cellsArray[i].style.borderBottom = `${cellBorderWidth}px solid #FFB800`;
    }
}

//Установка размеров игрового поля
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