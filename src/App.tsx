import React, { useState } from 'react';
import MainPageContainer from './MainPageContainer';
import newLogo from '../images/newLogo.png';
import ThemeContext from './ThemeContext';

export default function App(): React.JSX.Element {
  const [theme, setTheme] = useState('dark');
  // const { theme, setTheme } = useContext(ThemeContext);
  const handleToggle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value)
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="app" id={theme}>
        <select value={theme} onChange={handleToggle} style={theme === 'dark' ? { backgroundColor: 'rgb(12, 6, 51', color: 'white', marginLeft: '0' } : { backgroundColor: 'white', color: 'black', marginLeft: '0' }}>
          <option value='dark'>dark theme</option>
          <option value='light'>light theme</option>
        </select>
        <div className="kat-header">
          <img id='logo' src={newLogo} />
          <h1>KUBERNETES API TRACKER</h1>
        </div>
        <MainPageContainer />
      </ div>

    </ThemeContext.Provider>
  );
}