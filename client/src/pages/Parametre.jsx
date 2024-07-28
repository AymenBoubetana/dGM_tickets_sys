import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../redux/slices/displaySettingsSlice';

const Parametre = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.displaySettings.theme);
  const fontSize = useSelector((state) => state.displaySettings.fontSize);

  const handleSave = () => {
    console.log('Display settings saved');
  };

  return (
    <div className={`p-6 rounded shadow-md ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Préférences d'Affichage</h2>
      <div className="mb-4">
        <label className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Thème</label>
        <select
          value={theme}
          onChange={(e) => dispatch(setTheme(e.target.value))}
          className={`w-full rounded p-2 ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
        >
          <option value="light">Clair</option>
          <option value="dark">Sombre</option>
        </select>
      </div>
      <div className="mb-4">
        <label className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Taille de la Police</label>
        <select
          value={fontSize}
          onChange={(e) => dispatch(setFontSize(e.target.value))}
          className={`w-full rounded p-2 ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
        >
          <option value="small">Petite</option>
          <option value="medium">Moyenne</option>
          <option value="large">Grande</option>
        </select>
      </div>
      
      
    </div>
  );
};

export default Parametre;
