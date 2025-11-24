import { useState } from 'react'
import TechnologyCard from './components/TechnologyCard.jsx';
import ProgressHeader from './components/ProgressHeader.jsx';
import './App.css'
import { technologies as initialTechnologies } from './components/TechnologyCard.js';

function App() {
  const [technologies, setTechnologies] = useState(initialTechnologies);

  const updateTechnologyStatus = (id) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => {
        if (tech.id === id) {
          let newStatus;
          if (tech.status === 'not-started') {
            newStatus = 'in-progress';
          } else if (tech.status === 'in-progress') {
            newStatus = 'completed';
          } else {
            newStatus = 'not-started';
          }
          
          return { ...tech, status: newStatus };
        }
        return tech;
      })
    );
  };

  return (
    <>
      <h1>🚀 Трекер изучения технологий</h1>

      <ProgressHeader technologies={technologies} />

      <div className='tech-container'>
        {technologies.map((tech) => (
          <TechnologyCard 
            key={tech.id}
            id={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
            onStatusChange={updateTechnologyStatus}
          />
        ))}
      </div>
    </>
  );
}

export default App