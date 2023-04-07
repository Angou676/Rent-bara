import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App" style={{ marginTop: '30px' }}>

      Trial
      <Route path="/:message" element={<Home />} />
    </div>
  );
}

export default App;
