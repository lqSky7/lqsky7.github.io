
let GITHUB_TOKEN = 'REPLACE_ME'; // will be replaced by gh actions

async function fetchWithAuth(url) {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${GITHUB_TOKEN}`
  };

const owner = 'lqsky7';
const repo = 'lqsky7.github.io';

async function fetchWithAuth(url) {
    try {
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        
        if (GITHUB_TOKEN) {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }

        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


async function fetchGitHubData() {
    try {
        console.log('Fetching GitHub data...'); // Debug log

        const [profileData, reposData, commitsData] = await Promise.all([
            fetchWithAuth(`https://api.github.com/users/${owner}`),
            fetchWithAuth(`https://api.github.com/users/${owner}/repos`),
            fetchWithAuth(`https://api.github.com/repos/${owner}/${repo}/commits`)
        ]);

        console.log('Received data:', { profileData, reposData, commitsData }); // Debug log

        if (!profileData || !reposData || !commitsData) {
            throw new Error('Failed to fetch some GitHub data');
        }


        const languages = {};
        reposData.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });


        const recentRepos = reposData
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 3);


        updateGitHubCards({
            profile: profileData,
            languages,
            recentRepos,
            latestCommit: commitsData[0]
        });
    } catch (error) {
        console.error('Error in fetchGitHubData:', error);
        updateCardsWithError();
    }
}


function updateGitHubCards(data) {
    try {
        // Profile Stats Card
        if (document.getElementById('github-stats')) {
            document.getElementById('github-stats').innerHTML = `
                <div class="flex items-center gap-4">
                    <img src="${data.profile.avatar_url}" class="w-16 h-16 rounded-full ring-2 ring-blue-500/50">
                    <div>
                        <h3 class="font-bold text-blue-200">${data.profile.name || data.profile.login}</h3>
                        <p class="text-sm text-blue-100/70">Repos: ${data.profile.public_repos} • Followers: ${data.profile.followers}</p>
                    </div>
                </div>
            `;
        }


        if (document.getElementById('github-languages')) {
            const languagesHtml = Object.entries(data.languages)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 4)
                .map(([lang, count]) => `
                    <div class="flex items-center gap-2 text-indigo-100/90">
                        <span class="w-2 h-2 rounded-full bg-indigo-400"></span>
                        <span>${lang}</span>
                        <span class="text-indigo-200/50">(${count})</span>
                    </div>
                `).join('');
            document.getElementById('github-languages').innerHTML = languagesHtml;
        }


        if (document.getElementById('github-repos')) {
            document.getElementById('github-repos').innerHTML = data.recentRepos
                .map(repo => `
                    <a href="${repo.html_url}" target="_blank" 
                       class="block hover:bg-purple-500/10 rounded-lg p-3 transition-colors">
                        <h4 class="font-medium text-purple-200">${repo.name}</h4>
                        <p class="text-sm text-purple-100/60">${repo.description || 'No description'}</p>
                    </a>
                `).join('');
        }


        if (document.getElementById('latest-commit')) {
            document.getElementById('latest-commit').innerHTML = `
                <p class="font-medium text-pink-200">${data.latestCommit.commit.message}</p>
                <p class="text-sm text-pink-100/60 mt-2">
                    ${new Date(data.latestCommit.commit.author.date).toLocaleDateString()}
                </p>
            `;
        }
    } catch (error) {
        console.error('Error in updateGitHubCards:', error);
        updateCardsWithError();
    }
}


function updateCardsWithError() {
    const errorMessage = `
        <div class="text-red-300">
            <p class="font-medium">Failed to load GitHub data</p>
            <p class="text-sm text-red-300/60">Please try again later</p>
        </div>
    `;
    
    ['github-stats', 'github-languages', 'github-repos', 'latest-commit'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = errorMessage;
        }
    });
}


document.addEventListener('DOMContentLoaded', fetchGitHubData);