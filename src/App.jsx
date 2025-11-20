import { useState } from 'react'
import TechnologyCard from './components/TechnologyCard.jsx';
import ProgressHeader from './components/ProgressHeader.jsx';
import './App.css'
import { technologies } from './components/TechnologyCard.js';

function App() {
	return (
		<>
			<h1>Трекер изучения технологий</h1>

			<ProgressHeader technologies={technologies} />

			<div className='tech-container'>
				{technologies.map((tech) => (
					<TechnologyCard key={tech.id}
						title={tech.title}
						description={tech.description}
						status={tech.status}
					/>
				))}
			</div>
		</>
	);
}

export default App
