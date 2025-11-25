import './TechnologyCart.css';

function TechnologyCard({ 
  id, 
  title, 
  description, 
  status, 
  notes, 
  category,
  onStatusChange, 
  onNotesChange,
  onEdit,
  onDelete
}) {
  const handleStatusClick = (e) => {
    e.stopPropagation();
    onStatusChange(id);
  };

  const handleNotesChange = (e) => {
    onNotesChange(id, e.target.value);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Вы уверены, что хотите удалить технологию "${title}"?`)) {
      onDelete(id);
    }
  };

  const getCategoryName = (cat) => {
    const categories = {
      'frontend': 'Frontend',
      'backend': 'Backend', 
      'other': 'Другие'
    };
    return categories[cat] || cat;
  };

  return (
    <div className={`tech tech-${status}`}>
      <div className="tech-header">
        <div className="tech-main">
          <h3>{title}</h3>
          <p>{description}</p>
          
          <div className="tech-meta">
            <span className={`category-badge category-${category}`}>
              {getCategoryName(category)}
            </span>
            <button 
              className={`status-badge status-${status}`}
              onClick={handleStatusClick}
              title="Нажмите чтобы изменить статус"
            >
              {status === 'completed' && '✅ Изучено'}
              {status === 'in-progress' && '🔄 В процессе'}
              {status === 'not-started' && '⏳ Не начато'}
            </button>
          </div>
        </div>

        <div className="tech-actions">
          <button onClick={handleEdit} className="btn-edit" title="Редактировать">
            ✏️
          </button>
          <button onClick={handleDelete} className="btn-delete" title="Удалить">
            ❌
          </button>
        </div>
      </div>

      <div className="notes-section">
        <h4>📝 Мои заметки:</h4>
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Записывайте сюда важные моменты..."
          rows="3"
          className="notes-textarea"
        />
        <div className="notes-hint">
          {notes.length > 0 
            ? `💾 сохранено (${notes.length} символов)` 
            : '✏️ Добавьте заметку...'}
        </div>
      </div>
    </div>
  );
}

export default TechnologyCard;