
import React from 'react';
import { html } from 'htm/react';

const GameCard = ({ game, onSelect }) => {
  return html`
    <div 
      onClick=${() => onSelect(game)}
      className="group relative bg-black border border-fuchsia-900/40 overflow-hidden cursor-pointer transition-all duration-300 hover:border-fuchsia-500 hover:shadow-[0_0_20px_#f0abfc33]"
    >
      <div className="aspect-video w-full overflow-hidden relative">
        <img 
          src=${game.thumbnail} 
          alt=${game.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
      </div>
      
      ${game.isHot && html`
        <div className="absolute top-0 right-0 bg-fuchsia-600 text-black text-[9px] font-black px-3 py-1 uppercase tracking-tighter cyber-font shadow-[0_0_10px_#f0abfc]">
          Priority
        </div>
      `}

      <div className="p-4 relative">
        <div className="flex justify-between items-start mb-2">
           <h3 className="cyber-font text-base font-bold text-white tracking-tighter group-hover:text-fuchsia-400 transition-colors uppercase italic">
            ${game.title}
          </h3>
          <span className="cyber-font text-[8px] text-fuchsia-800 tracking-tighter uppercase mt-1">v.2.0.4</span>
        </div>
        
        <p className="text-[11px] text-fuchsia-200/40 line-clamp-2 leading-tight tracking-tight mb-4 uppercase cyber-font">
          ${game.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex gap-1">
            <span className="text-[8px] font-black border border-fuchsia-900 text-fuchsia-900 px-1.5 py-0.5 uppercase cyber-font">
              ${game.category}
            </span>
            ${game.tags.slice(0, 1).map(tag => html`
              <span key=${tag} className="text-[8px] font-black bg-cyan-900/10 text-cyan-600 px-1.5 py-0.5 uppercase cyber-font">
                ${tag}
              </span>
            `)}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  `;
};

export default GameCard;
