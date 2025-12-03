import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ showNotification }) {
  const location = useLocation();

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <Link to="/">
          <h2>🧮 Трекер технологий</h2>
        </Link>
      </div>
      
      <ul className="nav-menu">
        <li>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Главная
          </Link>
        </li>
        <li>
          <Link 
            to="/technologies" 
            className={location.pathname === '/technologies' ? 'active' : ''}
          >
            Технологии
          </Link>
        </li>
        <li>
          <Link 
            to="/import-api" 
            className={location.pathname === '/import-api' ? 'active' : ''}
          >
            Импорт из API
          </Link>
        </li>
        <li>
          <Link 
            to="/statistics" 
            className={location.pathname === '/statistics' ? 'active' : ''}
          >
            Статистика
          </Link>
        </li>
        <li>
          <Link 
            to="/settings" 
            className={location.pathname === '/settings' ? 'active' : ''}
          >
            Настройки
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;