import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTechnologyAPI from '../hooks/useTechnologyAPI';
import useTechnologies from '../hooks/useTechnologies';
import './ImportFromAPI.css';

function ImportFromAPI({ showNotification }) {
  const { loading, fetchTechnologies, searchTechnologies } = useTechnologyAPI();
  const { technologies, setTechnologies } = useTechnologies();
  const [apiTechnologies, setApiTechnologies] = useState([]);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Автоматически загружаем популярные технологии при монтировании
  useEffect(() => {
    loadPopularTechnologies();
  }, []);

  // Обработчик поиска с debounce
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (searchQuery.trim()) {
      const timeout = setTimeout(() => {
        handleSearch(searchQuery);
      }, 800);

      setSearchTimeout(timeout);
    } else {
      // Если поиск очищен, загружаем популярные технологии
      loadPopularTechnologies();
    }

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchQuery]);

  const loadPopularTechnologies = async () => {
    const response = await fetchTechnologies();
    if (response.success && response.data) {
      setApiTechnologies(response.data);
    }
  };

  const handleSearch = async (query) => {
    const response = await searchTechnologies(query);
    if (response.success && response.data) {
      setApiTechnologies(response.data);
    }
  };

  const toggleTechnology = (tech) => {
    setSelectedTechs(prev => {
      const isSelected = prev.find(t => t.id === tech.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tech.id);
      } else {
        return [...prev, tech];
      }
    });
  };

  const importSelectedTechnologies = () => {
    const technologiesToImport = selectedTechs.map(tech => ({
      id: Date.now() + Math.random(),
      title: tech.title,
      description: tech.description,
      category: tech.category,
      status: 'not-started',
      notes: `Импортировано из GitHub API. ${tech.stars ? `⭐ ${tech.stars} stars` : ''}${tech.language ? ` | 🚀 ${tech.language}` : ''}`,
      difficulty: tech.difficulty,
      ...(tech.url && { url: tech.url })
    }));

    const updatedTechnologies = [...technologies, ...technologiesToImport];
    setTechnologies(updatedTechnologies);
    setSelectedTechs([]);
    showNotification(`Успешно импортировано ${technologiesToImport.length} технологий из GitHub!`, 'success');
  };

  const isAlreadyAdded = (techTitle) => {
    return technologies.some(tech => tech.title === techTitle);
  };

  const selectAll = () => {
    const availableTechs = apiTechnologies.filter(tech => !isAlreadyAdded(tech.title));
    setSelectedTechs(availableTechs);
  };

  const clearSelection = () => {
    setSelectedTechs([]);
  };

  return (
    <div className="import-api-page">
      <div className="page-header">
        <h1>🌐 Импорт технологий из GitHub API</h1>
      </div>

      <div className="import-api-content">
        <div className="api-info">
          <p>
            <strong>🔍 Интеграция с GitHub API</strong> - поиск и импорт технологий из репозиториев GitHub.
          </p>
        </div>

        <div className="api-controls">
          <div className="search-section">
            <input
              type="text"
              placeholder="🔍 Введите технологию (React, Vue, Node.js, Python...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button 
              onClick={loadPopularTechnologies}
              disabled={loading}
              className="btn btn-info"
            >
              {loading ? '⏳ Загрузка...' : '🔄 Популярные'}
            </button>
          </div>

          {apiTechnologies.length > 0 && (
            <div className="selection-actions">
              <button onClick={selectAll} className="btn btn-warning">
                📥 Выбрать все доступные ({apiTechnologies.filter(t => !isAlreadyAdded(t.title)).length})
              </button>
              <button onClick={clearSelection} style={{marginLeft: "20px"}} className="btn">
                🗑️ Очистить выбор
              </button>
            </div>
          )}

          {selectedTechs.length > 0 && (
            <div className="import-actions">
              <div className="import-info">
                <p>✅ Выбрано для импорта: <strong>{selectedTechs.length}</strong> технологий</p>
                <button 
                  onClick={importSelectedTechnologies}
                  className="btn btn-success"
                  disabled={selectedTechs.length === 0}
                >
                  📥 Импортировать выбранные
                </button>
              </div>
            </div>
          )}
        </div>

        {loading && (
          <div className="loading-message">
            ⏳ Загрузка данных из GitHub API...
          </div>
        )}

        <div className="technologies-grid">
          {apiTechnologies.map(tech => (
            <div 
              key={tech.id}
              className={`tech-card ${selectedTechs.find(t => t.id === tech.id) ? 'selected' : ''} ${
                isAlreadyAdded(tech.title) ? 'already-added' : ''
              }`}
              onClick={() => !isAlreadyAdded(tech.title) && toggleTechnology(tech)}
            >
              <div className="tech-header">
                <h3>{tech.title}</h3>
                <div className="tech-badges">
                  {tech.stars && (
                    <span className="stars-badge">⭐ {tech.stars.toLocaleString()}</span>
                  )}
                </div>
              </div>
              
              <p className="tech-description">{tech.description}</p>
              
              <div className="tech-meta">
                {tech.language && (
                  <span className="language-badge"> {tech.language}</span>
                )}
              </div>
              
              <div className="tech-footer">
                <span className={`category-badge category-${tech.category}`}>
                  {tech.category === 'frontend' ? 'Frontend' : 
                   tech.category === 'backend' ? 'Backend' : 'Другие'}
                </span>
                
                {isAlreadyAdded(tech.title) ? (
                  <span className="added-badge">✅ В вашем списке</span>
                ) : (
                  <span className="select-hint">
                    {selectedTechs.find(t => t.id === tech.id) ? '✅ Выбрано' : '📌 Нажмите для выбора'}
                  </span>
                )}
              </div>

              {tech.url && (
                <div className="tech-link">
                  <a href={tech.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    🔗 Открыть на GitHub
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {apiTechnologies.length === 0 && !loading && (
          <div className="empty-state">
            <h3>Начните поиск технологий</h3>
            <p>Введите название технологии в поле поиска чтобы найти репозитории на GitHub</p>
            <p><small>Примеры поиска: React, Vue, Node.js, TypeScript, MongoDB, Docker</small></p>
            {searchQuery && (
              <p style={{color: '#666', fontStyle: 'italic'}}>
                По запросу "{searchQuery}" ничего не найдено в GitHub
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImportFromAPI;