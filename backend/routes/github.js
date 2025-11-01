const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const router = express.Router();

// Cache GitHub responses for 1 hour
const cache = new NodeCache({ stdTTL: 3600 });

router.get('/repos', async (req, res) => {
  try {
    const username = 'Moazali302';
    const cacheKey = `github_repos_${username}`;
    
    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    // Fetch from GitHub API
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-API'
      },
      params: {
        sort: 'updated',
        direction: 'desc',
        per_page: 100
      }
    });

    const repos = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      topics: repo.topics || [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      default_branch: repo.default_branch
    }));

    // Cache the results
    cache.set(cacheKey, repos);

    res.json(repos);
  } catch (error) {
    console.error('GitHub API Error:', error.message);
    if (error.response?.status === 403) {
      res.status(503).json({ 
        error: 'GitHub API rate limit exceeded',
        message: 'Please try again later'
      });
    } else {
      res.status(500).json({ error: 'Failed to fetch repositories' });
    }
  }
});

router.get('/repo/:owner/:repo/readme', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const cacheKey = `github_readme_${owner}_${repo}`;
    
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-API'
        }
      }
    );

    const readme = {
      content: Buffer.from(response.data.content, 'base64').toString('utf-8'),
      encoding: response.data.encoding,
      url: response.data.html_url
    };

    cache.set(cacheKey, readme);
    res.json(readme);
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'README not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch README' });
    }
  }
});

module.exports = router;

