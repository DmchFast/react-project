import reactLogo from '../assets/react.svg'
import './TechnologyCart.css'

function TechnologyCard({ id, title, description, status, onStatusChange }) {
  const handleClick = () => {
    onStatusChange(id);
  };

  return (
    <div 
      className={`tech tech-${status}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img className='tech-img' src={reactLogo} alt="logo" />
      <h3>{title}</h3>
      <p>{description}</p>
	  
      <div className="status-indicator">
        <span className={`status-badge status-${status}`}>
          {status === 'completed' && '✅ Изучено'}
          {status === 'in-progress' && '🔄 В процессе'}
          {status === 'not-started' && '⏳ Не начато'}
        </span>
      </div>
    </div>
  );
}

export default TechnologyCard;