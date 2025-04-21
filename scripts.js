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
    
    // Initialize advanced animations
    initAdvancedAnimations();
    
    // Initialize page transitions
    initPageTransitions();
    
    // Initialize 3D card effects
    init3DCardEffects();
    
    // Initialize magnetic buttons
    initMagneticButtons();
    
    // Initialize card tilt effects
    initCardTilt();
    
    // Initialize skill bubble hover effects
    initSkillBubbles();
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
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMobile = document.getElementById('navbar-mobile');
    
    if (!navbarToggle || !navbarMobile) return;
    
    navbarToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarMobile.classList.toggle('active');
        
        if (navbarMobile.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            
            // Animate toggle bars
            const bars = this.querySelectorAll('.toggle-bar');
            gsap.to(bars[0], {
                y: 7, 
                rotation: 45, 
                duration: 0.4, 
                ease: "power2.out"
            });
            gsap.to(bars[1], {
                opacity: 0, 
                duration: 0.2
            });
            gsap.to(bars[2], {
                y: -7, 
                rotation: -45, 
                duration: 0.4, 
                ease: "power2.out"
            });
            
            // Animate mobile menu links
            const links = navbarMobile.querySelectorAll('.navbar-mobile-link, .navbar-button');
            gsap.fromTo(links, 
                {y: 30, opacity: 0},
                {y: 0, opacity: 1, stagger: 0.1, delay: 0.2, duration: 0.6, ease: "power3.out"}
            );
        } else {
            document.body.style.overflow = '';
            
            // Reset toggle bars
            const bars = this.querySelectorAll('.toggle-bar');
            gsap.to(bars[0], {
                y: 0, 
                rotation: 0, 
                duration: 0.4, 
                ease: "power2.out"
            });
            gsap.to(bars[1], {
                opacity: 1, 
                duration: 0.2
            });
            gsap.to(bars[2], {
                y: 0, 
                rotation: 0, 
                duration: 0.4, 
                ease: "power2.out"
            });
        }
    });
    
    // Close mobile menu on link click
    const mobileLinks = navbarMobile.querySelectorAll('.navbar-mobile-link, .navbar-button');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarToggle.classList.remove('active');
            navbarMobile.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset toggle bars
            const bars = navbarToggle.querySelectorAll('.toggle-bar');
            gsap.to(bars[0], {
                y: 0, 
                rotation: 0, 
                duration: 0.4, 
                ease: "power2.out"
            });
            gsap.to(bars[1], {
                opacity: 1, 
                duration: 0.2
            });
            gsap.to(bars[2], {
                y: 0, 
                rotation: 0, 
                duration: 0.4, 
                ease: "power2.out"
            });
        });
    });
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
    
    // Enhanced fade-in on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const delay = element.getAttribute('data-delay') || 0;
            
            if (elementTop < window.innerHeight - 100) {
                setTimeout(() => {
                    element.classList.add('visible');
                }, delay);
            }
        });
    }
    
    window.addEventListener('scroll', checkFade);
    document.addEventListener('DOMContentLoaded', checkFade);
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
    const githubStats = document.getElementById('github-stats');
    const githubLanguages = document.getElementById('github-languages');
    const githubRepos = document.getElementById('github-repos');
    const latestCommit = document.getElementById('latest-commit');
    
    // Skip if elements don't exist
    if (!githubStats && !githubLanguages && !githubRepos && !latestCommit) return;
    
    // Helper to create loading skeletons
    function createSkeletons(container, count) {
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton';
            container.appendChild(skeleton);
        }
    }
    
    // Simulate GitHub data loading with placeholder animations
    if (githubStats) {
        createSkeletons(githubStats, 3);
        setTimeout(() => {
            githubStats.innerHTML = `
                <div class="flex items-center justify-between mb-3">
                    <span class="text-gray-400">Repositories</span>
                    <span class="font-bold">18</span>
                </div>
                <div class="flex items-center justify-between mb-3">
                    <span class="text-gray-400">Followers</span>
                    <span class="font-bold">12</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-gray-400">Stars</span>
                    <span class="font-bold">37</span>
                </div>
            `;
        }, 1500);
    }
    
    if (githubLanguages) {
        createSkeletons(githubLanguages, 4);
        setTimeout(() => {
            githubLanguages.innerHTML = `
                <div class="flex items-center justify-between mb-3">
                    <span class="text-gray-400">C</span>
                    <span class="font-bold">40%</span>
                </div>
                <div class="flex items-center justify-between mb-3">
                    <span class="text-gray-400">Python</span>
                    <span class="font-bold">25%</span>
                </div>
                <div class="flex items-center justify-between mb-3">
                    <span class="text-gray-400">JavaScript</span>
                    <span class="font-bold">20%</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-gray-400">C++</span>
                    <span class="font-bold">15%</span>
                </div>
            `;
        }, 1800);
    }
    
    if (githubRepos) {
        createSkeletons(githubRepos, 3);
        setTimeout(() => {
            githubRepos.innerHTML = `
                <div class="flex items-center justify-between mb-3">
                    <span class="text-gray-400 truncate max-w-[180px]">TakeUforwardToGithub</span>
                    <span class="text-xs px-2 py-1 bg-green-900/50 rounded-full">JS</span>
                </div>
                <div class="flex items-center justify-between mb-3">
                    <span class="text-gray-400 truncate max-w-[180px]">viTube</span>
                    <span class="text-xs px-2 py-1 bg-blue-900/50 rounded-full">TS</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-gray-400 truncate max-w-[180px]">kernel_peridot</span>
                    <span class="text-xs px-2 py-1 bg-red-900/50 rounded-full">C</span>
                </div>
            `;
        }, 2100);
    }
    
    if (latestCommit) {
        createSkeletons(latestCommit, 2);
        setTimeout(() => {
            latestCommit.innerHTML = `
                <div class="text-gray-400 mb-3">Yesterday</div>
                <div class="font-medium">Update portfolio website</div>
            `;
        }, 2400);
    }
}

// Initialize advanced animations
function initAdvancedAnimations() {
    // Register GSAP plugins if available
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section parallax effect
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            gsap.fromTo('.parallax-layer',
                { y: 0 },
                {
                    y: (_, target) => -100 * parseFloat(target.getAttribute('data-speed') || 0.1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroSection,
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }
        
        // Animated counters
        gsap.utils.toArray('.counter').forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            
            ScrollTrigger.create({
                trigger: counter,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(counter, {
                        duration: 2,
                        innerText: Math.round(target),
                        snap: { innerText: 1 },
                        ease: "power2.out"
                    });
                }
            });
        });
        
        // Staggered skill bubbles
        const skillBubbles = document.querySelectorAll('.skill-bubble');
        if (skillBubbles.length > 0) {
            gsap.fromTo(skillBubbles, 
                {x: -20, opacity: 0},
                {
                    x: 0, opacity: 1, stagger: 0.1, 
                    scrollTrigger: {
                        trigger: skillBubbles[0].parentElement,
                        start: "top 80%"
                    }
                }
            );
        }
        
        // Enhanced headings with split text effect
        document.querySelectorAll('h2.fade-in').forEach(heading => {
            if (!heading.querySelector('.text-reveal')) {
                const text = heading.innerHTML;
                heading.innerHTML = `<span class="text-reveal"><span>${text}</span></span>`;
                
                gsap.to(heading.querySelector('.text-reveal span'), {
                    y: 0, opacity: 1, duration: 1,
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 80%"
                    }
                });
            }
        });
    }
    
    // Initialize grain overlay animation
    const grainOverlay = document.querySelector('.grain-overlay');
    if (grainOverlay) {
        let grainFrame = 0;
        function animateGrain() {
            grainFrame = (grainFrame + 1) % 10;
            grainOverlay.style.backgroundPosition = `${Math.random() * 100}% ${Math.random() * 100}%`;
            requestAnimationFrame(animateGrain);
        }
        animateGrain();
    }
}

// Initialize page transitions
function initPageTransitions() {
    // Initialize barba.js page transitions if available
    if (typeof barba !== 'undefined') {
        barba.init({
            transitions: [{
                name: 'fade-transition',
                leave(data) {
                    return gsap.to(data.current.container, {
                        opacity: 0,
                        duration: 0.5
                    });
                },
                enter(data) {
                    return gsap.from(data.next.container, {
                        opacity: 0,
                        duration: 0.5
                    });
                }
            }]
        });
    }
    
    // Regular page transition for non-barba enabled browsers
    window.addEventListener('beforeunload', function() {
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
        
        // Animate the transition
        gsap.to(transition, {
            y: 0,
            duration: 0.5,
            ease: "power2.in"
        });
    });
}

// Initialize 3D card effects
function init3DCardEffects() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        const content = card.querySelector('.card-3d-content') || card;
        
        // 3D tilt effect on mousemove
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const angleY = (e.clientX - cardCenterX) / 10;
            const angleX = (cardCenterY - e.clientY) / 10;
            
            content.style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg) translateZ(10px)`;
        });
        
        // Reset on mouseout
        card.addEventListener('mouseleave', () => {
            content.style.transform = 'translateZ(0)';
        });
    });
    
    // Convert project cards to 3D cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('card-3d');
        const cardContent = card.querySelector('div');
        if (cardContent) {
            cardContent.classList.add('card-3d-content');
        }
    });
}

// Initialize magnetic buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-button');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', e => {
            const btnRect = button.getBoundingClientRect();
            const btnCenterX = btnRect.left + btnRect.width / 2;
            const btnCenterY = btnRect.top + btnRect.height / 2;
            
            const deltaX = (e.clientX - btnCenterX) * 0.3;
            const deltaY = (e.clientY - btnCenterY) * 0.3;
            
            button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
    
    // Convert mono-buttons to magnetic buttons
    const monoButtons = document.querySelectorAll('.mono-button, .navbar-button');
    monoButtons.forEach(button => {
        button.classList.add('magnetic-button');
    });
}

// Initialize 3D tilt effect for mono-cards
function initCardTilt() {
    const cards = document.querySelectorAll('.mono-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            anime({
                targets: card,
                rotateX: angleX,
                rotateY: angleY,
                translateZ: 10,
                duration: 100,
                easing: 'linear'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                rotateX: 0,
                rotateY: 0,
                translateZ: 0,
                duration: 500,
                easing: 'easeOutElastic'
            });
        });
    });
}

// Initialize hover effects for skill bubbles
function initSkillBubbles() {
    const bubbles = document.querySelectorAll('.skill-bubble');
    
    bubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', () => {
            const icon = bubble.querySelector('i');
            const text = bubble.querySelector('span');
            
            anime({
                targets: icon,
                rotate: '+=15',
                scale: 1.2,
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            anime({
                targets: text,
                translateX: 5,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        bubble.addEventListener('mouseleave', () => {
            const icon = bubble.querySelector('i');
            const text = bubble.querySelector('span');
            
            anime({
                targets: icon,
                rotate: '-=15',
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            anime({
                targets: text,
                translateX: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
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

/**
 * Initialize text scramble effect
 * @param {HTMLElement} el - The element to apply the effect to
 * @param {Array} texts - Array of texts to cycle through
 */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Export the TextScramble class for use in other scripts
window.TextScramble = TextScramble;
