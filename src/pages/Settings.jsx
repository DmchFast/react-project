import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Modal from '../components/Modal';
import './Settings.css';

function Settings({ showNotification }) {
  const [technologies, setTechnologies] = useLocalStorage('technologies', []);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');
  const [importError, setImportError] = useState('');

  const handleResetAll = () => {
    setTechnologies(prev => 
      prev.map(tech => ({ ...tech, status: 'not-started', notes: '' }))
    );
    setShowResetModal(false);
    showNotification('Прогресс всех технологий сброшен', 'info');
  };

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      technologies: technologies
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tech-tracker-backup-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowExportModal(true);
    showNotification('Данные успешно экспортированы!', 'success');
  };

  const handleImport = () => {
    try {
      const importedData = JSON.parse(importData);
      
      if (!importedData.technologies || !Array.isArray(importedData.technologies)) {
        setImportError('Неверный формат файла. Убедитесь, что файл был экспортирован из этого приложения.');
        showNotification('Ошибка при импорте данных', 'error');
        return;
      }

      // Валидация импортируемых данных
      const isValidData = importedData.technologies.every(tech => 
        tech.id && tech.title && tech.category && tech.status
      );

      if (!isValidData) {
        setImportError('Файл содержит некорректные данные. Проверьте структуру файла.');
        showNotification('Ошибка при импорте данных', 'error');
        return;
      }

      setTechnologies(importedData.technologies);
      setShowImportModal(false);
      setImportData('');
      setImportError('');
      showNotification('Данные успешно импортированы!', 'success');
    } catch (error) {
      setImportError('Ошибка при импорте данных. Проверьте формат JSON файла.');
      showNotification('Ошибка при импорте данных', 'error');
    }
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Проверка типа файла
    if (!file.name.endsWith('.json')) {
      setImportError('Пожалуйста, выберите JSON файл.');
      showNotification('Ошибка: выберите JSON файл', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImportData(e.target.result);
      setImportError('');
    };
    reader.onerror = () => {
      setImportError('Ошибка чтения файла.');
      showNotification('Ошибка чтения файла', 'error');
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (window.confirm('Вы уверены, что хотите полностью очистить все данные? Это действие нельзя отменить.')) {
      setTechnologies([]);
      showNotification('Все данные очищены', 'warning');
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>⚙️ Настройки</h1>
      </div>

      <div className="settings-grid">
        <div className="setting-card">
          <h3>📊 Управление данными</h3>
          <div className="setting-actions">
            <button onClick={handleExport} className="btn btn-success">
              📤 Экспорт данных
            </button>
            <button 
              onClick={() => setShowImportModal(true)} 
              className="btn btn-info"
            >
              📥 Импорт данных
            </button>
            <button 
              onClick={() => setShowResetModal(true)} 
              className="btn btn-warning"
            >
              🔄 Сбросить прогресс
            </button>
            <button 
              onClick={clearAllData} 
              className="btn btn-danger"
            >
              🗑️ Очистить все данные
            </button>
          </div>
        </div>

        <div className="setting-card">
          <h3>📈 Статистика приложения</h3>
          <div className="app-stats">
            <div className="app-stat">
              <span className="stat-label">Всего технологий:</span>
              <span className="stat-value">{technologies.length}</span>
            </div>
            <div className="app-stat">
              <span className="stat-label">Изучено:</span>
              <span className="stat-value">
                {technologies.filter(t => t.status === 'completed').length}
              </span>
            </div>
            <div className="app-stat">
              <span className="stat-label">В процессе:</span>
              <span className="stat-value">
                {technologies.filter(t => t.status === 'in-progress').length}
              </span>
            </div>
            <div className="app-stat">
              <span className="stat-label">Общий прогресс:</span>
              <span className="stat-value">
                {technologies.length > 0 
                  ? Math.round((technologies.filter(t => t.status === 'completed').length / technologies.length) * 100)
                  : 0
                }%
              </span>
            </div>
          </div>
        </div>

        <div className="setting-card">
          <h3>ℹ️ О приложении</h3>
          <div className="about-info">
            <p><strong>Трекер технологий</strong> - приложение для отслеживания прогресса изучения технологий разработки.</p>
            <div className="version-info">
              <span>Версия: 1.1.0</span>
              <span>React + Vite</span>
            </div>
          </div>
        </div>
      </div>

      {/* Модальные окна */}
      <Modal
        isOpen={showImportModal}
        onClose={() => {
          setShowImportModal(false);
          setImportError('');
          setImportData('');
        }}
        title="Импорт данных"
      >
        <div className="modal-content">
          <p>Импортируйте данные из файла резервной копии или вставьте JSON данные:</p>
          
          {importError && (
            <div className="error-message">
              {importError}
            </div>
          )}
          
          <div className="import-options">
            <div className="file-import">
              <label className="file-input-label">
                📁 Выберите файл
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleFileImport}
                  className="file-input"
                />
              </label>
            </div>
            
            <div className="text-import">
              <p>Или вставьте JSON данные:</p>
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder="Вставьте сюда JSON данные..."
                rows="6"
                className="import-textarea"
              />
            </div>

            {/* Предпросмотр импортируемых данных */}
            {importData && (
              <div className="import-preview">
                <h4>Предпросмотр:</h4>
                <div className="preview-content">
                  {(() => {
                    try {
                      const parsed = JSON.parse(importData);
                      if (parsed.technologies && Array.isArray(parsed.technologies)) {
                        return (
                          <div>
                            <p>Будет импортировано: {parsed.technologies.length} технологий</p>
                            <div className="preview-stats">
                              <span>✅ Изучено: {parsed.technologies.filter(t => t.status === 'completed').length}</span>
                              <span>🔄 В процессе: {parsed.technologies.filter(t => t.status === 'in-progress').length}</span>
                              <span>⏳ Не начато: {parsed.technologies.filter(t => t.status === 'not-started').length}</span>
                            </div>
                          </div>
                        );
                      }
                      return <p className="preview-error">Неверный формат данных</p>;
                    } catch (e) {
                      return <p className="preview-error">Ошибка в формате JSON</p>;
                    }
                  })()}
                </div>
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button onClick={handleImport} className="btn btn-success" disabled={!importData}>
              Импортировать
            </button>
            <button onClick={() => {
              setShowImportModal(false);
              setImportError('');
              setImportData('');
            }} className="btn">
              Отмена
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <div className="modal-export-content">
          <p>✅ Данные успешно экспортированы!</p>
          <p>Файл был скачан автоматически.</p>
          <div className="export-info">
            <p>Формат файла: <code>tech-tracker-backup-[timestamp].json</code></p>
            <p>Содержит: {technologies.length} технологий</p>
          </div>
          <button 
            onClick={() => setShowExportModal(false)}
            className="btn btn-primary modal-btn"
          >
            Закрыть
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Сброс прогресса"
      >
        <div className="modal-content">
          <p>Вы уверены, что хотите сбросить прогресс всех технологий?</p>
          <p>Все статусы будут установлены в "Не начато", а заметки очищены.</p>
          <div className="modal-actions">
            <button onClick={handleResetAll} className="btn btn-warning">
              Сбросить прогресс
            </button>
            <button onClick={() => setShowResetModal(false)} className="btn">
              Отмена
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Settings;