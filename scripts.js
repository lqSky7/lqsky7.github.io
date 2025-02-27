document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    setupThemeToggle();
    
    // Mobile menu functionality
    setupMobileMenu();
    
    // Animation on scroll
    setupScrollAnimations();
    
    // Text animation for the name
    animateNameText();
    
    // Fetch GitHub data
    fetchGitHubData();
});

// Setup theme toggle functionality
function setupThemeToggle() {
    const themeToggles = document.querySelectorAll('.input__check');
    
    // Set initial theme based on system preference or localStorage
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeToggles.forEach(toggle => toggle.checked = true);
    } else {
        document.documentElement.classList.remove('dark');
        themeToggles.forEach(toggle => toggle.checked = false);
    }
    
    // Add theme toggle event listeners
    themeToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            // Add transition class for smooth theme change
            document.documentElement.classList.add('theme-transition');
            
            if (this.checked) {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
            }
            
            // Remove transition class after animation completes
            setTimeout(() => {
                document.documentElement.classList.remove('theme-transition');
            }, 500);
        });
    });
}

// Setup mobile menu functionality
function setupMobileMenu() {
    const menuToggle = document.getElementById('checkbox');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('change', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when a link is clicked
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                menuToggle.checked = false;
            });
        });
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    // Function to check if element is in viewport
    function checkReveal() {
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Add initial check and scroll event listener
    window.addEventListener('scroll', checkReveal);
    checkReveal();
}

// Animate the name text
function animateNameText() {
    const nameElement = document.querySelector('h1.animate-text');
    
    if (nameElement) {
        nameElement.innerHTML = 'Diljot_Singh'.split('').map((char, i) => 
            `<span style="animation-delay: ${i * 0.1}s">${char}</span>`
        ).join('');
    }
}

// Fetch GitHub data
function fetchGitHubData() {
    const username = 'lqsky7';
    
    // Helper to create loading skeletons
    function createSkeletons(container, count) {
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton';
            container.appendChild(skeleton);
        }
    }
    
    // Create loading skeletons
    const statsContainer = document.getElementById('github-stats');
    const languagesContainer = document.getElementById('github-languages');
    const reposContainer = document.getElementById('github-repos');
    const commitContainer = document.getElementById('latest-commit');
    
    if (statsContainer) createSkeletons(statsContainer, 3);
    if (languagesContainer) createSkeletons(languagesContainer, 4);
    if (reposContainer) createSkeletons(reposContainer, 3);
    if (commitContainer) createSkeletons(commitContainer, 2);
    
    // In a real implementation, these would be actual API calls
    // For demonstration purposes, we'll simulate a response after a timeout
    
    setTimeout(() => {
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="mb-2">
                    <span class="text-blue-300">Repositories:</span> 15
                </div>
                <div class="mb-2">
                    <span class="text-blue-300">Followers:</span> 25
                </div>
                <div>
                    <span class="text-blue-300">Contributions:</span> 450+ this year
                </div>
            `;
        }
        
        if (languagesContainer) {
            languagesContainer.innerHTML = `
                <div class="flex items-center justify-between">
                    <span>Python</span>
                    <span class="text-violet-300">45%</span>
                </div>
                <div class="w-full bg-violet-900/30 h-2 rounded-full mb-3">
                    <div class="bg-violet-400 h-2 rounded-full" style="width: 45%"></div>
                </div>
                
                <div class="flex items-center justify-between">
                    <span>JavaScript</span>
                    <span class="text-violet-300">30%</span>
                </div>
                <div class="w-full bg-violet-900/30 h-2 rounded-full mb-3">
                    <div class="bg-violet-400 h-2 rounded-full" style="width: 30%"></div>
                </div>
                
                <div class="flex items-center justify-between">
                    <span>C++</span>
                    <span class="text-violet-300">15%</span>
                </div>
                <div class="w-full bg-violet-900/30 h-2 rounded-full">
                    <div class="bg-violet-400 h-2 rounded-full" style="width: 15%"></div>
                </div>
            `;
        }
        
        if (reposContainer) {
            reposContainer.innerHTML = `
                <a href="#" class="block p-2 hover:bg-white/5 rounded transition">
                    <div class="font-medium text-fuchsia-300">portfolio-website</div>
                    <div class="text-xs opacity-70">Personal portfolio showcasing projects</div>
                </a>
                
                <a href="#" class="block p-2 hover:bg-white/5 rounded transition">
                    <div class="font-medium text-fuchsia-300">data-visualization</div>
                    <div class="text-xs opacity-70">Python dashboard for analytics</div>
                </a>
                
                <a href="#" class="block p-2 hover:bg-white/5 rounded transition">
                    <div class="font-medium text-fuchsia-300">algo-challenges</div>
                    <div class="text-xs opacity-70">Collection of algorithm solutions</div>
                </a>
            `;
        }
        
        if (commitContainer) {
            commitContainer.innerHTML = `
                <div class="mb-2">
                    <div class="font-medium text-rose-300">Update README.md</div>
                    <div class="text-xs opacity-70">2 days ago</div>
                </div>
                <p class="text-sm">Added project screenshots and updated documentation</p>
            `;
        }
    }, 1500);
}

// Page transition effects
window.addEventListener('beforeunload', function() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    // Animate the transition
    transition.style.transition = 'transform 0.5s ease';
    transition.style.transform = 'translateY(0)';
});
