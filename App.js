
import React, { useState, useMemo } from 'react';
import { html } from 'htm/react';
import { GAMES_DATA } from './constants.js';
import { Category } from './types.js';
import GameCard from './components/GameCard.js';
import GameModal from './components/GameModal.js';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(Category.ALL);
  const [selectedGame, setSelectedGame] = useState(null);

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

  return html`
    <div className="min-h-screen flex flex-col bg-[#050505]">
      <nav className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-fuchsia-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-fuchsia-600 p-1 rounded-sm shadow-[0_0_15px_#f0abfc]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h.01M9 12h.01M15 12h.01M18 12h.01M4 15v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="m9 15 3-3 3 3"/></svg>
              </div>
              <span className="cyber-font text-xl font-black tracking-widest text-white uppercase italic neon-text-fuchsia">
                Matty's <span className="text-cyan-400 neon-text-cyan">Unblocked</span>
              </span>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-fuchsia-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <input
                  type="text"
                  placeholder="SEARCH THE SYSTEM..."
                  className="block w-full pl-10 pr-3 py-2 border border-fuchsia-900 rounded-none bg-black text-fuchsia-400 placeholder-fuchsia-900 focus:outline-none focus:ring-1 focus:ring-fuchsia-500 transition-all sm:text-sm cyber-font"
                  value=${searchQuery}
                  onInput=${(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <span className="cyber-font text-[10px] text-fuchsia-500 tracking-tighter uppercase">Connection: Secure</span>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative py-16 px-4 border-b border-fuchsia-500/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#701a7522,transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="cyber-font text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter uppercase italic">
            Enter the <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 animate-pulse">Matrix</span>
          </h1>
          <p className="text-fuchsia-200/60 text-sm md:text-base max-w-xl mx-auto mb-10 tracking-widest uppercase cyber-font">
             Curated Neural Access // High Performance Game Nodes // Zero Restriction
          </p>
          
          <div className="md:hidden mb-8">
            <input
              type="text"
              placeholder="SEARCH THE SYSTEM..."
              className="w-full px-4 py-3 bg-black border border-fuchsia-900 rounded-none text-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-500 cyber-font text-xs"
              value=${searchQuery}
              onInput=${(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-center flex-wrap gap-3">
            ${categories.map((cat) => html`
              <button
                key=${cat}
                onClick=${() => setSelectedCategory(cat)}
                className=${`px-5 py-1 border transition-all cyber-font text-[10px] tracking-widest uppercase ${
                  selectedCategory === cat 
                    ? 'bg-fuchsia-500 text-black border-fuchsia-400 shadow-[0_0_15px_#f0abfc88]' 
                    : 'bg-black text-fuchsia-500 border-fuchsia-900 hover:border-fuchsia-500 hover:text-fuchsia-400'
                }`}
              >
                ${cat}
              </button>
            `)}
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          ${!searchQuery && selectedCategory === Category.ALL && hotGames.length > 0 && html`
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="cyber-font text-xl font-bold text-white flex items-center gap-3 uppercase tracking-widest">
                  <span className="w-1 h-6 bg-fuchsia-500 shadow-[0_0_10px_#f0abfc]"></span>
                  Neural Hotspots
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                ${hotGames.map(game => html`<${GameCard} key=${game.id} game=${game} onSelect=${setSelectedGame} />`)}
              </div>
            </section>
          `}

          <section>
            <div className="flex items-center justify-between mb-8 border-b border-fuchsia-900/30 pb-4">
              <h2 className="cyber-font text-lg font-bold text-white flex items-center gap-3 uppercase tracking-widest">
                <span className="w-1 h-6 bg-cyan-500 shadow-[0_0_10px_#22d3ee]"></span>
                ${searchQuery ? `SEARCH: ${searchQuery.toUpperCase()}` : `PROTOCOL: ${selectedCategory.toUpperCase()}`}
              </h2>
              <span className="text-fuchsia-900 cyber-font text-[10px] font-medium tracking-tighter">NODE_COUNT: ${filteredGames.length}</span>
            </div>

            ${filteredGames.length > 0 ? html`
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                ${filteredGames.map((game) => html`<${GameCard} key=${game.id} game=${game} onSelect=${setSelectedGame} />`)}
              </div>
            ` : html`
              <div className="text-center py-24 bg-black border border-fuchsia-900/20">
                <div className="bg-fuchsia-950/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-fuchsia-500 border border-fuchsia-900/50">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="m3.34 19 8.66-15 8.66 15z"/></svg>
                </div>
                <h3 className="cyber-font text-xl font-bold text-white mb-2 uppercase tracking-tighter">Sector Empty</h3>
                <p className="text-fuchsia-900 cyber-font text-[10px] tracking-widest uppercase">No data found in this directory.</p>
                <button 
                  onClick=${() => {setSearchQuery(''); setSelectedCategory(Category.ALL);}}
                  className="mt-6 text-cyan-500 hover:text-cyan-300 cyber-font text-xs uppercase tracking-widest border border-cyan-900 px-4 py-1 hover:border-cyan-400 transition-all"
                >
                  Reset Uplink
                </button>
              </div>
            `}
          </section>
        </div>
      </main>

      <footer className="bg-black py-12 border-t border-fuchsia-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="cyber-font text-lg font-black tracking-widest text-white uppercase italic">
                Matty's <span className="text-cyan-400">Archive</span>
              </span>
            </div>
            
            <div className="flex gap-8 cyber-font text-[10px] tracking-widest uppercase text-fuchsia-900">
               <span className="hover:text-fuchsia-500 transition-colors cursor-pointer">Security Protocol</span>
               <span className="hover:text-fuchsia-500 transition-colors cursor-pointer">Grid Status</span>
               <span className="hover:text-fuchsia-500 transition-colors cursor-pointer">Admin Access</span>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-fuchsia-950 text-center text-fuchsia-950 cyber-font text-[9px] tracking-[0.2em] uppercase">
            © 20XX MATTY ARCADE // OPERATING IN STEALTH MODE // UNAUTHORIZED ACCESS IS PART OF THE FUN
          </div>
        </div>
      </footer>

      <${GameModal} 
        game=${selectedGame} 
        onClose=${() => setSelectedGame(null)} 
      />
    </div>
  `;
};

export default App;
