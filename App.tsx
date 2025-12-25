
import React, { useState, useEffect } from 'react';
import { AuthMode, User } from './types';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('crypto_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsInitialized(true);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('crypto_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('crypto_user');
  };

  if (!isInitialized) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <div className="flex items-center justify-center min-h-screen px-4">
          <AuthForm onAuthSuccess={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default App;
