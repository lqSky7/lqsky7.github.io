document.addEventListener('DOMContentLoaded', function() {
    // GitHub username
    const username = 'lqsky7';
    
    // Fetch GitHub stats with animation
    fetchGitHubStats(username);
    
    // Fetch recent repositories with animation
    fetchRecentRepos(username);
    
    // Fetch latest commit with animation
    fetchLatestCommit(username);
    
    // Fetch top languages with animation
    fetchTopLanguages(username);
});

/**
 * Fetch GitHub stats (followers, repos, stars)
 */
function fetchGitHubStats(username) {
    const statsContainer = document.getElementById('github-stats');
    
    fetch(`https://api.github.com/users/${username}`)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        // Create stats elements with animation
        const statsHTML = `
            <div class="stat-item opacity-0">
                <div class="flex items-center gap-2 mb-1">
                    <i class="fas fa-users text-sm"></i>
                    <span class="text-sm text-gray-400">Followers</span>
                </div>
                <div class="text-2xl font-bold">${data.followers}</div>
            </div>
            <div class="stat-item opacity-0">
                <div class="flex items-center gap-2 mb-1">
                    <i class="fas fa-code-branch text-sm"></i>
                    <span class="text-sm text-gray-400">Repositories</span>
                </div>
                <div class="text-2xl font-bold">${data.public_repos}</div>
            </div>
            <div class="stat-item opacity-0">
                <div class="flex items-center gap-2 mb-1">
                    <i class="fas fa-calendar-alt text-sm"></i>
                    <span class="text-sm text-gray-400">Since</span>
                </div>
                <div class="text-xl font-bold">${new Date(data.created_at).toLocaleDateString()}</div>
            </div>
        `;
        
        statsContainer.innerHTML = statsHTML;
        
        // Animate stats items
        anime({
            targets: '.stat-item',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(150),
            easing: 'easeOutExpo',
            duration: 800
        });
    })
    .catch(error => {
        console.error('Error fetching GitHub stats:', error);
        statsContainer.innerHTML = '<div class="text-red-400">Could not fetch GitHub stats.</div>';
    });
}

/**
 * Fetch recent repositories
 */
function fetchRecentRepos(username) {
    const reposContainer = document.getElementById('github-repos');
    
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        let reposHTML = '';
        
        data.slice(0, 3).forEach((repo, index) => {
            reposHTML += `
                <div class="repo-item opacity-0 mb-3 pb-3 ${index < data.length - 1 ? 'border-b border-gray-800' : ''}">
                    <div class="flex items-center justify-between">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="font-semibold hover:text-blue-400 transition-colors">
                            ${repo.name}
                        </a>
                        <span class="text-xs bg-gray-800 px-2 py-1 rounded-full">${repo.language || 'N/A'}</span>
                    </div>
                    <p class="text-sm text-gray-400 mt-1">${repo.description || 'No description available.'}</p>
                </div>
            `;
        });
        
        reposContainer.innerHTML = reposHTML || '<div class="text-gray-400">No repositories found.</div>';
        
        // Animate repo items
        anime({
            targets: '.repo-item',
            opacity: [0, 1],
            translateX: [-20, 0],
            delay: anime.stagger(150),
            easing: 'easeOutExpo',
            duration: 800
        });
    })
    .catch(error => {
        console.error('Error fetching repositories:', error);
        reposContainer.innerHTML = '<div class="text-red-400">Could not fetch repositories.</div>';
    });
}

/**
 * Fetch latest commit
 */
function fetchLatestCommit(username) {
    const commitContainer = document.getElementById('latest-commit');
    
    fetch(`https://api.github.com/users/${username}/events/public`)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        // Find the latest push event
        const pushEvent = data.find(event => event.type === 'PushEvent');
        
        if (pushEvent) {
            const commit = pushEvent.payload.commits[0];
            const repo = pushEvent.repo.name;
            const date = new Date(pushEvent.created_at).toLocaleDateString();
            
            const commitHTML = `
                <div class="commit-item opacity-0">
                    <div class="flex items-center justify-between mb-2">
                        <div class="text-sm font-semibold">${repo.split('/')[1]}</div>
                        <div class="text-xs text-gray-400">${date}</div>
                    </div>
                    <p class="text-sm text-gray-300">${commit.message}</p>
                    <div class="text-xs text-gray-500 mt-2">${commit.sha.substring(0, 7)}</div>
                </div>
            `;
            
            commitContainer.innerHTML = commitHTML;
            
            // Animate commit item
            anime({
                targets: '.commit-item',
                opacity: [0, 1],
                translateY: [20, 0],
                easing: 'easeOutExpo',
                duration: 800
            });
        } else {
            commitContainer.innerHTML = '<div class="text-gray-400">No recent commits found.</div>';
        }
    })
    .catch(error => {
        console.error('Error fetching commits:', error);
        commitContainer.innerHTML = '<div class="text-red-400">Could not fetch commit data.</div>';
    });
}

/**
 * Fetch and visualize top languages
 */
function fetchTopLanguages(username) {
    const langContainer = document.getElementById('github-languages');
    
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        // Count languages
        const languages = {};
        
        data.forEach(repo => {
            const lang = repo.language;
            if (lang) {
                languages[lang] = languages[lang] ? languages[lang] + 1 : 1;
            }
        });
        
        // Sort languages by count
        const sortedLangs = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4);
        
        // Calculate percentages
        const total = sortedLangs.reduce((sum, [_, count]) => sum + count, 0);
        
        let langsHTML = '<div class="space-y-3">';
        
        sortedLangs.forEach(([lang, count], index) => {
            const percentage = Math.round((count / total) * 100);
            const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500'];
            
            langsHTML += `
                <div class="lang-item opacity-0">
                    <div class="flex justify-between mb-1">
                        <span>${lang}</span>
                        <span>${percentage}%</span>
                    </div>
                    <div class="w-full bg-gray-800 rounded-full h-2.5">
                        <div class="language-bar ${colors[index % colors.length]} h-2.5 rounded-full" 
                             style="width: 0%;" 
                             data-width="${percentage}%"></div>
                    </div>
                </div>
            `;
        });
        
        langsHTML += '</div>';
        
        langContainer.innerHTML = langsHTML || '<div class="text-gray-400">No language data available.</div>';
        
        // Animate language items
        anime({
            targets: '.lang-item',
            opacity: [0, 1],
            translateY: [10, 0],
            delay: anime.stagger(150),
            easing: 'easeOutExpo',
            duration: 800
        });
        
        // Animate language bars
        anime({
            targets: '.language-bar',
            width: function(el) {
                return el.dataset.width;
            },
            easing: 'easeInOutQuart',
            duration: 1000,
            delay: 600
        });
    })
    .catch(error => {
        console.error('Error fetching languages:', error);
        langContainer.innerHTML = '<div class="text-red-400">Could not fetch language data.</div>';
    });
}
