import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import RecipePage from './pages/RecipePage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { createContext, useState } from 'react';

const AppContext = createContext();

function App() {
  const [valueToRefresh, setValueToRefresh] = useState(0);

  return (
    <AppContext.Provider value={{ valueToRefresh, setValueToRefresh }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/recipe" element={<RecipePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export { AppContext }; // Export the context
export default App;