import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WithoutAuth from './validation/WithoutAuth';
import WithAuth from './validation/WithAuth';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Serivce';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<WithoutAuth><Login /></WithoutAuth>} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<WithAuth><About /></WithAuth>} />
          {/* <Route path="/Service" element={<WithAuth><Service /></WithAuth>} /> */}
          <Route path="/Service" element={<Service />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
