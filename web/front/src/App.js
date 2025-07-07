import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginPage from './Component/Login';
import SignupPage from './Component/Signup';
import Hero from './Component/Hero';
import About from './Component/About';
import Services from './Component/Services';
import Screening from './Component/Screening';
import Header from './Component/Header';
import Footer from './Component/Footer';
import History from './Component/History';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Component/Firebaseconfig';
import { AuthProvider } from './Component/AuthContext'; // Import the AuthProvider

import './assets/vendor/fontawesome-free/css/all.min.css';
  import './assets/vendor/boxicons/css/boxicons.min.css';
import './assets/css/style.css';
import Reset from './Component/Reset';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking authentication state
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthProvider> {/* Wrap the entire application with AuthProvider */}
      <Router>
        {isLoggedIn ? (
          <>
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Routes>
              <Route path="/home" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/screening" element={<Screening />} />
              <Route path="/history" element={<History />} />
              
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </Router>
    </AuthProvider>
  );
}

export default App;
