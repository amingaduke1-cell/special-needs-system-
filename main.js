const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

// Sidebar Logic: Open/Close
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Change burger to 'X'
    const icon = mobileMenu.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.className = 'bx bx-x';
    } else {
        icon.className = 'bx bx-menu';
    }
});

// Theme Logic: Light/Dark
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

// Load saved preference
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'bx bx-sun';
    }
};

// Close sidebar when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenu.querySelector('i').className = 'bx bx-menu';
    });
});