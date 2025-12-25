
import React, { useState } from 'react';
import { AuthMode, User } from '../types';

interface AuthFormProps {
  onAuthSuccess: (user: User) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === AuthMode.REGISTER && !username)) {
      setError('Required fields missing.');
      return;
    }
    onAuthSuccess({
      username: username || email.split('@')[0],
      email: email,
    });
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-10 border border-slate-100">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 rounded-2xl mb-6 shadow-xl shadow-slate-200">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          {mode === AuthMode.LOGIN ? 'AUTHENTICATE' : 'NEW ACCOUNT'}
        </h2>
        <p className="text-slate-400 text-sm mt-2">CryptoGuard Security Gateway</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === AuthMode.REGISTER && (
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Username</label>
            <input
              type="text"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
          <input
            type="email"
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
          <input
            type="password"
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg shadow-slate-300 hover:bg-black transition-all active:scale-[0.98]"
        >
          {mode === AuthMode.LOGIN ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button 
          onClick={() => setMode(mode === AuthMode.LOGIN ? AuthMode.REGISTER : AuthMode.LOGIN)} 
          className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors"
        >
          {mode === AuthMode.LOGIN ? "NEED AN ACCOUNT? SIGN UP" : "HAVE AN ACCOUNT? SIGN IN"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
