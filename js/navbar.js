document.getElementById('dropdown-items').addEventListener('click', function() {
    document.getElementById('navMenu').classList.toggle('active');
});

/* Theme change */
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

themeIcon.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeIcon.src = './images/moon.png';
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeIcon.src = './images//sun.png';
    }
});