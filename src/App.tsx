
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import VotePage from './pages/VotePage';
import ScoresPage from './pages/ScoresPage';
import NotFound from './pages/NotFound';


export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<VotePage />} />
        <Route path="/scores" element={<ScoresPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}