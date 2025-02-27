document.addEventListener('DOMContentLoaded', function() {
    const username = 'lqsky7'; // Replace with your GitHub username
    
    // Fetch user profile statistics
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('github-stats').innerHTML = `
                <div class="bg-blue-50/70 dark:bg-blue-900/20 p-4 rounded-xl border-l-4 border-blue-400 dark:border-blue-500 text-gray-800 dark:text-gray-200">
                    <div class="flex items-center gap-3 mb-2">
                        <img src="${data.avatar_url}" class="w-12 h-12 rounded-full" alt="Profile Picture">
                        <span class="font-bold">${data.name || username}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mt-3">
                        <div class="text-center p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                            <div class="text-blue-600 dark:text-blue-300 font-bold">${data.public_repos}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
                        </div>
                        <div class="text-center p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                            <div class="text-blue-600 dark:text-blue-300 font-bold">${data.followers}</div>
                            <div class="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                        </div>
                    </div>
                </div>`;
        })
        .catch(error => {
            document.getElementById('github-stats').innerHTML = `
                <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-300">
                    Error loading stats
                </div>`;
            console.error('Error fetching GitHub stats:', error);
        });

    // Fetch and display recent repositories
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`)
        .then(response => response.json())
        .then(data => {
            const reposHTML = data.slice(0, 3).map(repo => `
                <div class="bg-fuchsia-50/70 dark:bg-fuchsia-900/20 p-4 rounded-xl border-l-4 border-fuchsia-400 dark:border-fuchsia-500 mb-3">
                    <a href="${repo.html_url}" class="font-medium text-fuchsia-600 dark:text-fuchsia-300 hover:underline" target="_blank">${repo.name}</a>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${repo.description || 'No description'}</p>
                    <div class="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span class="flex items-center gap-1">
                            <i class="fas fa-star"></i> ${repo.stargazers_count}
                        </span>
                        <span class="flex items-center gap-1">
                            <i class="fas fa-code-branch"></i> ${repo.forks_count}
                        </span>
                    </div>
                </div>`
            ).join('');
            document.getElementById('github-repos').innerHTML = reposHTML || `
                <div class="bg-fuchsia-50/70 dark:bg-fuchsia-900/20 p-4 rounded-xl border-l-4 border-fuchsia-400 dark:border-fuchsia-500 text-gray-800 dark:text-gray-200">
                    No repositories found
                </div>`;
        })
        .catch(error => {
            document.getElementById('github-repos').innerHTML = `
                <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-300">
                    Error loading repositories
                </div>`;
            console.error('Error fetching repositories:', error);
        });

    // Fetch languages
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            // Count languages
            const languages = {};
            data.forEach(repo => {
                if (repo.language && !repo.fork) {
                    languages[repo.language] = (languages[repo.language] || 0) + 1;
                }
            });
            
            // Sort languages by usage
            const sortedLanguages = Object.entries(languages)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);
            
            const languagesHTML = sortedLanguages.map(([lang, count]) => {
                // Generate a color based on language name for visual distinction
                const colors = {
                    "JavaScript": "text-yellow-600 dark:text-yellow-300",
                    "Python": "text-blue-600 dark:text-blue-300",
                    "HTML": "text-red-600 dark:text-red-300",
                    "CSS": "text-indigo-600 dark:text-indigo-300",
                    "TypeScript": "text-sky-600 dark:text-sky-300",
                    "Java": "text-orange-600 dark:text-orange-300",
                    "C++": "text-purple-600 dark:text-purple-300"
                };
                
                const colorClass = colors[lang] || "text-violet-600 dark:text-violet-300";
                
                return `
                <div class="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                    <span class="font-medium ${colorClass}">${lang}</span>
                    <span class="text-sm bg-violet-100 dark:bg-violet-900/40 py-1 px-2 rounded-full text-violet-700 dark:text-violet-300">${count} repos</span>
                </div>`;
            }).join('');
            
            document.getElementById('github-languages').innerHTML = languagesHTML || `
                <div class="bg-violet-50/70 dark:bg-violet-900/20 p-4 rounded-xl border-l-4 border-violet-400 dark:border-violet-500 text-gray-800 dark:text-gray-200">
                    No language data available
                </div>`;
        })
        .catch(error => {
            document.getElementById('github-languages').innerHTML = `
                <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-300">
                    Error loading languages
                </div>`;
            console.error('Error fetching languages:', error);
        });

    // Fetch latest commit
    fetch(`https://api.github.com/users/${username}/events/public`)
        .then(response => response.json())
        .then(data => {
            const pushEvents = data.filter(event => event.type === 'PushEvent');
            
            if (pushEvents.length > 0) {
                const latestPush = pushEvents[0];
                const repo = latestPush.repo.name.split('/')[1];
                const commitMessage = latestPush.payload.commits[0].message;
                const commitUrl = `https://github.com/${latestPush.repo.name}/commit/${latestPush.payload.commits[0].sha}`;
                const date = new Date(latestPush.created_at);
                
                document.getElementById('latest-commit').innerHTML = `
                    <div class="bg-rose-50/70 dark:bg-rose-900/20 p-4 rounded-xl border-l-4 border-rose-400 dark:border-rose-500 text-gray-800 dark:text-gray-200">
                        <a href="${commitUrl}" class="font-medium text-rose-600 dark:text-rose-300 hover:underline" target="_blank">${repo}</a>
                        <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">${commitMessage}</p>
                        <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            ${date.toLocaleString()}
                        </div>
                    </div>`;
            } else {
                document.getElementById('latest-commit').innerHTML = `
                    <div class="bg-rose-50/70 dark:bg-rose-900/20 p-4 rounded-xl border-l-4 border-rose-400 dark:border-rose-500 text-gray-800 dark:text-gray-200">
                        No recent commits found
                    </div>`;
            }
        })
        .catch(error => {
            document.getElementById('latest-commit').innerHTML = `
                <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-300">
                    Error loading commit data
                </div>`;
            console.error('Error fetching latest commit:', error);
        });
});