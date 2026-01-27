
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
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-cyan-500 p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h.01M9 12h.01M15 12h.01M18 12h.01M4 15v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="m9 15 3-3 3 3"/></svg>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic">NovaArcade</span>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <input
                  type="text"
                  placeholder="Search games..."
                  className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-xl leading-5 bg-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white font-medium text-sm transition-colors px-3 py-2 rounded-lg hover:bg-slate-800">Request Game</a>
              <a href="#" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-lg text-sm transition-all shadow-lg shadow-cyan-500/20">Sign In</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero / Mobile Search */}
      <header className="bg-gradient-to-b from-slate-900 to-slate-950 pt-12 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Play <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Unblocked</span> Games Anywhere.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            A premium collection of high-quality web games. No downloads, no blocked sites, just pure fun.
          </p>
          
          <div className="md:hidden mb-8">
            <input
              type="text"
              placeholder="Search games..."
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Quick Categories */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Featured Section */}
          {!searchQuery && selectedCategory === Category.ALL && hotGames.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
                  Trending Now
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotGames.map(game => (
                  <GameCard key={game.id} game={game} onSelect={setSelectedGame} />
                ))}
              </div>
            </section>
          )}

          {/* All Games Grid */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                {searchQuery ? `Results for "${searchQuery}"` : `${selectedCategory} Games`}
              </h2>
              <span className="text-slate-500 text-sm font-medium">{filteredGames.length} games found</span>
            </div>

            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} onSelect={setSelectedGame} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
                <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
                <p className="text-slate-500">The arcade is currently empty. Check back later!</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory(Category.ALL);}}
                  className="mt-6 text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-cyan-500 p-1.5 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h.01M9 12h.01M15 12h.01M18 12h.01M4 15v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="m9 15 3-3 3 3"/></svg>
                </div>
                <span className="text-xl font-black tracking-tighter text-white uppercase italic">NovaArcade</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6">
                Bringing the best unblocked gaming experience to schools, offices, and homes worldwide. Fast, safe, and always free.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-slate-950 transition-all">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-slate-950 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Explore</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Popular Games</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">New Releases</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Arcade Classics</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Puzzle Solvers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            © 2024 NovaArcade. All rights reserved. Games are property of their respective owners.
          </div>
        </div>
      </footer>

      {/* Game Modal */}
      <GameModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </div>
  );
};

export default App;
