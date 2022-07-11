import React from 'react';

import useDarkMode from 'use-dark-mode'
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <div className="px-2 py-2 rounded-md text-regular font-medium">
      <DarkModeSwitch
        checked={darkMode.value} 
        onChange={darkMode.toggle} 
        size="1rem"
        sunColor="var(--text-light)"
        moonColor="var(--text-dark)"
      />
    </div>
  );
};

export default DarkModeToggle;