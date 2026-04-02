'use client';

import CustomCursor from './CustomCursor';
import { useTheme } from '../context/ThemeContext';

// This component wraps client-side only components to prevent hydration issues
const ClientComponents = () => {
  const { theme } = useTheme();
  
  return (
    <>
      <CustomCursor />
      {/* Add any other client-only components here */}
    </>
  );
};

export default ClientComponents;
