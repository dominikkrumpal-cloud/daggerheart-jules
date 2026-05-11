import React, { useState, useEffect, useRef } from 'react';

const CountdownClock = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('clock_time');
    return saved ? parseInt(saved, 10) : 600; // Default 10 minutes
  });

  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem('clock_running');
    return saved === 'true';
  });

  const timerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('clock_time', timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem('clock_running', isRunning.toString());
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            setIsRunning(false);
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const adjustTime = (amount) => {
    setTimeLeft((prev) => Math.max(0, prev + amount));
  };

  const resetClock = () => {
    setIsRunning(false);
    setTimeLeft(600);
  };

  const isWarning = timeLeft < 60 && timeLeft > 0;

  return (
    <div className="bg-fantasy-card border border-fantasy-border p-6 rounded-lg shadow-xl flex flex-col items-center space-y-4">
      <h2 className="text-fantasy-gold text-xl font-bold uppercase tracking-widest">Scene Tension</h2>

      <div className={`text-6xl font-mono font-black transition-colors duration-300 ${isWarning ? 'text-red-500 animate-pulse' : 'text-white'}`}>
        {formatTime(timeLeft)}
      </div>

      {isWarning && (
        <div className="text-red-500 text-xs font-bold uppercase animate-bounce">
          Less than 1 minute remaining!
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-6 py-2 rounded font-bold transition-colors ${isRunning ? 'bg-amber-700 hover:bg-amber-600' : 'bg-green-700 hover:bg-green-600'}`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetClock}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded font-bold transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full">
        <button onClick={() => adjustTime(60)} className="px-2 py-1 bg-fantasy-border hover:bg-fantasy-accent rounded text-xs font-bold">+1 Min</button>
        <button onClick={() => adjustTime(-60)} className="px-2 py-1 bg-fantasy-border hover:bg-fantasy-accent rounded text-xs font-bold">-1 Min</button>
        <button onClick={() => adjustTime(10)} className="px-2 py-1 bg-fantasy-border hover:bg-fantasy-accent rounded text-xs font-bold">+10 Sec</button>
        <button onClick={() => adjustTime(-10)} className="px-2 py-1 bg-fantasy-border hover:bg-fantasy-accent rounded text-xs font-bold">-10 Sec</button>
      </div>
    </div>
  );
};

export default CountdownClock;
