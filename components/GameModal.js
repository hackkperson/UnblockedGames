
import React, { useState, useEffect } from 'react';
import { html } from 'htm/react';

const GameModal = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!game) return null;

  return html`
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className=${`relative bg-slate-900 rounded-2xl shadow-2xl flex flex-col w-full h-full max-w-6xl max-h-[90vh] overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 max-w-none max-h-none h-screen rounded-none' : ''}`}>
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-4">
            <button 
              onClick=${onClose}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <h2 className="text-xl font-bold text-slate-100">${game.title}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick=${() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-cyan-400 hidden sm:block"
              title="Toggle Fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>
              </svg>
            </button>
            <button 
              onClick=${onClose}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-slate-400 hover:text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <div className="flex-1 bg-black relative">
          <iframe 
            src=${game.iframeUrl}
            className="w-full h-full border-none"
            title=${game.title}
            allowFullScreen
          />
        </div>

        ${!isFullscreen && html`
          <div className="px-6 py-4 bg-slate-900 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">${game.category}</span>
              <span className="text-slate-600">•</span>
              <p className="text-sm text-slate-400">${game.description}</p>
            </div>
          </div>
        `}
      </div>
    </div>
  `;
};

export default GameModal;
