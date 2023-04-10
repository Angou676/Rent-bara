import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <div className="App" style={{ marginTop: '100px', border: '3px solid yellow' }}>
      Trial
      <BrowserRouter>
        <Routes>
          <Route path="/:id/:lat/:long" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
