const toggleButton = document.getElementById('theme-toggle');

// Check saved theme on page load
if (localStorage.getItem('theme') === 'night') {
    document.documentElement.setAttribute('data-theme', 'night');
    toggleButton.textContent = '☀️';
}

toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'night') {
        document.documentElement.setAttribute('data-theme', 'day');
        localStorage.setItem('theme', 'day');
        toggleButton.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'night');
        localStorage.setItem('theme', 'night');
        toggleButton.textContent = '☀️';
    }
});
