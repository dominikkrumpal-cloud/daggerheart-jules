import React from 'react';

const EntityCard = ({ entity, updateEntity, removeEntity, isAdversary }) => {
  const handleStatChange = (stat, amount) => {
    updateEntity(entity.id, {
      [stat]: Math.max(0, entity[stat] + amount)
    });
  };

  const handleManualStatChange = (stat, value) => {
    const num = parseInt(value, 10);
    updateEntity(entity.id, {
      [stat]: isNaN(num) ? 0 : Math.max(0, num)
    });
  };

  const toggleCondition = (condition) => {
    const newConditions = { ...entity.conditions, [condition]: !entity.conditions[condition] };
    updateEntity(entity.id, { conditions: newConditions });
  };

  const handleNameChange = (e) => {
    updateEntity(entity.id, { name: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateEntity(entity.id, { portrait: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatColor = (stat) => {
    switch (stat) {
      case 'health': return 'text-red-500';
      case 'evasion': return 'text-green-500';
      case 'stress': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatBg = (stat) => {
    switch (stat) {
      case 'health': return 'hover:bg-red-900/40';
      case 'evasion': return 'hover:bg-green-900/40';
      case 'stress': return 'hover:bg-yellow-900/40';
      default: return 'hover:bg-fantasy-accent';
    }
  };

  return (
    <div className={`relative bg-fantasy-card border ${isAdversary ? 'border-red-900 shadow-red-900/20' : 'border-fantasy-border shadow-black/40'} rounded-lg overflow-hidden shadow-xl transition-all duration-300 group`}>
      {/* Portrait Section */}
      <div className="h-40 w-full relative bg-fantasy-dark overflow-hidden">
        {entity.portrait ? (
          <img src={entity.portrait} alt={entity.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-fantasy-border italic text-sm">
            No Portrait
          </div>
        )}
        <label className="absolute bottom-2 right-2 bg-fantasy-dark/80 hover:bg-fantasy-accent p-1 rounded cursor-pointer transition-colors opacity-0 group-hover:opacity-100">
          <span className="text-[10px] uppercase font-bold text-white">Upload</span>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>

        <button
          onClick={() => removeEntity(entity.id)}
          className="absolute top-2 right-2 bg-red-900/60 hover:bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors opacity-0 group-hover:opacity-100"
        >
          ✕
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Name Input */}
        <input
          type="text"
          value={entity.name}
          onChange={handleNameChange}
          placeholder="Name..."
          className="w-full bg-transparent border-b border-fantasy-border focus:border-fantasy-gold outline-none text-lg font-bold text-fantasy-gold placeholder:text-gray-700"
        />

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-2">
          {['health', 'evasion', 'stress'].map((stat) => (
            <div key={stat} className="flex flex-col items-center">
              <span className={`text-[10px] uppercase font-bold ${getStatColor(stat)}`}>{stat}</span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleStatChange(stat, -1)}
                  className={`w-5 h-5 bg-fantasy-border ${getStatBg(stat)} rounded text-xs transition-colors`}
                >-</button>
                <input
                  type="number"
                  value={entity[stat]}
                  onChange={(e) => handleManualStatChange(stat, e.target.value)}
                  className={`w-8 bg-transparent text-center font-bold text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${getStatColor(stat)}`}
                />
                <button
                  onClick={() => handleStatChange(stat, 1)}
                  className={`w-5 h-5 bg-fantasy-border ${getStatBg(stat)} rounded text-xs transition-colors`}
                >+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Conditions Section */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-fantasy-border">
          {['Hidden', 'Restrained', 'Vulnerable'].map((condition) => (
            <button
              key={condition}
              onClick={() => toggleCondition(condition)}
              className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all duration-200 border ${
                entity.conditions[condition]
                  ? 'bg-fantasy-accent border-fantasy-accent text-white shadow-lg shadow-red-900/20'
                  : 'bg-transparent border-fantasy-border text-gray-500 hover:border-gray-400'
              }`}
            >
              {condition}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntityCard;
