import React from 'react';

import useDarkMode from 'use-dark-mode'
import { Toggle } from 'react-toggle-component'

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div>
      <span role="img" aria-label="sun">🔆</span>
      <Toggle 
        leftBackgroundColor="#ffffff"
        rightBackgroundColor="#1a1919"
        radius="3px" 
        radiusBackground="2px" 
        knobRadius="2px"
        borderColor="black"
        name="toggle-switch"
        checked={darkMode.value} 
        onChange={darkMode.toggle} 
      />
      <span role="img" aria-label="moon">🌙</span>
    </div>
  );
};

export default DarkModeToggle;