import { Link } from 'react-router-dom';
import { useState } from 'react';
import TechnologyCard from '../components/TechnologyCard';
import ProgressHeader from '../components/ProgressHeader';
import StatusEditor from '../components/StatusEditor';
import useTechnologies from '../hooks/useTechnologies';
import './TechnologyList.css';

function TechnologyList({ showNotification }) {
  const { 
    technologies, 
    updateStatus, 
    updateNotes,
    deleteTechnology,
    setTechnologies
  } = useTechnologies();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingTech, setEditingTech] = useState(null);
  const [showBulkEditor, setShowBulkEditor] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: 'frontend'
  });

  const filteredTechnologies = technologies.filter(tech => {
    const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (tech.notes && tech.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || tech.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusCount = (status) => {
    return technologies.filter(tech => tech.status === status).length;
  };

  const handleEdit = (techId) => {
    const tech = technologies.find(t => t.id === techId);
    if (tech) {
      setEditingTech(techId);
      setEditForm({
        title: tech.title,
        description: tech.description,
        category: tech.category
      });
    }
  };

  const handleSaveEdit = () => {
    if (editingTech) {
      const updatedTechnologies = technologies.map(tech =>
        tech.id === editingTech
          ? { ...tech, ...editForm }
          : tech
      );
      setTechnologies(updatedTechnologies);
      setEditingTech(null);
      setEditForm({ title: '', description: '', category: 'frontend' });
      showNotification('Технология успешно обновлена!', 'success');
    }
  };

  const handleCancelEdit = () => {
    setEditingTech(null);
    setEditForm({ title: '', description: '', category: 'frontend' });
  };

  const handleDelete = (techId) => {
    const tech = technologies.find(t => t.id === techId);
    deleteTechnology(techId);
    showNotification(`Технология "${tech.title}" удалена`, 'warning');
  };

  const handleBulkStatusUpdate = (techId, newStatus) => {
    updateStatus(techId, newStatus);
  };

  return (
    <div className="technology-list-page">
      <div className="page-header">
        <h1>📚 Все технологии</h1>
        <div className="header-actions">
          <button 
            onClick={() => setShowBulkEditor(true)}
            className="btn btn-warning"
          >
            Массовое редактирование
          </button>
          <Link to="/add-technology" className="btn btn-success">
            Добавить технологию
          </Link>
        </div>
      </div>

      <ProgressHeader technologies={technologies} />

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск технологий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-results">
            Найдено: {filteredTechnologies.length} из {technologies.length}
          </span>
        </div>

        <div className="status-filters">
          <button 
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            Все ({technologies.length})
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'not-started' ? 'active' : ''}`}
            onClick={() => setStatusFilter('not-started')}
          >
            Не начато ({getStatusCount('not-started')})
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setStatusFilter('in-progress')}
          >
            В процессе ({getStatusCount('in-progress')})
          </button>
          <button 
            className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('completed')}
          >
            Изучено ({getStatusCount('completed')})
          </button>
        </div>
      </div>

      {/* Форма редактирования */}
      {editingTech && (
        <div className="edit-modal">
          <div className="edit-form">
            <h3>✏️ Редактировать технологию</h3>
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
                rows="3"
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
              <button onClick={handleSaveEdit} className="btn btn-success">
                Сохранить
              </button>
              <button onClick={handleCancelEdit} className="btn">
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Массовый редактор статусов */}
      {showBulkEditor && (
        <StatusEditor
          technologies={technologies}
          onUpdateStatus={handleBulkStatusUpdate}
          onClose={() => setShowBulkEditor(false)}
        />
      )}

      <div className='tech-grid'>
        {filteredTechnologies.map((tech) => (
          <TechnologyCard 
            key={tech.id}
            id={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
            notes={tech.notes || ''}
            category={tech.category}
            onStatusChange={updateStatus}
            onNotesChange={updateNotes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredTechnologies.length === 0 && (
        <div className="no-results">
          {searchQuery || statusFilter !== 'all' ? (
            <>
              <p>По вашему запросу ничего не найдено</p>
              <button 
                onClick={() => { setSearchQuery(''); setStatusFilter('all'); }} 
                className="clear-search"
              >
                Сбросить фильтры
              </button>
            </>
          ) : (
            <>
              <p>📝 Технологий пока нет</p>
              <p>Начните добавлять технологии для отслеживания прогресса!</p>
              <Link to="/add-technology" className="btn btn-success">
                Добавить первую технологию
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TechnologyList;