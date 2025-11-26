import { useState, useEffect } from 'react';
import './StatusEditor.css';

function StatusEditor({ technologies, onUpdateStatus, onClose }) {
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [newStatus, setNewStatus] = useState('not-started');
    const [selectAll, setSelectAll] = useState(false);

    // Обработчик выбора/снятия выбора технологии
    const handleTechSelect = (techId) => {
        setSelectedTechs(prev => {
            if (prev.includes(techId)) {
                return prev.filter(id => id !== techId);
            } else {
                return [...prev, techId];
            }
        });
    };

    // Обработчик выбора всех технологий
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedTechs([]);
        } else {
            setSelectedTechs(technologies.map(tech => tech.id));
        }
        setSelectAll(!selectAll);
    };

    // Обновление selectAll при изменении selectedTechs
    useEffect(() => {
        setSelectAll(selectedTechs.length === technologies.length && technologies.length > 0);
    }, [selectedTechs, technologies]);

    // Обработчик применения изменений
    const handleApplyChanges = () => {
        if (selectedTechs.length === 0) {
            alert('Выберите хотя бы одну технологию для изменения статуса');
            return;
        }

        selectedTechs.forEach(techId => {
            onUpdateStatus(techId, newStatus);
        });

        alert(`Статус обновлен для ${selectedTechs.length} технологий`);
        onClose();
    };

    const getStatusDisplayName = (status) => {
        const statusNames = {
            'not-started': 'Не начато',
            'in-progress': 'В процессе', 
            'completed': 'Изучено'
        };
        return statusNames[status] || status;
    };

    return (
        <div className="bulk-editor-modal">
            <div className="bulk-editor-content">
                <div className="bulk-editor-header">
                    <h2>Массовое редактирование статусов</h2>
                    <button 
                        onClick={onClose} 
                        className="close-btn"
                        aria-label="Закрыть редактор"
                    >
                        ❌
                    </button>
                </div>

                <div className="bulk-editor-body">
                    {/* Выбор статуса */}
                    <div className="status-selection">
                        <label htmlFor="new-status">
                            Установить статус:
                        </label>
                        <select
                            id="new-status"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            aria-describedby="status-help"
                        >
                            <option value="not-started">⏳ Не начато</option>
                            <option value="in-progress">🔄 В процессе</option>
                            <option value="completed">✅ Изучено</option>
                        </select>
                        <span id="status-help" className="help-text">
                            Выбранный статус будет применен ко всем отмеченным технологиям
                        </span>
                    </div>

                    {/* Список технологий */}
                    <div className="tech-list-section">
                        <div className="list-header">
                            <label className="select-all-label">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                    aria-label={selectAll ? 'Снять выделение со всех' : 'Выделить все технологии'}
                                />
                                <span>Выбрать все</span>
                            </label>
                            <span className="selected-count">
                                Выбрано: {selectedTechs.length} из {technologies.length}
                            </span>
                        </div>

                        <div className="tech-list" role="list">
                            {technologies.map(tech => (
                                <div 
                                    key={tech.id} 
                                    className="tech-item"
                                    role="listitem"
                                >
                                    <label className="tech-select-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedTechs.includes(tech.id)}
                                            onChange={() => handleTechSelect(tech.id)}
                                            aria-describedby={`tech-desc-${tech.id}`}
                                        />
                                        <span className="tech-title">{tech.title}</span>
                                        <span 
                                            id={`tech-desc-${tech.id}`}
                                            className={`tech-status status-${tech.status}`}
                                        >
                                            {getStatusDisplayName(tech.status)}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bulk-editor-actions">
                    <button
                        onClick={handleApplyChanges}
                        disabled={selectedTechs.length === 0}
                        className="btn btn-success"
                    >
                        Применить к {selectedTechs.length} технологиям
                    </button>
                    <button
                        onClick={onClose}
                        className="btn"
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StatusEditor;