
import React, { useState, useEffect } from 'react';
import { html } from 'htm/react';
import SnakeGame from './SnakeGame.js';

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

  // Determine content: Iframe or Native Component
  const renderGameContent = () => {
    if (game.id === 'neon-serpent') {
      return html`<${SnakeGame} />`;
    }
    return html`
      <iframe 
        src=${game.iframeUrl}
        className="w-full h-full border-none"
        title=${game.title}
        allowFullScreen
      />
    `;
  };

  return html`
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className=${`relative bg-[#050505] border border-fuchsia-500/30 flex flex-col w-full h-full max-w-6xl max-h-[90vh] overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 max-w-none max-h-none h-screen rounded-none border-none' : ''}`}>
        
        <div className="flex items-center justify-between px-6 py-3 border-b border-fuchsia-900/50 bg-black">
          <div className="flex items-center gap-4">
            <button 
              onClick=${onClose}
              className="p-1.5 hover:bg-fuchsia-950/20 text-fuchsia-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <h2 className="cyber-font text-sm font-bold text-white uppercase tracking-widest">${game.title} <span className="text-fuchsia-700 ml-2 text-[10px]">// ${game.id === 'neon-serpent' ? 'LOCAL_NODE' : 'REMOTE_LINK'}</span></h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick=${() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 hover:bg-cyan-950/20 text-cyan-500 transition-colors hidden sm:block"
              title="Toggle Neural View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>
              </svg>
            </button>
            <button 
              onClick=${onClose}
              className="p-1.5 hover:bg-red-950/20 text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <div className="flex-1 bg-black relative">
          ${renderGameContent()}
        </div>

        ${!isFullscreen && html`
          <div className="px-6 py-3 bg-black border-t border-fuchsia-900/50">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <span className="cyber-font text-[10px] font-black uppercase text-fuchsia-500 tracking-[0.2em] shadow-[0_0_8px_#f0abfc55]">${game.category}</span>
                  <p className="text-[10px] text-fuchsia-200/40 cyber-font uppercase tracking-tight">${game.description}</p>
               </div>
               <div className="cyber-font text-[8px] text-cyan-900 animate-pulse">
                  ${game.id === 'neon-serpent' ? 'LOCAL_EXECUTABLE' : 'PROXY_LOAD: 0.04ms'}
               </div>
            </div>
          </div>
        `}
      </div>
    </div>
  `;
};

export default GameModal;
