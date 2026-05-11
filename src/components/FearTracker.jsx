import React, { useState, useEffect } from 'react';

const FearTracker = () => {
  const [fear, setFear] = useState(() => {
    const saved = localStorage.getItem('fear_value');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('fear_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [fearImage, setFearImage] = useState(() => {
    return localStorage.getItem('fear_image') || null;
  });

  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    localStorage.setItem('fear_value', fear.toString());
  }, [fear]);

  useEffect(() => {
    localStorage.setItem('fear_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    if (fearImage) {
      localStorage.setItem('fear_image', fearImage);
    }
  }, [fearImage]);

  const addLog = (message) => {
    const newLog = {
      id: Date.now(),
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setLogs(prev => [newLog, ...prev].slice(0, 5));
  };

  const incrementFear = () => {
    if (fear < 12) {
      setFear(prev => prev + 1);
      addLog('Fear +1');
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 500);
    }
  };

  const decrementFear = () => {
    if (fear > 0) {
      setFear(prev => prev - 1);
      addLog('Fear spent');
    }
  };

  const resetFear = () => {
    setFear(0);
    addLog('Fear reset');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFearImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFearColor = () => {
    if (fear >= 10) return 'text-fear-fiery';
    if (fear >= 7) return 'text-fear-danger';
    if (fear >= 4) return 'text-fear-warning';
    return 'text-fear-cold';
  };

  return (
    <div className={`bg-fantasy-card border border-fantasy-border p-6 rounded-lg shadow-xl flex flex-col items-center space-y-4 relative overflow-hidden transition-all duration-500 ${isPulsing ? 'animate-fear-pulse' : ''} ${fear >= 10 ? 'ring-2 ring-fear-fiery' : ''}`}>
      {fearImage && (
        <div className="absolute inset-0 opacity-20 z-0">
          <img src={fearImage} alt="Fear background" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center w-full">
        <h2 className="text-fantasy-gold text-xl font-bold uppercase tracking-widest mb-4">Fear Tracker</h2>

        <div className={`text-6xl font-black transition-colors duration-500 mb-6 drop-shadow-lg ${getFearColor()} ${fear >= 10 ? 'animate-fiery' : ''}`}>
          Fear: {fear} / 12
        </div>

      <div className="flex space-x-4">
        <button
          onClick={decrementFear}
          className="px-4 py-2 bg-fantasy-border hover:bg-fantasy-accent transition-colors rounded font-bold"
        >
          -1 Fear
        </button>
        <button
          onClick={incrementFear}
          className="px-4 py-2 bg-fantasy-accent hover:bg-red-700 transition-colors rounded font-bold"
        >
          +1 Fear
        </button>
        <button
          onClick={resetFear}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-colors rounded font-bold"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center">
        <label className="text-xs uppercase text-gray-500 font-bold mb-1 cursor-pointer hover:text-fantasy-gold transition-colors">
          Upload Fear Image
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      </div>

      <div className="w-full mt-4 relative z-10">
        <h3 className="text-xs uppercase text-gray-500 mb-2 font-bold">Event Log</h3>
        <div className="bg-fantasy-dark rounded p-2 text-sm h-24 overflow-y-auto border border-fantasy-border">
          {logs.length === 0 && <div className="text-gray-600 italic">No events yet...</div>}
          {logs.map(log => (
            <div key={log.id} className="flex justify-between border-b border-fantasy-border py-1">
              <span>{log.message}</span>
              <span className="text-gray-600 text-xs">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default FearTracker;
