const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const router = express.Router();

// Cache GitHub responses for 5 minutes (balance between freshness & GitHub rate limits)
const cache = new NodeCache({ stdTTL: 300 });

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const githubHeaders={
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'Portfolio-API',
  ...(GITHUB_TOKEN ? { 'Authorization': `token ${GITHUB_TOKEN}` } : {})
};

router.get('/repos', async (req, res) => {
  try {
    const username = 'Moazali302';
    const cacheKey = `github_repos_${username}`;

    const forceRefresh = req.query.refresh === 'true';

    if (!forceRefresh) {
      const cached = cache.get(cacheKey);
      if (cached) {
        return res.json(cached);
      }
    }

    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: githubHeaders,
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

    cache.set(cacheKey, repos);
   cache.set(`${cacheKey}_backup`, repos, 0); 

    res.json(repos);
  } catch (error) {
    console.error('GitHub API Error:', error.message);
    const backup = cache.get(`github_repos_Moazali302_backup`);
    if (backup) {
      return res.json(backup);
    }
     
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
        headers: githubHeaders
      }
    );

    const readme = {
      content: Buffer.from(response.data.content, 'base64').toString('utf-8'),
      encoding: response.data.encoding,
      url: response.data.html_url
    };

    cache.set(cacheKey, readme);
    cache.set(`${cacheKey}_backup`, readme, 0);
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