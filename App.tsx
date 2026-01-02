import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithPopup, User } from 'firebase/auth';
import { auth, googleProvider } from './firebase.config';
import SlideDeck from './components/SlideDeck';
import CMS from './components/CMS';
import { fetchSlides } from './services/slideService';
import { SlideData } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);

  // Load Data
  const loadSlides = async () => {
    const data = await fetchSlides();
    setSlides(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSlides();
    
    // Auth Listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Check console for details.");
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <SlideDeck 
                slides={slides} 
                isAuthenticated={!!user} 
                onLoginRequest={handleLogin}
            />
          } 
        />
        <Route 
          path="/cms" 
          element={
            user ? (
                <CMS slides={slides} onUpdate={loadSlides} />
            ) : (
                <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;