// Replace 'owner' and 'repo' with the actual owner and repository name
const owner = 'lqsky7';
const repo = 'lqsky7.github.io';

// GitHub API URL to fetch the latest commits
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Get the latest commit message
    const latestCommitMessage = data[0].commit.message;
    
    // Add the commit message to your HTML element
    document.getElementById('latest-commit').textContent = latestCommitMessage;
  })
  .catch(error => console.error('Error fetching commit:', error));
2