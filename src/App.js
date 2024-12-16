import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" element={} /> */}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
