import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import NomadQuiz from './NomadQuiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<NomadQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
