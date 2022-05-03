const body = document.body;
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menuBtn');

let isOpened = false;

function menuToggle() {
    isOpened = !isOpened;
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('block');
}

function resizeHandler(e) {
    if (e.target.innerWidth > 880 && isOpened) {
        menuToggle();
    }
}

function addWindowListener() {
    window.addEventListener('resize', resizeHandler);
}

addWindowListener();
