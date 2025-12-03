import { useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import TechnologyForm from '../components/TechnologyForm';
import './AddTechnology.css';

function AddTechnology({ showNotification }) {
  const { technologies, setTechnologies } = useTechnologies();
  const navigate = useNavigate();

  const handleSave = (formData) => {
    const newTechnology = {
      id: Date.now(),
      ...formData,
      status: 'not-started',
      notes: ''
    };

    const updatedTechnologies = [...technologies, newTechnology];
    setTechnologies(updatedTechnologies);
    showNotification(`Технология "${formData.title}" успешно добавлена!`, 'success');
    navigate('/technologies');
  };

  const handleCancel = () => {
    navigate('/technologies');
  };

  return (
    <div className="add-technology-page">
      <div className="page-header">
        <h1>Добавить технологию</h1>
        <button onClick={() => navigate('/technologies')} className="btn btn-primary">
          Назад
        </button>
      </div>

      <TechnologyForm 
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AddTechnology;