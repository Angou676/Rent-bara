import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <div className="App" style={{ marginTop: '100px', border: '1px solid green' }}>
      Trial
      <BrowserRouter>
        <Routes>
          <Route path="/:message" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
