import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import './AddTechnology.css';

function AddTechnology() {
  const { technologies, setTechnologies } = useTechnologies();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Пожалуйста, введите название технологии');
      return;
    }

    const newTechnology = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      status: 'not-started',
      notes: ''
    };

    const updatedTechnologies = [...technologies, newTechnology];
    setTechnologies(updatedTechnologies);
    
    alert('Технология успешно добавлена!');
    navigate('/technologies');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="add-technology-page">
      <div className="page-header">
        <h1>Добавить технологию</h1>
        <button onClick={() => navigate('/technologies')} className="btn btn-primary">
          Назад
        </button>
      </div>

      <form onSubmit={handleSubmit} className="technology-form">
        <div className="form-group">
          <label htmlFor="title">Название технологии *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Например: React Hooks"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Краткое описание технологии..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="other">Другие</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-success">
            Добавить технологию
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/technologies')}
            className="btn"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTechnology;