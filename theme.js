document.addEventListener("DOMContentLoaded", () => {

  const toggleButton = document.getElementById('theme-toggle');

  if (!toggleButton) return; // safety check

  // Load saved theme
  if (localStorage.getItem('theme') === 'night') {
    document.documentElement.setAttribute('data-theme', 'night');
    toggleButton.textContent = '☀️';
  } else {
    document.documentElement.setAttribute('data-theme', 'day');
    toggleButton.textContent = '🌙';
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

});