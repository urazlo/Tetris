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
const gameStats = {
  score: 0,
  record: 0,
};
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
  document.querySelector('.menu-page').classList.toggle('hidden');
  document.querySelector('.game-page').classList.toggle('hidden');
  gameStatus = true;
  nextFigureFlag = false;
  gameStats.score = 0;
  gameSpeed -= level.value * 100;
  document.getElementsByClassName('game-page__right-bar__score')[0].textContent = `Score: ${gameStats.score}`;
  removeFigureClass(nextFigureBody);
  getNextFigure();
  setGameStatus(gameStatus, gameSpeed);
});

menuOpener.addEventListener('click', () => {
  document.querySelector('.menu-page').classList.toggle('hidden');
  document.querySelector('.game-page').classList.toggle('hidden');
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

function showNextFigure() {
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
  addFigureClass(figureBody);
}

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
  addFigureClass(nextFigureBody);
  return nextFigure;
}

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
  console.log(gameSpeed, level.value);
  let moveFlag = true;
  let coordinates = [
    [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
    [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
    [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
    [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
  ];
  if (yDirection == -1) {
    document.getElementsByClassName('game-page__right-bar__score')[0].textContent = `Score: ${gameStats.score}`;
    document.getElementsByClassName('game-page__right-bar__record')[0].textContent = `Record: ${gameStats.record}`;
    for (let i = 0; i < coordinates.length; i++) {
      if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY= "${coordinates[i][1] - 1}"]`).hasAttribute('stuckedFigure')) {
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
        let fullLineCount = 0;
        for (let k = 1; k < 11; k++) {
          if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).hasAttribute('stuckedFigure')) {
            fullLineCount++;
            if (fullLineCount == 10) {
              linesClearedPerLvl++;
              if (linesClearedPerLvl == 2) {
                changeGameSpeed();
              }
              gameStats.score += 50 * level.value;
              if (gameStats.score > gameStats.record) {
                gameStats.record = gameStats.score;
              }
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
                  newStuckedFiguresArray.push(document.querySelector(`[posX = "${stuckedFiguresCoordinates[0]}"][posY = "${stuckedFiguresCoordinates[1] - 1}"]`));
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
      for (let n = 1; n < 11; n++) {
        if (document.querySelector(`[posX = "${n}"][posY = "15"]`).hasAttribute('stuckedFigure')) {
          gameSpeed = 1200;
          level.value = 1;
          setGameStatus(false, gameSpeed);
          confirm(`Game over. Your score is ${gameStats.score}. Current record is ${gameStats.record}`);
          document.getElementById('menu-page-lvl').textContent = `Level: ${level.value}`;
          document.querySelector('.menu-page').classList.toggle('hidden');
          document.querySelector('.game-page').classList.toggle('hidden');
          break;
        }
      }
      removeFigureClass(nextFigureBody);
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
    getFigure(false);
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

//Изменение скорости игры
function changeGameSpeed() {
  linesClearedPerLvl = 0;
  clearInterval(interval);
  gameSpeed -= 100;
  level.value = Number(level.value) + 1;
  document.getElementById('game-page-lvl').textContent = `Level: ${level.value}`;
  interval = setInterval(() => {
    move(0, -1);
  }, gameSpeed);
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
showNextFigure();
setCellsCoorinates();
setNextFigureCellsCoorinates();
setCellSize();
setNextFigureCellSize();
setTetrisFieldSize();

