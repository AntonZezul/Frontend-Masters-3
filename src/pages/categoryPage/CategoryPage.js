import React, { useContext, useEffect, useState } from 'react';
import Category from '../../components/category/Category';
import { AddCategory } from '../../components/addButtons/addCategoryButton/AddCategory';
import AddCategoryModal from '../../modals/addCategoryModal/AddCategoryModal';
import { urlGallery, urlImages } from '../../utils/url-util';
import {
  ERROR_GALLERY_MESSAGE,
  NO_PHOTO_IMAGE,
} from '../../constants/util-const';
import { CategoryPageContext } from '../category-page-context/CategoryPageContext';
import './CategoryPage.scss';
// import { fetchBackground } from '../../api/fetch-data';

export default function CategoryPage() {
  const categoryContext = useContext(CategoryPageContext);
  const [categoryData, setCategoryData] = useState([]);

  const fetchBackground = async () => {
    try {
      const backgroundArray = [];
      const response = await fetch(urlGallery(''));
      if (response.ok) {
        const { galleries } = await response.json();
        galleries.forEach((el) => {
          if (el.image === undefined) {
            return null;
          } else {
            return backgroundArray.push(el.image.fullpath);
          }
        });
        categoryContext.setBackground(
          urlImages('1200x720', backgroundArray[0])
        );
      } else {
        throw new Error(ERROR_BACKGROUND_MESSAGE + response.status);
      }
    } catch (e) {
      console.info(e);
    }
  };

  const fetchGalleries = async (cleanUp) => {
    try {
      const response = await fetch(urlGallery(''));
      if (response.ok) {
        const { galleries } = await response.json();
        if (!cleanUp) {
          setCategoryData(galleries);
        }
      } else throw new Error(ERROR_GALLERY_MESSAGE + response.status);
    } catch (e) {
      console.info(e);
    }
  };

  useEffect(() => {
    let cleanUp = false;

    fetchBackground().then()
    fetchGalleries(cleanUp).then();

    return () => {
      cleanUp = true;
    };
  }, []);

  return (
    <div className='categories'>
      {categoryData
        // .sort((a, b) => a.name.localeCompare(b.name))
        .map((data, i) => {
          if (
            (data.path !== data.name && !data.path.includes('%20')) ||
            data.path.length > 15
          ) {
            return null;
          } else {
            return (
              <Category
                key={i}
                tag={data.name}
                theme={data.name}
                alt={data.name}
                photo={
                  data.image
                    ? urlImages('1200x720', data.image.fullpath)
                    : NO_PHOTO_IMAGE
                }
                num_photo={data.image ? ' fotiek' : '0 fotiek'}
                onMouseEnter={
                  data.image
                    ? () =>
                        categoryContext.setBackground(
                          urlImages('1200x720', data.image.fullpath)
                        )
                    : () => categoryContext.setBackground(NO_PHOTO_IMAGE)
                }
              />
            );
          }
        })}
      <AddCategory />
      <AddCategoryModal />
    </div>
  );
}
