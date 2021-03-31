import React, { useState } from 'react';

export const CategoryPageContext = React.createContext();

export const ProviderFactory = () => {
  const [background, setBackground] = useState('');
  const [numPhoto, setNumPhoto] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  return {
    getBackground: () => background,
    setBackground: (background) => setBackground(background),

    getNumPhoto: () => numPhoto,
    setNumPhoto: (numPhoto) => setNumPhoto(numPhoto),

    getCategoryData: () => categoryData,
    setCategoryData: (categoryData) => setCategoryData(categoryData),
  };
};

export const CategoryPageProvider = ({ children }) => {
  return (
    <CategoryPageContext.Provider value={ProviderFactory()}>
      {children}
    </CategoryPageContext.Provider>
  );
};

export default CategoryPageContext;
