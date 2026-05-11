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

  const totalSeconds = 600; // Reference for progress ring if needed, though time can exceed it
  const percentage = Math.min(100, (timeLeft / totalSeconds) * 100);
  const strokeDashoffset = 440 - (440 * percentage) / 100;

  return (
    <div className="bg-fantasy-card border border-fantasy-border p-6 rounded-lg shadow-xl flex flex-col items-center space-y-6">
      <h2 className="text-fantasy-gold text-xl font-bold uppercase tracking-widest">Scene Tension</h2>

      {/* Stopwatch Circle */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Progress Ring */}
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="transparent"
            stroke="rgba(45, 45, 53, 0.5)"
            strokeWidth="8"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="transparent"
            stroke={isWarning ? "#ef4444" : "#c5a059"}
            strokeWidth="8"
            strokeDasharray="440"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          <div className={`text-5xl font-mono font-black transition-colors duration-300 ${isWarning ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            {formatTime(timeLeft)}
          </div>
          {isWarning && (
            <div className="text-red-500 text-[10px] font-bold uppercase animate-bounce mt-2">
              Low Time!
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 w-full">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex-1 min-w-[100px] py-2 rounded font-bold transition-colors ${isRunning ? 'bg-amber-700 hover:bg-amber-600' : 'bg-green-700 hover:bg-green-600'}`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetClock}
          className="flex-1 min-w-[100px] py-2 bg-gray-700 hover:bg-gray-600 rounded font-bold transition-colors"
        >
          Restart
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 w-full">
        <button onClick={() => adjustTime(60)} className="px-1 py-2 bg-fantasy-border hover:bg-fantasy-accent rounded text-[10px] font-bold uppercase">+1m</button>
        <button onClick={() => adjustTime(-60)} className="px-1 py-2 bg-fantasy-border hover:bg-fantasy-accent rounded text-[10px] font-bold uppercase">-1m</button>
        <button onClick={() => adjustTime(10)} className="px-1 py-2 bg-fantasy-border hover:bg-fantasy-accent rounded text-[10px] font-bold uppercase">+10s</button>
        <button onClick={() => adjustTime(-10)} className="px-1 py-2 bg-fantasy-border hover:bg-fantasy-accent rounded text-[10px] font-bold uppercase">-10s</button>
      </div>
    </div>
  );
};

export default CountdownClock;
