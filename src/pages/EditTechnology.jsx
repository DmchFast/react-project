import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useTechnologies from '../hooks/useTechnologies';
import TechnologyForm from '../components/TechnologyForm';
import './AddTechnology.css';

function EditTechnology({ showNotification }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { technologies, setTechnologies } = useTechnologies();
  const [technology, setTechnology] = useState(null);

  useEffect(() => {
    const tech = technologies.find(t => t.id === parseInt(id));
    if (tech) {
      setTechnology(tech);
    } else {
      navigate('/technologies');
    }
  }, [id, technologies, navigate]);

  const handleSave = (formData) => {
    const updatedTechnologies = technologies.map(tech =>
      tech.id === parseInt(id) 
        ? { ...tech, ...formData }
        : tech
    );
    setTechnologies(updatedTechnologies);
    showNotification(`Технология "${formData.title}" успешно обновлена!`, 'success');
    navigate('/technologies');
  };

  const handleCancel = () => {
    navigate('/technologies');
  };

  if (!technology) {
    return (
      <div className="add-technology-page">
        <div className="page-header">
          <h1>Загрузка</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="add-technology-page">
      <div className="page-header">
        <h1>Редактировать технологию</h1>
        <button onClick={() => navigate('/technologies')} className="btn btn-primary">
          Назад
        </button>
      </div>

      <TechnologyForm 
        onSave={handleSave}
        onCancel={handleCancel}
        initialData={technology}
      />
    </div>
  );
}

export default EditTechnology;