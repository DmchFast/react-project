import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import QuickActions from '../components/QuickActions';
import useTechnologies from '../hooks/useTechnologies';
import './Home.css';

function Home() {
  const { 
    technologies, 
    markAllCompleted, 
    resetAllStatuses, 
    progress 
  } = useTechnologies();

  const completedCount = technologies.filter(tech => tech.status === 'completed').length;
  const inProgressCount = technologies.filter(tech => tech.status === 'in-progress').length;

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>Добро пожаловать в Трекер технологий! 🎯</h1>
        <p>Отслеживайте ваш прогресс в изучении современных технологий разработки</p>
      </div>

      <div className="quick-overview">
        <div className="overview-card">
          <h3>📊 Общий прогресс</h3>
          <div className="home-progress-bar">
            <ProgressBar
              progress={progress}
              label="Прогресс изучения"
              color="#4CAF50"
              animated={true}
              height={20}
              showPercentage={true}
            />
          </div>
          <div className="overview-stats">
            <span>{progress}% завершено</span>
          </div>
        </div>

        <div className="overview-grid">
          <div className="stat-card">
            <div className="stat-number">{technologies.length}</div>
            <div className="stat-label">Всего технологий</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{completedCount}</div>
            <div className="stat-label">Изучено</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{inProgressCount}</div>
            <div className="stat-label">В процессе</div>
          </div>
        </div>
      </div>

      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAllStatuses}
        technologies={technologies}
      />

      <div className="action-links">
        <Link to="/technologies" className="action-link">
          📚 Посмотреть все технологии
        </Link>
        <Link to="/statistics" className="action-link">
          📈 Анализировать прогресс
        </Link>
      </div>
    </div>
  );
}

export default Home;