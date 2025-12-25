
import React, { useState } from 'react';
import { User, CryptoAlgorithm, CryptoResult } from '../types';
import { encrypt, decrypt } from '../services/cryptoService';
import { getSecurityInsight } from '../services/geminiService';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [inputText, setInputText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [algorithm, setAlgorithm] = useState<CryptoAlgorithm>(CryptoAlgorithm.AES);
  const [history, setHistory] = useState<CryptoResult[]>([]);
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  const handleAction = async (type: 'Encrypt' | 'Decrypt') => {
    if (!inputText || !secretKey) return;

    const output = type === 'Encrypt' 
      ? encrypt(inputText, secretKey, algorithm)
      : decrypt(inputText, secretKey, algorithm);

    const result: CryptoResult = {
      output,
      algorithm,
      operation: type,
      timestamp: new Date().toLocaleTimeString()
    };

    setHistory([result, ...history].slice(0, 10));
    
    setIsLoadingInsight(true);
    const insight = await getSecurityInsight(algorithm, inputText.substring(0, 50));
    setAiInsight(insight || '');
    setIsLoadingInsight(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 h-full">
      <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 text-white p-2 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-none">CryptoGuard Desktop</h1>
            <p className="text-xs text-slate-500 mt-1">Professional Cryptography Toolset</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900">{user.username}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
          <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-md font-bold text-slate-900 mb-6 uppercase tracking-wider">Processor</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Algorithm</label>
                <select 
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value as CryptoAlgorithm)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value={CryptoAlgorithm.AES}>AES (Highly Secure)</option>
                  <option value={CryptoAlgorithm.DES}>DES (Fast/Legacy)</option>
                  <option value={CryptoAlgorithm.TRIPLE_DES}>Triple DES (Standard)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Secret Passphrase</label>
                <input 
                  type="password"
                  placeholder="Encryption Key..."
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none placeholder-slate-400"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Payload Content</label>
              <textarea 
                rows={5}
                placeholder="Paste your text here for encryption or decryption..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none font-mono text-sm"
              />
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => handleAction('Encrypt')}
                className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                ENCRYPT
              </button>
              <button 
                onClick={() => handleAction('Decrypt')}
                className="flex-1 border-2 border-slate-200 text-slate-900 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2z" /></svg>
                DECRYPT
              </button>
            </div>
          </section>

          <section className="bg-blue-600 rounded-2xl p-6 text-white flex items-center gap-4 shadow-xl shadow-blue-100">
             <div className="bg-white/20 p-3 rounded-xl">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
             </div>
             <div>
               <h4 className="font-bold text-lg">AI Security Insight</h4>
               <p className="text-blue-100 text-sm italic">
                 {isLoadingInsight ? "Gemini is analyzing..." : (aiInsight || "Ready to analyze your encryption standards.")}
               </p>
             </div>
          </section>
        </div>

        <div className="lg:col-span-4 h-full">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden min-h-[500px]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Recent Logs</h3>
              <button onClick={() => setHistory([])} className="text-[10px] text-slate-400 hover:text-red-500 font-bold">CLEAR</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
                  <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  <p className="text-sm">Empty History</p>
                </div>
              ) : (
                history.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3 hover:border-blue-200 transition-colors group">
                    <div className="flex justify-between items-center mb-2">
                       <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${item.operation === 'Encrypt' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                         {item.operation.toUpperCase()}
                       </span>
                       <span className="text-[9px] text-slate-400">{item.timestamp}</span>
                    </div>
                    <code className="text-[11px] block text-slate-900 bg-white p-2 border border-slate-100 rounded mb-2 break-all max-h-20 overflow-y-auto font-mono">
                      {item.output}
                    </code>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-bold">{item.algorithm}</span>
                      <button 
                        onClick={() => copyToClipboard(item.output)}
                        className="text-[10px] text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        COPY RESULT
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
