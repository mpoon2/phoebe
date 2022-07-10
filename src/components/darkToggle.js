import React from 'react';

import useDarkMode from 'use-dark-mode'
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div>
      <DarkModeSwitch
        checked={darkMode.value} 
        onChange={darkMode.toggle} 
        size="1.25rem"
        sunColor="var(--text-light)"
        moonColor="var(--text-dark)"
      />
    </div>
  );
};

export default DarkModeToggle;