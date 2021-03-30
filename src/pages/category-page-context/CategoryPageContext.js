import React, { useState } from 'react';

export const CategoryPageContext = React.createContext();

export const providerFactory = () => {
  const [background, setBackground] = useState('');

  return {
    getBackground: () => background,
    setBackground: (background) => setBackground(background),
  };
};

export const CategoryPageProvider = ({ children }) => {
  return (
    <CategoryPageContext.Provider value={providerFactory()}>
      {children}
    </CategoryPageContext.Provider>
  );
};
