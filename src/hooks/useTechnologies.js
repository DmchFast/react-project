import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  {
    id: 1, title: 'React Components', description: 'Изучение базовых компонентов',
    status: 'not-started', notes: '', category: 'frontend'},
  {
    id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX',
    status: 'not-started', notes: '', category: 'frontend'},
  {
    id: 3, title: 'State Management', description: 'Работа с состоянием компонентов',
    status: 'not-started', notes: '', category: 'frontend'},
  {
    id: 4, title: 'Node.js Basics', description: 'Основы серверного JavaScript',
    status: 'not-started', notes: '', category: 'backend'},
  {
    id: 5, title: 'REST API', description: 'Создание RESTful API',
    status: 'not-started', notes: '', category: 'backend'}
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  const updateStatus = (techId, newStatus = null) => {
    setTechnologies(prev =>
      prev.map(tech => {
        if (tech.id === techId) {
          let status;
          if (newStatus) {
            status = newStatus;
          } else {
            // Циклическое изменение статуса
            if (tech.status === 'not-started') {
              status = 'in-progress';
            } else if (tech.status === 'in-progress') {
              status = 'completed';
            } else {
              status = 'not-started';
            }
          }
          return { ...tech, status };
        }
        return tech;
      })
    );
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const deleteTechnology = (techId) => {
    setTechnologies(prev => prev.filter(tech => tech.id !== techId));
  };

  const markAllCompleted = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'completed' }))
    );
  };

  const resetAllStatuses = () => {
    setTechnologies(prev =>
      prev.map(tech => ({ ...tech, status: 'not-started' }))
    );
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  return {
    technologies,
    setTechnologies,
    updateStatus,
    updateNotes,
    deleteTechnology,
    markAllCompleted,
    resetAllStatuses,
    progress: calculateProgress()
  };
}

export default useTechnologies;