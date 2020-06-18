//Объявление констант
const cellSize = 40;
const tetrisCells = 180;
const nextFigureFieldCells = 16;
const cellBorderWidth = 1;
const borderedCellSize = cellSize + cellBorderWidth;
const tetrisFrontFieldHeight = borderedCellSize * (tetrisCells - 40) / 10;
const tetrisFieldWidth = borderedCellSize * 10;
const tetrisNextFigureFieldSize = borderedCellSize * 4;
const level = document.querySelector('.menu-page__btn-lvl');
const menuHider = document.querySelector('.menu-page__btn-start');
const menuOpener = document.querySelector('.game-page__left-bar__btn-menu');
const tetrisBackField = document.createElement('div');
const tetrisFrontField = document.getElementsByClassName('game-page__tetris-front')[0];
const tetrisNextFigureField = document.getElementsByClassName('game-page__left-bar__next-figure')[0];
const excel = document.getElementsByClassName('cell');
const nextFigureCell = document.getElementsByClassName('nextFigureCell');
const nextFigureCellsArray = document.getElementsByClassName('nextFigureCell');
const cellsArray = document.getElementsByClassName('cell');
const audioBtn = document.querySelector('.game-page__right-bar__btn-mute');
const inicialX = 5;
const inicialY = 15;
const nextFigureInicialX = 2;
const nextFigureInicialY = 1;
const figureColorClasses = ['figureBlue', 'figureRed', 'figureGreen', 'figurePurple', 'figureLightBlue'];

let score = 0;
let record = 0;
let currentColor;
let interval;
let difficulty;
let linesClearedPerLvl = 0;
let gameStatus = true;
let gameSpeed = 1200;
let currentFigure = 0;
let nextFigure = 0;
let figureBody = 0;
let nextFigureBody = 0;
let rotate = 1;
let nextFigureFlag = false;
let rotationFlag = true;
let mute = true;
let figureColor;
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

//music
audioBtn.addEventListener('click', () => {
  let audio = document.getElementsByTagName('audio')[0];
  if (mute) {
    mute = !mute;
    audio.volume = 0;
  } else {
    audio.volume = 1;
    mute = !mute;
  }
});

//Отображение уровня
level.addEventListener('mouseup', () => {
  document.getElementById('menu-page-lvl').textContent = `Level: ${level.value}`;
  document.getElementById('game-page-lvl').textContent = `Level: ${level.value}`;
});

// Переключатель меню 
menuHider.addEventListener('click', () => {
  menuToggle();
  gameStatus = true;
  nextFigureFlag = false;
  score = 0;
  gameSpeed -= level.value * 100;
  document.getElementsByClassName('game-page__right-bar__score')[0].textContent = `Score: ${score}`;
  removeColorClass(nextFigureBody, figureColor);
  getNextFigure();
  setGameStatus(gameStatus, gameSpeed);
});
menuOpener.addEventListener('click', () => {
  menuToggle();
  removeColorClass(nextFigureBody, figureColor);
  gameStatus = false;
  gameSpeed = 1200;
  setGameStatus(gameStatus, gameSpeed);
});

// Перемещение фигуры по нажатию клавиш
window.addEventListener('keydown', function (event) {
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

//Переключение меню
function menuToggle() {
  document.querySelector('.menu-page').classList.toggle('hidden');
  document.querySelector('.game-page').classList.toggle('hidden');
}

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

//Отрисовка следующей фигуры
function drawNextFigure() {
  tetrisNextFigureField.classList.add('game-page__left-bar__next-figure');
  for (let i = 0; i < nextFigureFieldCells; i++) {
    let nextFigureFieldDiv = document.createElement('div');
    nextFigureFieldDiv.classList.add('nextFigureCell');
    tetrisNextFigureField.appendChild(nextFigureFieldDiv);
  }
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
function addColorClass(figureBody, figureColor) {
  for (let i = 0; i < figureBody.length; i++) {
    if (figureColor == (`${figureColorClasses[0]}`)) {
      figureBody[i].classList.add((`${figureColorClasses[0]}`));
    } else if (figureColor == (`${figureColorClasses[1]}`)) {
      figureBody[i].classList.add((`${figureColorClasses[1]}`));
    } else if (figureColor == (`${figureColorClasses[2]}`)) {
      figureBody[i].classList.add((`${figureColorClasses[2]}`));
    } else if (figureColor == (`${figureColorClasses[3]}`)) {
      figureBody[i].classList.add((`${figureColorClasses[3]}`));
    } else {
      figureBody[i].classList.add((`${figureColorClasses[4]}`));
    }
  }
}

//Удаляем у клеток фигуры класс "figure"
function removeColorClass(figureBody) {
  for (let i = 0; i < figureBody.length; i++) {
    figureBody[i].classList.remove(`${figureColorClasses[0]}`);
    figureBody[i].classList.remove(`${figureColorClasses[1]}`);
    figureBody[i].classList.remove(`${figureColorClasses[2]}`);
    figureBody[i].classList.remove(`${figureColorClasses[3]}`);
    figureBody[i].classList.remove(`${figureColorClasses[4]}`);
  }
}

//Установка цвета фигуры
function setFigureColor() {
  function getRandom() {
    return Math.round(Math.random() * (figureColorClasses.length - 1));
  }
  figureColor = figureColorClasses[getRandom()];
  return figureColor;
}

//Получение случайной фигуры
function getFigure(nextFigureFlag) {
  function getRandom() {
    return Math.round(Math.random() * (figuresArray.length - 1));
  }
  rotate = 1;
  currentFigure = getRandom();
  if (nextFigureFlag) {
    currentFigure = nextFigure;
  }
  figureBody = [
    document.querySelector(`[posX="${inicialX}"][posY="${inicialY}"]`),
    document.querySelector(`[posX="${inicialX + figuresArray[currentFigure][0][0]}"][posY="${inicialY + figuresArray[currentFigure][0][1]}"]`),
    document.querySelector(`[posX="${inicialX + figuresArray[currentFigure][1][0]}"][posY="${inicialY + figuresArray[currentFigure][1][1]}"]`),
    document.querySelector(`[posX="${inicialX + figuresArray[currentFigure][2][0]}"][posY="${inicialY + figuresArray[currentFigure][2][1]}"]`),
  ];
  addColorClass(figureBody, figureColor);
}

// function getFigureBody(inicialX, inicialY, posX, posY) {
//   figureBody = [
//     document.querySelector(`[${posX}="${inicialX}"][${posY}="${inicialY}"]`),
//     document.querySelector(`[${posX}="${inicialX + figuresArray[currentFigure][0][0]}"][${posY}="${inicialY + figuresArray[currentFigure][0][1]}"]`),
//     document.querySelector(`[${posX}="${inicialX + figuresArray[currentFigure][1][0]}"][${posY}="${inicialY + figuresArray[currentFigure][1][1]}"]`),
//     document.querySelector(`[${posX}="${inicialX + figuresArray[currentFigure][2][0]}"][${posY}="${inicialY + figuresArray[currentFigure][2][1]}"]`),
//   ];
//   return figureBody;
// }

//Получение следующей фигуры
function getNextFigure() {
  function getRandom() {
    return Math.round(Math.random() * (figuresArray.length - 1));
  }
  nextFigure = getRandom();
  nextFigureBody = [
    document.querySelector(`[posXnext="${nextFigureInicialX}"][posYnext="${nextFigureInicialY}"]`),
    document.querySelector(`[posXnext="${nextFigureInicialX + figuresArray[nextFigure][0][0]}"][posYnext="${nextFigureInicialY + figuresArray[nextFigure][0][1]}"]`),
    document.querySelector(`[posXnext="${nextFigureInicialX + figuresArray[nextFigure][1][0]}"][posYnext="${nextFigureInicialY + figuresArray[nextFigure][1][1]}"]`),
    document.querySelector(`[posXnext="${nextFigureInicialX + figuresArray[nextFigure][2][0]}"][posYnext="${nextFigureInicialY + figuresArray[nextFigure][2][1]}"]`),
  ];
  currentColor = figureColor;
  figureColor = setFigureColor();
  addColorClass(nextFigureBody, figureColor);
  return nextFigure;
}

//Установка координат следующей фигуры
function setNextFigureCellsCoorinates() {
  let i = 0;
  for (let y = 4; y > 0; y--) {
    for (let x = 1; x <= 4; x++) {
      nextFigureCellsArray[i].setAttribute('posXnext', x);
      nextFigureCellsArray[i].setAttribute('posYnext', y);
      i++;
    }
  }
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
    document.getElementsByClassName('game-page__right-bar__score')[0].textContent = `Score: ${score}`;
    document.getElementsByClassName('game-page__right-bar__record')[0].textContent = `Record: ${localStorage.getItem('record')}`;
    for (let i = 0; i < coordinates.length; i++) {
      if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY= "${coordinates[i][1] - 1}"]`).hasAttribute('stuckedFigure')) {
        moveFlag = false;
        break;
      }
    }
    if (moveFlag) {
      removeColorClass(figureBody);
      figureBody = changeFigureBodyCoordinates(coordinates, xDirection, yDirection);
      addColorClass(figureBody, currentColor);
    } else {
      for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].setAttribute('stuckedFigure', '');
      }
      for (let y = 1; y < 15; y++) {
        let fullLineCount = 0;
        for (let x = 1; x < 11; x++) {
          if (document.querySelector(`[posX = "${x}"][posY = "${y}"]`).hasAttribute('stuckedFigure')) {
            fullLineCount++;
            if (fullLineCount == 10) {
              linesClearedPerLvl++;
              if (linesClearedPerLvl == 1) {
                changeGameSpeed();
              }
              score += 50 * level.value;
              if (score > localStorage.getItem('record')) {
                localStorage.setItem('record', record = score);
              }
              for (let x2 = 1; x2 < 11; x2++) {
                for (let y2 = y; y2 < 15 - y; y2++) {
                  const nextCell = document.querySelector(`[posX = "${x2}"][posY = "${y2 + 1}"]`); // Фигура выше 
                  const currentCell = document.querySelector(`[posX = "${x2}"][posY = "${y2}"]`); // Текущая
                  currentCell.className = nextCell.className; // Копируем всё

                  if (nextCell.hasAttribute('stuckedFigure')) {
                    currentCell.setAttribute('stuckedFigure', '');
                  } else {
                    currentCell.removeAttribute('stuckedFigure');
                  }
                }
              }
              y--;
            }
          }
        }
      }
      for (let n = 1; n < 11; n++) {
        if (document.querySelector(`[posX = "${n}"][posY = "15"]`).hasAttribute('stuckedFigure')) {
          gameSpeed = 1200;
          level.value = 1;
          setGameStatus(false, gameSpeed);
          confirm(`Game over. Your score is ${score}. Current record is ${localStorage.getItem('record')}`);
          document.getElementById('menu-page-lvl').textContent = `Level: ${level.value}`;
          menuToggle();
          break;
        }
      }
      removeColorClass(nextFigureBody);
      getFigure(true);
      getNextFigure();
    }
  } else if (xDirection == 1 || xDirection == -1) {
    let figureNew = changeFigureBodyCoordinates(coordinates, xDirection, yDirection);
    for (let i = 0; i < figureNew.length; i++) {
      if (!figureNew[i] || figureNew[i].hasAttribute('stuckedFigure')) {
        moveFlag = false;
      }
    }
    if (moveFlag) {
      removeColorClass(figureBody);
      figureBody = figureNew;
      addColorClass(figureBody, currentColor);
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
      removeColorClass(figureBody);
      figureBody = figureNew;
      addColorClass(figureBody, currentColor);
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
    getFigure(false);
    interval = setInterval(() => {
      move(0, -1);
    }, gameSpeed);
  } else {
    clearInterval(interval);
    for (let i = 0; i < tetrisCells; i++) {
      excel[i].classList.remove('figureBlue');
      excel[i].classList.remove('figureRed');
      excel[i].classList.remove('figureGreen');
      excel[i].classList.remove('figurePurple');
      excel[i].classList.remove('figureLightBlue');
      excel[i].removeAttribute('stuckedFigure');
    }
  }
}

//Изменение скорости игры
function changeGameSpeed() {
  if (Number(level.value) < 10) {
    linesClearedPerLvl = 0;
    clearInterval(interval);
    gameSpeed -= 100;
    level.value = Number(level.value) + 1;
    document.getElementById('game-page-lvl').textContent = `Level: ${level.value}`;
    interval = setInterval(() => {
      move(0, -1);
    }, gameSpeed);
  }
}

// Изменение координат фигуры
function changeFigureBodyCoordinates(coordinates, xDirection, yDirection) {
  let changedFigureBody = [
    document.querySelector(`[posX = "${+coordinates[0][0] + xDirection}"][posY= "${+coordinates[0][1] + yDirection}"]`),
    document.querySelector(`[posX = "${+coordinates[1][0] + xDirection}"][posY= "${+coordinates[1][1] + yDirection}"]`),
    document.querySelector(`[posX = "${+coordinates[2][0] + xDirection}"][posY= "${+coordinates[2][1] + yDirection}"]`),
    document.querySelector(`[posX = "${+coordinates[3][0] + xDirection}"][posY= "${+coordinates[3][1] + yDirection}"]`),
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

//Установка размеров клетки следующей фигуры
function setNextFigureCellSize() {
  for (let i = 0; i < nextFigureCellsArray.length; i++) {
    nextFigureCellsArray[i].style.width = `${cellSize}px`;
    nextFigureCellsArray[i].style.height = `${cellSize}px`;
    nextFigureCellsArray[i].style.borderRight = `${cellBorderWidth}px solid #FFB800`;
    nextFigureCellsArray[i].style.borderBottom = `${cellBorderWidth}px solid #FFB800`;
  }
}

//Установка размеров игрового поля
function setTetrisFieldSize() {
  document.querySelector('.game-page__tetris-front').style.width = `${tetrisFieldWidth}px`;
  document.querySelector('.game-page__tetris-back').style.width = `${tetrisFieldWidth}px`;
  document.querySelector('.game-page__tetris-front').style.height = `${tetrisFrontFieldHeight}px`;
  document.querySelector('.game-page__left-bar__next-figure').style.width = `${tetrisNextFigureFieldSize}px`;
  document.querySelector('.game-page__left-bar__next-figure').style.height = `${tetrisNextFigureFieldSize}px`;
}

drawFill();
drawNextFigure();
setCellsCoorinates();
setNextFigureCellsCoorinates();
setCellSize();
setNextFigureCellSize();
setTetrisFieldSize();