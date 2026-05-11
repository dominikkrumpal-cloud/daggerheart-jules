import React, { useState, useEffect } from 'react';
import EntityCard from './EntityCard';

const EntitySection = ({ title, type, storageKey }) => {
  const [entities, setEntities] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(entities));
  }, [entities, storageKey]);

  const addEntity = () => {
    const newEntity = {
      id: Date.now(),
      name: '',
      health: 0,
      evasion: 0,
      stress: 0,
      portrait: null,
      conditions: {
        Hidden: false,
        Restrained: false,
        Vulnerable: false
      }
    };
    setEntities([...entities, newEntity]);
  };

  const updateEntity = (id, updates) => {
    setEntities(entities.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const removeEntity = (id) => {
    setEntities(entities.filter(e => e.id !== id));
  };

  const isAdversary = type === 'adversary';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-fantasy-border pb-2">
        <h2 className={`text-2xl font-black uppercase tracking-tighter ${isAdversary ? 'text-red-600' : 'text-blue-400'}`}>
          {title}
        </h2>
        <button
          onClick={addEntity}
          className={`px-4 py-1 rounded font-bold uppercase text-sm transition-colors border ${
            isAdversary
              ? 'bg-red-900/20 border-red-900 text-red-500 hover:bg-red-900/40'
              : 'bg-blue-900/20 border-blue-900 text-blue-500 hover:bg-blue-900/40'
          }`}
        >
          + Add {type}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {entities.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-600 italic border-2 border-dashed border-fantasy-border rounded-lg">
            No {title.toLowerCase()} added yet. Click the button above to begin.
          </div>
        )}
        {entities.map(entity => (
          <EntityCard
            key={entity.id}
            entity={entity}
            updateEntity={updateEntity}
            removeEntity={removeEntity}
            isAdversary={isAdversary}
          />
        ))}
      </div>
    </div>
  );
};

export default EntitySection;
