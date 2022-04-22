function navbar_js() {
    navbar_fixed();
    nav_dropmenu();
    change_logo();
}

function navbar_fixed() {
    const navbar = document.querySelector('.header__nav');
    const aux = document.querySelector('.content');
    const body = document.querySelector('body');
    //
    if (window.innerWidth >= 0) {
        window.addEventListener('scroll', function () {
            if ((aux.getBoundingClientRect().top < 0)) {
                navbar.classList.add('navbar_fixed');
                body.classList.add('body-scroll');
            } else {
                navbar.classList.remove('navbar_fixed');
                body.classList.remove('body-scroll');
            }
        })
    }
}

function change_logo() {
    const nav_logo = document.getElementById('nav-main_logo');
    const logo = document.querySelector('#main_logo');
    //
    if (window.innerWidth <= 500) {
        const pic = document.createElement('picture');
        pic.innerHTML = `
            <source srcset="/static/img/logo_burrito.avif" type="image/avif">
            <source srcset="/static/img/logo_burrito.webp" type="image/webp">
            <img src="/static/img/min/logo_burrito.png" alt="IMG Burrito (.PNG)" class="item__img">
        `;
        //
        logo.replaceWith(pic);
    }
}

function nav_dropmenu() {
    const dropmenu = document.getElementById('dropmenu');
    const menu = document.getElementById('nav_menu');
    //
    dropmenu.addEventListener('click', e => {
        menu.style.display = 'block';
        menu.style.position = 'absolute';
        dropmenu.addEventListener('click', e => {
            menu.style.display = 'none';
            menu.style.position = 'absolute';
            nav_dropmenu();
        });
    });
}