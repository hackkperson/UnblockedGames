
import React, { useState, useMemo } from 'react';
import { GAMES_DATA } from './constants';
import { Category, Game } from './types';
import GameCard from './components/GameCard';
import GameModal from './components/GameModal';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(Category.ALL);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const categories = Object.values(Category);

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === Category.ALL || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const hotGames = useMemo(() => GAMES_DATA.filter(g => g.isHot), []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <nav className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-fuchsia-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-fuchsia-600 p-1 rounded-sm shadow-[0_0_15px_#f0abfc]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h.01M9 12h.01M15 12h.01M18 12h.01M4 15v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="m9 15 3-3 3 3"/></svg>
              </div>
              <span className="cyber-font text-xl font-black tracking-widest text-white uppercase italic">
                Matty's <span className="text-cyan-400">Unblocked</span>
              </span>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="SEARCH THE SYSTEM..."
                  className="block w-full pl-10 pr-3 py-2 border border-fuchsia-900 rounded-none bg-black text-fuchsia-400 placeholder-fuchsia-900 focus:outline-none focus:ring-1 focus:ring-fuchsia-500 transition-all sm:text-sm cyber-font"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative py-16 px-4 border-b border-fuchsia-500/10 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="cyber-font text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter uppercase italic">
             Cyber <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500">Archive</span>
          </h1>
          <div className="flex items-center justify-center flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-1 border transition-all cyber-font text-[10px] tracking-widest uppercase ${
                  selectedCategory === cat 
                    ? 'bg-fuchsia-500 text-black border-fuchsia-400' 
                    : 'bg-black text-fuchsia-500 border-fuchsia-900 hover:border-fuchsia-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Grid Logic (Simplified for brevity as App.js is the one used by HTML) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} onSelect={setSelectedGame} />
            ))}
          </div>
        </div>
      </main>

      <GameModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </div>
  );
};

export default App;
