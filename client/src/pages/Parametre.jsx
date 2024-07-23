import React, { useState } from 'react';

const Parametre = () => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [compactMode, setCompactMode] = useState(false);

  const handleSave = () => {
    // Logic to save display settings
    console.log('Display settings saved');
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Préférences d'Affichage</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Thème</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full border-gray-300 rounded p-2"
        >
          <option value="light">Clair</option>
          <option value="dark">Sombre</option>
          <option value="custom">Personnalisé</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Taille de la Police</label>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="w-full border-gray-300 rounded p-2"
        >
          <option value="small">Petite</option>
          <option value="medium">Moyenne</option>
          <option value="large">Grande</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Mode Compacte</label>
        <input
          type="checkbox"
          checked={compactMode}
          onChange={(e) => setCompactMode(e.target.checked)}
          className="ml-2"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Sauvegarder
      </button>
    </div>
  );
};

export default Parametre;
