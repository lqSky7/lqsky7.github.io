document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    

    const darkMode = localStorage.getItem('darkMode') === 'true';
    

    if (darkMode) {
        html.classList.add('dark');
    }
    

    darkModeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        
        localStorage.setItem('darkMode', html.classList.contains('dark'));
    });
});