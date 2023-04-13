import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Trial from './Trial';
import ShowPage from './ShowPage';
import Reel from './Reel';

function App() {
  return (
    <div className="App" style={{ marginTop: '100px', border: '3px solid green' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Trial />} />
          <Route path="/:id/:lat/:long" exact element={<Home />} />
          <Route path="/show/:id/:lat/:long" exact element={<ShowPage />} />
          <Route path="/reel" exact element={<Reel />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
