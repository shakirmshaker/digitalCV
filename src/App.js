import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import CVApp from './CVApp';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<CVApp isAuthenticated={isAuthenticated} />} />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <CVApp isAuthenticated={isAuthenticated} />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
      />
    </Routes>
  );
};

export default App;