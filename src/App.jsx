import React from 'react';
import FearTracker from './components/FearTracker';
import CountdownClock from './components/CountdownClock';
import EntitySection from './components/EntitySection';

function App() {
  return (
    <div className="min-h-screen bg-fantasy-dark text-gray-100 p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-fantasy-gold drop-shadow-2xl">
          Daggerheart <span className="text-white">Dashboard</span>
        </h1>
        <div className="h-1 w-24 bg-fantasy-accent mx-auto mt-4 rounded-full"></div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        {/* Top Section: Fear and Clock */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FearTracker />
          <CountdownClock />
        </section>

        {/* Heroes Section */}
        <EntitySection
          title="Heroes"
          type="hero"
          storageKey="dh_heroes"
        />

        {/* Adversaries Section */}
        <EntitySection
          title="Adversaries"
          type="adversary"
          storageKey="dh_adversaries"
        />
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-20 pt-8 border-t border-fantasy-border text-center text-gray-600 text-sm italic">
        "In the shadow of the Dagger, our story unfolds."
      </footer>
    </div>
  );
}

export default App;
