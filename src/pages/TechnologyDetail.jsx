import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTechnologies from '../hooks/useTechnologies';
import './TechnologyDetail.css';

function TechnologyDetail() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const { technologies, updateStatus, updateNotes, setTechnologies } = useTechnologies();
  
  const [technology, setTechnology] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    const tech = technologies.find(t => t.id === parseInt(techId));
    if (tech) {
      setTechnology(tech);
      setEditForm({
        title: tech.title,
        description: tech.description,
        category: tech.category
      });
    }
  }, [techId, technologies]);

  const handleStatusChange = () => {
    if (technology) {
      updateStatus(technology.id);
    }
  };

  const handleNotesChange = (newNotes) => {
    if (technology) {
      updateNotes(technology.id, newNotes);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
      const updatedTechnologies = technologies.filter(t => t.id !== parseInt(techId));
      setTechnologies(updatedTechnologies);
      navigate('/technologies');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTechnologies = technologies.map(t => 
      t.id === parseInt(techId) 
        ? { ...t, ...editForm }
        : t
    );
    setTechnologies(updatedTechnologies);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      title: technology.title,
      description: technology.description,
      category: technology.category
    });
    setIsEditing(false);
  };

  if (!technology) {
    return (
      <div className="technology-detail-page">
        <div className="page-header">
          <Link to="/technologies" className="btn btn-primary">
            Назад
          </Link>
          <h1>Технология не найдена</h1>
        </div>
        <div className="not-found">
          <p>Технология с ID {techId} не существует.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="technology-detail-page">
      <div className="page-header">
        <Link to="/technologies" className="btn btn-primary">
          Назад
        </Link>
        <div className="header-actions">
          <button onClick={handleEdit} className="btn btn-info">
            ✏️ Редактировать
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            🗑️ Удалить
          </button>
        </div>
      </div>

      <div className="technology-detail">
        {isEditing ? (
          <div className="edit-form">
            <div className="form-group">
              <label>Название:</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Описание:</label>
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Категория:</label>
              <select
                value={editForm.category}
                onChange={(e) => setEditForm({...editForm, category: e.target.value})}
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="other">Другие</option>
              </select>
            </div>
            <div className="form-actions">
              <button onClick={handleSave} className="btn btn-success">
                Сохранить
              </button>
              <button onClick={handleCancel} className="btn">
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="detail-section">
              <h1>{technology.title}</h1>
              <p className="technology-category">
                Категория: <span className={`category-badge category-${technology.category}`}>
                  {technology.category === 'frontend' ? 'Frontend' : 
                   technology.category === 'backend' ? 'Backend' : 'Другие'}
                </span>
              </p>
              <p className="technology-description">{technology.description}</p>
            </div>

            <div className="detail-section">
              <h3>📊 Статус изучения</h3>
              <div 
                className={`status-display status-${technology.status}`}
                onClick={handleStatusChange}
                style={{cursor: 'pointer'}}
              >
                {technology.status === 'completed' && '✅ Изучено'}
                {technology.status === 'in-progress' && '🔄 В процессе'}
                {technology.status === 'not-started' && '⏳ Не начато'}
                <span className="click-hint">(кликните для изменения)</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>📝 Мои заметки</h3>
              <textarea
                value={technology.notes || ''}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Записывайте сюда важные моменты..."
                rows="6"
                className="notes-textarea"
              />
              <div className="notes-hint">
                {technology.notes ? `💾 сохранено (${technology.notes.length} символов)` : '✏️ Добавьте заметку...'}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TechnologyDetail;