import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
  // Считаем статистику
  const total = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
  
  const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-header">
      <h2>Прогресс изучения</h2>
      
      <div className="progress-stats">
        <div className="stat">
				  <span className="stat-number" style={{ color: "#fff"}}>{total}</span>
          <span className="stat-label" style={{ color: "#fff"}}>Всего технологий</span>
        </div>
        
        <div className="stat">
          <span className="stat-number" style={{ color: "#fff"}}>{completed}</span>
          <span className="stat-label" style={{ color: "#04f50c"}}>Изучено</span>
        </div>
        
        <div className="stat">
          <span className="stat-number" style={{ color: "#fff"}}>{inProgress}</span>
          <span className="stat-label" style={{ color: "#ff9800"}}>В процессе</span>
        </div>

        <div className="stat">
          <span className="stat-number" style={{ color: "#fff"}}>{notStarted}</span>
          <span className="stat-label" style={{ color: "#ff6155"}}>Не начато</span>
        </div>
      </div>

      {/* Прогресс-бар */}
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="progress-text">
        {progressPercentage === 100 
          ? '🎉 Поздравляем! Вы изучили все технологии!' 
          : `Так держать! Изучено ${completed} из ${total} технологий`}
      </div>
    </div>
  );
}

export default ProgressHeader;