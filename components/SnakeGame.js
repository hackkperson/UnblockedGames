
import React, { useEffect, useRef, useState } from 'react';
import { html } from 'htm/react';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER
  const [highScore, setHighScore] = useState(localStorage.getItem('snake-high') || 0);

  const requestRef = useRef();
  const lastTimeRef = useRef();
  
  const gameRef = useRef({
    snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }],
    food: { x: 15, y: 10 },
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    gridSize: 20,
    tileCount: 20,
    speed: 100,
    lastUpdate: 0,
    popups: [],
    glitchTimer: 0
  });

  const animeWords = ["BRRRRT!", "GLITCH!", "BREACH!", "UPLINK!", "OVERRIDE!", "SUGOI!"];

  const initGame = () => {
    gameRef.current = {
      snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }],
      food: { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) },
      direction: { x: 1, y: 0 },
      nextDirection: { x: 1, y: 0 },
      gridSize: 20,
      tileCount: 20,
      speed: 100,
      lastUpdate: 0,
      popups: [],
      glitchTimer: 0
    };
    setScore(0);
    setGameState('PLAYING');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const g = gameRef.current;
      switch (e.key) {
        case 'ArrowUp': 
        case 'w': if (g.direction.y !== 1) g.nextDirection = { x: 0, y: -1 }; break;
        case 'ArrowDown':
        case 's': if (g.direction.y !== -1) g.nextDirection = { x: 0, y: 1 }; break;
        case 'ArrowLeft':
        case 'a': if (g.direction.x !== 1) g.nextDirection = { x: -1, y: 0 }; break;
        case 'ArrowRight':
        case 'd': if (g.direction.x !== -1) g.nextDirection = { x: 1, y: 0 }; break;
        case ' ': if (gameState !== 'PLAYING') initGame(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const update = (time) => {
    const g = gameRef.current;
    if (gameState !== 'PLAYING') {
      render(time);
      requestRef.current = requestAnimationFrame(update);
      return;
    }

    if (!lastTimeRef.current) lastTimeRef.current = time;
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    
    g.glitchTimer += deltaTime;
    g.popups = g.popups.filter(p => p.life > 0);
    g.popups.forEach(p => {
      p.y -= 1;
      p.life -= deltaTime;
    });

    if (time - g.lastUpdate > g.speed) {
      g.lastUpdate = time;
      g.direction = g.nextDirection;

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
        if (g.speed > 60) g.speed -= 2;
      } else {
        g.snake.pop();
      }
    }

    render(time);
    requestRef.current = requestAnimationFrame(update);
  };

  const render = (time) => {
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
    for (let i = 0; i <= canvas.width; i += g.gridSize) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // Food (Data Node) with Glitch Effect
    const foodX = g.food.x * g.gridSize + 10;
    const foodY = g.food.y * g.gridSize + 10;
    
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#22d3ee';
    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.arc(foodX, foodY, 7, 0, Math.PI * 2);
    ctx.fill();

    if (Math.random() > 0.95) {
      ctx.fillStyle = '#f0abfc';
      ctx.fillRect(foodX - 10, foodY - 2, 20, 1);
    }
    ctx.shadowBlur = 0;

    // Snake with mechanical segment appearance
    g.snake.forEach((part, i) => {
      const isHead = i === 0;
      const x = part.x * g.gridSize;
      const y = part.y * g.gridSize;

      if (isHead) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#f0abfc';
        ctx.fillStyle = '#fff';
      } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(112, 26, 117, ${1 - (i / g.snake.length) * 0.5})`;
      }

      const padding = 2;
      const size = g.gridSize - padding * 2;
      ctx.beginPath();
      ctx.roundRect(x + padding, y + padding, size, size, 4);
      ctx.fill();
      
      // Cyber detailing on head
      if (isHead) {
        ctx.strokeStyle = '#f0abfc';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(x + 5, y + 6, 3, 3);
        ctx.fillRect(x + 12, y + 6, 3, 3);
      }
    });

    // Popups
    g.popups.forEach(p => {
      ctx.font = 'bold 12px Orbitron';
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#22d3ee';
      ctx.fillText(p.text, p.x, p.y);
    });

    // Overlay scanlines internal to game
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    for (let j = 0; j < canvas.height; j += 4) {
      ctx.fillRect(0, j, canvas.width, 1);
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, score]);

  return html`
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden font-['Orbitron']">
      <div className="absolute top-4 left-6 flex gap-10 z-20">
        <div className="flex flex-col">
          <span className="text-[10px] text-fuchsia-500 uppercase tracking-[0.3em] font-bold">Data_Harvested</span>
          <span className="text-3xl font-black text-white italic drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">${score.toString().padStart(3, '0')}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-cyan-500 uppercase tracking-[0.3em] font-bold">Node_Record</span>
          <span className="text-3xl font-black text-white/40 italic">${highScore.toString().padStart(3, '0')}</span>
        </div>
      </div>

      <div className="relative p-1 bg-gradient-to-br from-fuchsia-600 to-cyan-600 shadow-[0_0_50px_rgba(240,171,252,0.2)]">
        <div className="bg-black relative border border-white/10">
          <canvas 
            ref=${canvasRef} 
            width="400" 
            height="400" 
            className="block"
          />

          ${gameState === 'START' ? html`
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
              <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-2 leading-none">
                Cyber <span className="text-fuchsia-500">Snake</span>
              </h2>
              <p className="text-cyan-400 text-[10px] tracking-[0.4em] uppercase mb-10 animate-pulse">Breach Mainframe Protocol</p>
              <button 
                onClick=${initGame}
                className="group relative px-10 py-3 bg-transparent overflow-hidden border border-fuchsia-500"
              >
                <div className="absolute inset-0 bg-fuchsia-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative text-fuchsia-500 group-hover:text-black font-black uppercase italic tracking-widest text-sm transition-colors">Initialize Uplink</span>
              </button>
            </div>
          ` : ''}

          ${gameState === 'GAMEOVER' ? html`
            <div className="absolute inset-0 bg-red-950/95 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
              <div className="text-fuchsia-500 mb-2 font-bold tracking-[0.5em] text-[10px] uppercase">FATAL_ERROR</div>
              <h2 className="text-4xl font-black text-white italic mb-2 tracking-tighter uppercase leading-none">Connection Lost</h2>
              <p className="text-fuchsia-300 text-[10px] tracking-[0.2em] uppercase mb-10 opacity-60">Memory Leak Detected // Score: ${score}</p>
              <button 
                onClick=${initGame}
                className="border-2 border-white text-white hover:bg-white hover:text-black font-black px-10 py-3 uppercase italic tracking-widest transition-all text-xs"
              >
                Reboot Matrix
              </button>
            </div>
          ` : ''}
        </div>
      </div>

      <div className="mt-8 flex gap-6 items-center opacity-40">
         <div className="flex flex-col items-center">
            <span className="text-[8px] text-fuchsia-500 font-bold uppercase mb-2">Navigation</span>
            <div className="flex gap-2">
               <span className="border border-white/20 px-2 py-1 text-[10px] text-white">W</span>
               <span className="border border-white/20 px-2 py-1 text-[10px] text-white">A</span>
               <span className="border border-white/20 px-2 py-1 text-[10px] text-white">S</span>
               <span className="border border-white/20 px-2 py-1 text-[10px] text-white">D</span>
            </div>
         </div>
         <div className="h-8 w-[1px] bg-white/10"></div>
         <div className="flex flex-col items-center">
            <span className="text-[8px] text-cyan-500 font-bold uppercase mb-2">Matrix_Pulse</span>
            <span className="border border-white/20 px-4 py-1 text-[10px] text-white uppercase tracking-widest">Space</span>
         </div>
      </div>
      
      <div className="absolute bottom-4 right-4 p-4 opacity-5 pointer-events-none select-none">
        <div className="text-[140px] font-black italic text-white leading-none">龍</div>
      </div>
    </div>
  `;
};

export default SnakeGame;
