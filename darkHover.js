document.addEventListener('DOMContentLoaded', () => {
    console.log("monitoring click event");
    const themeToggleDiv = document.querySelector('.theme-toggle');
    
    themeToggleDiv.addEventListener('mouseenter', () => {
        const icon = themeToggleDiv.firstElementChild;
        if (icon) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        }
    });
    themeToggleDiv.addEventListener('click', () => {
        const icon = themeToggleDiv.firstElementChild;
        
        if (icon && icon.classList.contains('fa-sun')) {
            icon.classList.remove('fa-sun', 'fa-regular');
            icon.classList.add('fa-moon', 'fa-solid');
        } else if (icon) {
            icon.classList.remove('fa-moon', 'fa-solid');
            icon.classList.add('fa-sun', 'fa-regular');
        }
    });

    themeToggleDiv.addEventListener('mouseleave', () => {
        const icon = themeToggleDiv.firstElementChild;
        if (icon && icon.classList.contains('fa-sun')) {  // Only revert to regular if it's the sun icon
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
        }
    });
});
    // Click handler for theme toggle

    // Hover handlers
