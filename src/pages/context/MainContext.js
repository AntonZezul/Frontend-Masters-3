import React, { useState } from 'react';

export const MainContext = React.createContext();

export const ProviderFactory = () => {
  const [background, setBackground] = useState('');
  const [numPhoto, setNumPhoto] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [photoData, setPhotoData] = useState([]);

  return {
    getBackground: () => background,
    setBackground: (background) => setBackground(background),

    getNumPhoto: () => numPhoto,
    setNumPhoto: (numPhoto) => setNumPhoto(numPhoto),

    getCategoryData: () => categoryData,
    setCategoryData: (categoryData) => setCategoryData(categoryData),

    getPhotoData: () => photoData,
    setPhotoData: (photoData) => setPhotoData(photoData),
  };
};

export const MainProvider = ({ children }) => {
  return (
    <MainContext.Provider value={ProviderFactory()}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
