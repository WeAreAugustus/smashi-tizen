//Splash Screen Script
const splash = document.querySelector('.splash');
const logo = document.querySelector('.logo');


document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(() => {
        splash.classList.add('move-up');
    }, 2000);

    setTimeout(() => {
        logo.classList.add('spin');
    }, 3000);

    setTimeout(() => {
        splash.classList.add('remove');
    }, 4000);
})