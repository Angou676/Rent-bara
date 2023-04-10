import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import { useLocation } from 'react-router-dom'

function App() {
  const data = useLocation()
  console.log(data)
  return (
    <div className="App" style={{ marginTop: '100px', border: '3px solid blue' }}>
      Trial
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
