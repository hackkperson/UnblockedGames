
import React, { useEffect, useRef, useState } from 'react';
import { html } from 'htm/react';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER
  const [highScore, setHighScore] = useState(localStorage.getItem('snake-high') || 0);

  const requestRef = useRef();
  const lastTimeRef = useRef();
  
  // Game variables stored in refs to avoid closure issues in the loop
  const gameRef = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 5, y: 5 },
    direction: { x: 0, y: 0 },
    nextDirection: { x: 0, y: 0 },
    gridSize: 20,
    tileCount: 20,
    speed: 100,
    lastUpdate: 0,
    popups: []
  });

  const animeWords = ["SUGOI!", "KAWAII!", "OISHII!", "NANI?!", "YAHOO!", "DESU!"];

  const initGame = () => {
    gameRef.current = {
      snake: [{ x: 10, y: 10 }],
      food: { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) },
      direction: { x: 0, y: 0 },
      nextDirection: { x: 0, y: 0 },
      gridSize: 20,
      tileCount: 20,
      speed: 100,
      lastUpdate: 0,
      popups: []
    };
    setScore(0);
    setGameState('PLAYING');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const g = gameRef.current;
      switch (e.key) {
        case 'ArrowUp': if (g.direction.y !== 1) g.nextDirection = { x: 0, y: -1 }; break;
        case 'ArrowDown': if (g.direction.y !== -1) g.nextDirection = { x: 0, y: 1 }; break;
        case 'ArrowLeft': if (g.direction.x !== 1) g.nextDirection = { x: -1, y: 0 }; break;
        case 'ArrowRight': if (g.direction.x !== -1) g.nextDirection = { x: 1, y: 0 }; break;
        case ' ': if (gameState !== 'PLAYING') initGame(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const update = (time) => {
    const g = gameRef.current;
    if (gameState !== 'PLAYING') {
      render();
      requestRef.current = requestAnimationFrame(update);
      return;
    }

    if (!lastTimeRef.current) lastTimeRef.current = time;
    const deltaTime = time - lastTimeRef.current;
    
    // Update Popups
    g.popups = g.popups.filter(p => p.life > 0);
    g.popups.forEach(p => {
      p.y -= 1;
      p.life -= deltaTime;
    });

    if (time - g.lastUpdate > g.speed) {
      g.lastUpdate = time;
      g.direction = g.nextDirection;

      if (g.direction.x === 0 && g.direction.y === 0) {
        render();
        requestRef.current = requestAnimationFrame(update);
        return;
      }

      const head = { x: g.snake[0].x + g.direction.x, y: g.snake[0].y + g.direction.y };

      // Collisions
      if (head.x < 0 || head.x >= g.tileCount || head.y < 0 || head.y >= g.tileCount ||
          g.snake.some(p => p.x === head.x && p.y === head.y)) {
        setGameState('GAMEOVER');
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('snake-high', score);
        }
        return;
      }

      g.snake.unshift(head);

      // Food check
      if (head.x === g.food.x && head.y === g.food.y) {
        setScore(s => s + 10);
        g.popups.push({
          x: g.food.x * g.gridSize,
          y: g.food.y * g.gridSize,
          text: animeWords[Math.floor(Math.random() * animeWords.length)],
          life: 800
        });
        g.food = {
          x: Math.floor(Math.random() * g.tileCount),
          y: Math.floor(Math.random() * g.tileCount)
        };
        if (g.speed > 50) g.speed -= 1;
      } else {
        g.snake.pop();
      }
    }

    render();
    requestRef.current = requestAnimationFrame(update);
  };

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const g = gameRef.current;

    // BG
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle Grid
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < canvas.width; i += g.gridSize) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // Food
    ctx.fillStyle = '#22d3ee';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#22d3ee';
    ctx.beginPath();
    ctx.arc(g.food.x * g.gridSize + 10, g.food.y * g.gridSize + 10, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Snake
    g.snake.forEach((part, i) => {
      ctx.fillStyle = i === 0 ? '#f0abfc' : '#701a75';
      if (i === 0) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#f0abfc';
      } else {
        ctx.shadowBlur = 0;
      }
      
      const padding = 2;
      ctx.fillRect(
        part.x * g.gridSize + padding, 
        part.y * g.gridSize + padding, 
        g.gridSize - padding * 2, 
        g.gridSize - padding * 2
      );
    });

    // Popups
    g.popups.forEach(p => {
      ctx.font = 'bold 12px Orbitron';
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#f0abfc';
      ctx.fillText(p.text, p.x, p.y);
    });
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, score]);

  return html`
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden font-['Orbitron']">
      <div className="absolute top-4 left-6 flex gap-8 z-20">
        <div className="flex flex-col">
          <span className="text-[10px] text-fuchsia-500 uppercase tracking-widest">Score</span>
          <span className="text-2xl font-black text-white italic">${score.toString().padStart(3, '0')}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-cyan-500 uppercase tracking-widest">High</span>
          <span className="text-2xl font-black text-white italic">${highScore.toString().padStart(3, '0')}</span>
        </div>
      </div>

      <div className="relative border-4 border-fuchsia-900/50 shadow-[0_0_40px_rgba(240,171,252,0.1)]">
        <canvas 
          ref=${canvasRef} 
          width="400" 
          height="400" 
          className="block bg-black"
        />

        ${gameState === 'START' ? html`
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-4xl font-black text-white italic mb-4 tracking-tighter uppercase">
              Neon <span className="text-fuchsia-500">Serpent</span>
            </h2>
            <p className="text-cyan-400 text-xs tracking-widest uppercase mb-8">Neural Uplink Initialized</p>
            <button 
              onClick=${initGame}
              className="bg-fuchsia-600 hover:bg-fuchsia-500 text-black font-black px-8 py-2 uppercase italic tracking-widest transition-all shadow-[0_0_15px_rgba(240,171,252,0.5)]"
            >
              Start Mission
            </button>
          </div>
        ` : ''}

        ${gameState === 'GAMEOVER' ? html`
          <div className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
            <h2 className="text-5xl font-black text-white italic mb-2 tracking-tighter uppercase">Connection Lost</h2>
            <p className="text-fuchsia-300 text-xs tracking-[0.3em] uppercase mb-8">System Malfunction // Score: ${score}</p>
            <button 
              onClick=${initGame}
              className="border-2 border-white text-white hover:bg-white hover:text-black font-black px-8 py-2 uppercase italic tracking-widest transition-all"
            >
              Reboot Matrix
            </button>
          </div>
        ` : ''}
      </div>

      <div className="mt-6 text-fuchsia-900 text-[10px] tracking-widest uppercase flex gap-4">
        <span>[W][A][S][D] or Arrows to Navigate</span>
        <span>•</span>
        <span>Space to Pulse</span>
      </div>
      
      <div className="absolute bottom-0 right-0 p-4 opacity-10 pointer-events-none">
        <div className="text-[120px] font-black italic text-white leading-none">龍</div>
      </div>
    </div>
  `;
};

export default SnakeGame;
