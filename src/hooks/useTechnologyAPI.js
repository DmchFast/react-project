import { useState } from 'react';

// Реальное API GitHub для получения технологий
const GITHUB_API = {
  // Поиск репозиториев по технологиям
  searchTechnologies: async (query) => {
    if (!query.trim()) {
      return {
        success: true,
        data: []
      };
    }

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&per_page=12`
      );
      
      if (!response.ok) {
        // Если ошибка API, возвращаем пустой массив
        return {
          success: true,
          data: []
        };
      }

      const data = await response.json();
      
      // Преобразуем данные GitHub в наш формат
      const technologies = data.items.map((repo) => ({
        id: `github-${repo.id}`,
        title: repo.name,
        description: repo.description || 'Описание отсутствует',
        category: getCategoryFromRepo(repo),
        difficulty: getDifficultyFromStars(repo.stargazers_count),
        stars: repo.stargazers_count,
        url: repo.html_url,
        language: repo.language,
        updated: repo.updated_at
      }));

      return {
        success: true,
        data: technologies
      };
    } catch (error) {
      // При любой ошибке возвращаем пустой массив
      return {
        success: true,
        data: []
      };
    }
  },

  // Получение популярных JavaScript технологий
  getPopularTechnologies: async () => {
    try {
      const response = await fetch(
        'https://api.github.com/search/repositories?q=javascript&sort=stars&per_page=12'
      );
      
      if (!response.ok) {
        return {
          success: true,
          data: []
        };
      }

      const data = await response.json();
      
      const technologies = data.items.map((repo) => ({
        id: `github-${repo.id}`,
        title: repo.name,
        description: repo.description || `Репозиторий ${repo.name}`,
        category: getCategoryFromRepo(repo),
        difficulty: getDifficultyFromStars(repo.stargazers_count),
        stars: repo.stargazers_count,
        url: repo.html_url,
        language: repo.language,
        updated: repo.updated_at
      }));

      return {
        success: true,
        data: technologies
      };
    } catch (error) {
      return {
        success: true,
        data: []
      };
    }
  }
};

// Вспомогательные функции
function getCategoryFromRepo(repo) {
  const name = repo.name.toLowerCase();
  const description = (repo.description || '').toLowerCase();
  const language = (repo.language || '').toLowerCase();

  if (
    name.includes('react') || name.includes('vue') || name.includes('angular') ||
    description.includes('react') || description.includes('vue') || description.includes('angular') ||
    description.includes('frontend') || description.includes('ui') || description.includes('client') ||
    language === 'javascript' || language === 'typescript' || language === 'css'
  ) {
    return 'frontend';
  }

  if (
    name.includes('node') || name.includes('express') || name.includes('server') ||
    name.includes('api') || name.includes('database') || name.includes('db') ||
    description.includes('server') || description.includes('backend') || description.includes('api') ||
    description.includes('database') || description.includes('rest') || description.includes('graphql') ||
    language === 'python' || language === 'java' || language === 'go' || language === 'php'
  ) {
    return 'backend';
  }

  return 'other';
}

function getDifficultyFromStars(stars) {
  if (stars > 10000) return 'advanced';
  if (stars > 1000) return 'intermediate';
  return 'beginner';
}

function useTechnologyAPI() {
  const [loading, setLoading] = useState(false);

  const fetchTechnologies = async () => {
    setLoading(true);
    try {
      const response = await GITHUB_API.getPopularTechnologies();
      return response;
    } catch (err) {
      return {
        success: true,
        data: []
      };
    } finally {
      setLoading(false);
    }
  };

  const searchTechnologies = async (query) => {
    setLoading(true);
    try {
      const response = await GITHUB_API.searchTechnologies(query);
      return response;
    } catch (err) {
      return {
        success: true,
        data: []
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchTechnologies,
    searchTechnologies
  };
}

export default useTechnologyAPI;