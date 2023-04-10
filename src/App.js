import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Trial from './Trial';

function App() {
  return (
    <div className="App" style={{ marginTop: '100px', border: '3px solid green' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Trial />} />
          <Route path="/:id/:lat/:long" exact element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
