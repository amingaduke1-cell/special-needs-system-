/* ================================
   ELEMENTS
================================ */

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

/* ================================
   MOBILE MENU TOGGLE
================================ */

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {

        navMenu.classList.toggle('active');

        const icon = mobileMenu.querySelector('i');

        if (navMenu.classList.contains('active')) {
            icon.className = 'bx bx-x';
        } else {
            icon.className = 'bx bx-menu';
        }

    });
}

/* ================================
   THEME TOGGLE
================================ */

if (themeToggle) {

    themeToggle.addEventListener('click', () => {

        const root = document.documentElement;
        const isDark = root.getAttribute('data-theme') === 'dark';

        if (isDark) {

            root.setAttribute('data-theme', 'light');
            themeIcon.className = 'bx bx-moon';
            localStorage.setItem('theme', 'light');

        } else {

            root.setAttribute('data-theme', 'dark');
            themeIcon.className = 'bx bx-sun';
            localStorage.setItem('theme', 'dark');

        }

    });

}

/* ================================
   LOAD SAVED THEME
================================ */

window.addEventListener('DOMContentLoaded', () => {

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {

        document.documentElement.setAttribute('data-theme', 'dark');

        if (themeIcon) {
            themeIcon.className = 'bx bx-sun';
        }

    }

});

/* ================================
   CLOSE MENU WHEN LINK CLICKED
================================ */

document.querySelectorAll('.nav-links a').forEach(link => {

    link.addEventListener('click', () => {

        navMenu.classList.remove('active');

        const icon = mobileMenu.querySelector('i');
        icon.className = 'bx bx-menu';

    });

});