
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

// Fixed 'key' property error by explicitly typing the component as React.FC
const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(game)}
      className="group relative bg-slate-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {game.isHot && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider animate-pulse">
          Hot
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-cyan-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
        
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-[10px] font-semibold bg-slate-700 text-slate-300 px-2 py-0.5 rounded uppercase">
            {game.category}
          </span>
          {game.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] font-semibold bg-cyan-900/30 text-cyan-400 px-2 py-0.5 rounded uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
        <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          Play Now
        </button>
      </div>
    </div>
  );
};

export default GameCard;
