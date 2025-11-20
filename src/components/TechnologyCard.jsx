import reactLogo from '../assets/react.svg'
import { technologies } from './TechnologyCard.js';
import './TechnologyCart.css'

function TechnologyCard({title, description, status}) {
  return (
    <div className={`tech tech-${status}`}>
      <img className='tech-img' src={reactLogo} alt="logo" />
      <p>{title}</p>
      <p>{description}</p>
	  
	  <div className="status-indicator">
        <span className={`status-badge status-${status}`}>
          {status === 'completed' && '✅ Изучено'}
          {status === 'in-progress' && '🔄 В процессе'}
          {status === 'not-started' && '⏳ Не начато'}
        </span>
		  </div>
	
      {/* <div className='tech-footer'>
        <p>Like: 0</p>
        <button>Like</button>
      </div> */}
    </div>
  );
}

export default TechnologyCard;