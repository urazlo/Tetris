// Отображение уровня
let level = document.querySelector('.btn-lvl');
level.addEventListener('mouseup', () => {
    let value = level.value;
    document.getElementById('menuPg-lvl').textContent = `Level: ${value}`;
    document.getElementById('gamePg-lvl').textContent = `Level: ${value}`;
});

// Menu switch
let hideMenu = document.querySelector('.btn-strt');
hideMenu.addEventListener('click', () => {
    document.querySelector('.menuPg').classList.toggle('hidden');
    document.querySelector('.gamePg').classList.toggle('hidden');
});

let openMenu = document.querySelector('.btn-menu');
openMenu.addEventListener('click', () => {
    document.querySelector('.menuPg').classList.toggle('hidden');
    document.querySelector('.gamePg').classList.toggle('hidden');
});

//createTable
let backTetris = document.createElement('div');
backTetris.classList.add('gamePg-backTetris');

for (let i = 1; i < 181; i++) {
    let excel = document.createElement('div');
    excel.classList.add('excel');
    backTetris.appendChild(excel);
}

let frontTetris = document.getElementsByClassName('gamePg-frontTetris')[0];
frontTetris.appendChild(backTetris);