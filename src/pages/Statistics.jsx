import { useMemo } from 'react';
import useTechnologies from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';
import './Statistics.css';

function Statistics() {
  const { technologies } = useTechnologies();

  const stats = useMemo(() => {
    const total = technologies.length;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
    const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
    
    const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Статистика по категориям
    const categories = {};
    technologies.forEach(tech => {
      const category = tech.category || 'other';
      if (!categories[category]) {
        categories[category] = { total: 0, completed: 0, inProgress: 0, notStarted: 0 };
      }
      categories[category].total++;
      if (tech.status === 'completed') {
        categories[category].completed++;
      } else if (tech.status === 'in-progress') {
        categories[category].inProgress++;
      } else {
        categories[category].notStarted++;
      }
    });

    return {
      total,
      completed,
      inProgress,
      notStarted,
      progressPercentage,
      categories
    };
  }, [technologies]);

  const getCategoryProgress = (category) => {
    if (category.total === 0) return 0;
    return Math.round((category.completed / category.total) * 100);
  };

  const getCategoryColor = (categoryName) => {
    const colors = {
      'frontend': '#667eea',
      'backend': '#764ba2',
      'other': '#4CAF50'
    };
    return colors[categoryName] || '#666';
  };

  const getCategoryDisplayName = (category) => {
    const names = {
      'frontend': 'Frontend',
      'backend': 'Backend',
      'other': 'Другие'
    };
    return names[category] || category;
  };

  return (
    <div className="statistics-page">
      <div className="page-header">
        <h1>📊 Статистика прогресса</h1>
      </div>

      <div className="stats-overview">
        <div className="main-stat">
          <h3>Общий прогресс</h3>
          <div className="progress-circle">
            <div 
              className="circle-progress"
              style={{ 
                background: `conic-gradient(#4CAF50 ${stats.progressPercentage * 3.6}deg, #f0f0f0 0deg)` 
              }}
            >
              <span>{stats.progressPercentage}%</span>
            </div>
          </div>
          <p>{stats.completed} из {stats.total} технологий изучено</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#4CAF50' }}>
              {stats.completed}
            </div>
            <div className="stat-label">✅ Изучено</div>
            <ProgressBar 
              progress={stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}
              height={8}
              showPercentage={false}
              color="#4CAF50"
            />
          </div>

          <div className="stat-card">
            <div className="stat-number" style={{ color: '#FF9800' }}>
              {stats.inProgress}
            </div>
            <div className="stat-label">🔄 В процессе</div>
            <ProgressBar 
              progress={stats.total > 0 ? Math.round((stats.inProgress / stats.total) * 100) : 0}
              height={8}
              showPercentage={false}
              color="#FF9800"
            />
          </div>

          <div className="stat-card">
            <div className="stat-number" style={{ color: '#F44336' }}>
              {stats.notStarted}
            </div>
            <div className="stat-label">⏳ Не начато</div>
            <ProgressBar 
              progress={stats.total > 0 ? Math.round((stats.notStarted / stats.total) * 100) : 0}
              height={8}
              showPercentage={false}
              color="#F44336"
            />
          </div>
        </div>
      </div>

      <div className="category-stats">
        <h2>Прогресс по категориям</h2>
        <div className="categories-grid">
          {Object.entries(stats.categories).map(([categoryName, category]) => (
            <div key={categoryName} className="category-card">
              <h3>{getCategoryDisplayName(categoryName)}</h3>
              <div className="category-progress-bar">
                <ProgressBar
                  progress={getCategoryProgress(category)}
                  label={`${category.completed}/${category.total}`}
                  color={getCategoryColor(categoryName)}
                  height={12}
                />
              </div>
              <div className="category-details">
                <span>✅ {category.completed}</span>
                <span>🔄 {category.inProgress}</span>
                <span>⏳ {category.notStarted}</span>
              </div>
              <div className="category-summary">
                Всего: {category.total} | Прогресс: {getCategoryProgress(category)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="completion-insights">
        <h2>💡 Рекомендации</h2>
        <div className="insights-grid">
          {stats.notStarted > 0 && (
            <div className="insight-card">
              <h4>Начните изучение</h4>
              <p>У вас есть {stats.notStarted} технологий, которые еще не начаты. Начните с самых важных!</p>
            </div>
          )}
          {stats.inProgress > 0 && (
            <div className="insight-card">
              <h4>Продолжайте в том же духе</h4>
              <p>Вы работаете над {stats.inProgress} технологиями. Не бросайте начатое!</p>
            </div>
          )}
          {stats.progressPercentage >= 80 && (
            <div className="insight-card">
              <h4>Отличный результат!</h4>
              <p>Вы изучили большинство технологий. Поздравляем! 🎉</p>
            </div>
          )}
          {stats.progressPercentage <= 30 && stats.total > 5 && (
            <div className="insight-card">
              <h4>Есть над чем поработать</h4>
              <p>Попробуйте сосредоточиться на одной технологии за раз.</p>
            </div>
          )}
          {stats.completed === stats.total && stats.total > 0 && (
            <div className="insight-card">
              <h4>Идеальный результат! 🏆</h4>
              <p>Вы изучили все технологии! Отличная работа!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Statistics;