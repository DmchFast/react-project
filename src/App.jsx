import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import AddTechnology from './pages/AddTechnology';
import EditTechnology from './pages/EditTechnology';
import ImportFromAPI from './pages/ImportFromAPI';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import './App.css';

// Определяем базовый путь в зависимости от окружения
const basename = import.meta.env.BASE_URL || '/';

function App() {
  return (
    <Router basename={basename}>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/add-technology" element={<AddTechnology />} />
            <Route path="/edit-technology/:id" element={<EditTechnology />} />
            <Route path="/import-api" element={<ImportFromAPI />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} />
            {/* Маршрут для перенаправления */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;