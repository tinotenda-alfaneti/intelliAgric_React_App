import logo from './logo.svg';
import './App.css';
import Home from './Pages/HomePage';
import Ask_AI from './Pages/ask-ai';
import Disease_Detection from './Pages/disease-detection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IoT from './Pages/IoT';

function App() {
  return (
      <Router>
        <div className="App">
  
          <switch>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/askai" element={<Ask_AI/>} />
              <Route path="/diseasedetection" element={<Disease_Detection/>} />
              <Route path="/IoT" element={<IoT/>} />
            </Routes>
          </switch>
        </div>
      </Router>
    
  );
}

export default App;
