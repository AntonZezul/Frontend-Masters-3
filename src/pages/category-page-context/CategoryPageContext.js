import React, { useContext, useEffect, useState } from 'react';
import {
  ERROR_BACKGROUND_MESSAGE,
  ERROR_GALLERY_MESSAGE,
} from '../../constants/util-const';
import { url_gallery, url_images } from '../../utils/url-util';

const CategoryPageContext = React.createContext();

export const useCategoryPage = () => {
  return useContext(CategoryPageContext);
};

export const CategoryPageProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [background, setBackground] = useState('');

  useEffect(() => {
    let cleanUp = false;
    fetch(url_gallery(''))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(ERROR_GALLERY_MESSAGE + response.status);
        }
      })
      .then((json) => json.galleries)
      .then((galleries) => {
        if (!cleanUp) {
          setCategoryData(galleries);
        }
      })
      .catch((err) => {
        console.info(err);
      });
    return () => {
      cleanUp = true;
    };
  }, []);

  useEffect(() => {
    const backgroundArray = [];
    fetch(url_gallery(''))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(ERROR_BACKGROUND_MESSAGE + response.status);
        }
      })
      .then((json) => json.galleries)
      .then((galleries) => {
        galleries.forEach((el) => {
          if (el.image === undefined) {
            return null;
          } else {
            return backgroundArray.push(el.image.fullpath);
          }
        });
        setBackground(url_images('1125x750', backgroundArray[0]));
      })
      .catch((err) => {
        console.info(err);
      });
  }, []);

  return (
    <CategoryPageContext.Provider
      value={{
        dataCategory: categoryData,
        background: background,
        setBackground,
      }}>
      {children}
    </CategoryPageContext.Provider>
  );
};
