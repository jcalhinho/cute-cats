import { Routes, Route } from 'react-router-dom';
import Mash from './pages/Mash';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Mash />} />
        <Route path="/scores" element={<Mash />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}