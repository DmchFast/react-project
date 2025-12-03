import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import AddTechnology from './pages/AddTechnology';
import EditTechnology from './pages/EditTechnology';
import ImportFromAPI from './pages/ImportFromAPI';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import NotificationSnackbar from './components/NotificationSnackbar';
import useNotification from './hooks/useNotification';
import './App.css';

const basename = import.meta.env.BASE_URL || '/';

function App() {
  const { notification, showNotification, hideNotification } = useNotification();

  return (
    <Router basename={basename}>
      <div className="App">
        <Navigation showNotification={showNotification} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home showNotification={showNotification} />} />
            <Route path="/technologies" element={<TechnologyList showNotification={showNotification} />} />
            <Route path="/add-technology" element={<AddTechnology showNotification={showNotification} />} />
            <Route path="/edit-technology/:id" element={<EditTechnology showNotification={showNotification} />} />
            <Route path="/import-api" element={<ImportFromAPI showNotification={showNotification} />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings showNotification={showNotification} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <NotificationSnackbar 
          notification={notification} 
          onClose={hideNotification} 
        />
      </div>
    </Router>
  );
}

export default App;