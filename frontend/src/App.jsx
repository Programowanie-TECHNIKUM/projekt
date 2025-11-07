import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/loginPage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import ShopPage from './pages/shopPage.jsx';
import LeaderboardPage from './pages/leaderboardPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import GamePage from './pages/gamePage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path = "/leaderboard" element={<LeaderboardPage />} />
        <Route path = "/shop" element={<ShopPage />} />
        <Route path = "/register" element={<RegisterPage />} />
        <Route path = "/game" element={<GamePage />} />
        <Route path="*" element={<div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>404 - Strona nie znaleziona</h2>
          <a href="/">Wróć do strony głównej</a>
        </div>} />
      </Routes>
    </Router>
  );
}

export default App;
