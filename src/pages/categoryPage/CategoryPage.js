import React, { useContext, useEffect, useState } from 'react';
import Category from '../../components/category/Category';
import { AddCategory } from '../../components/addButtons/addCategoryButton/AddCategory';
import AddCategoryModal from '../../modals/addCategoryModal/AddCategoryModal';
import { urlImages } from '../../utils/url-util';
import { NO_PHOTO_IMAGE } from '../../constants/util-const';
import { CategoryPageContext } from '../category-page-context/CategoryPageContext';
import './CategoryPage.scss';
import { fetchBackground, fetchGalleries } from '../../api/fetch-data';

const CategoryPage = () => {
  const categoryContext = useContext(CategoryPageContext);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    let cleanUp = false;

    fetchBackground().then((background) => {
      categoryContext.setBackground(background);
    });
    fetchGalleries(cleanUp).then((galleries) => {
      setCategoryData(galleries);
    });

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
                highQualitySrc={
                  data.image
                    ? urlImages('1200x720', data.image.fullpath)
                    : NO_PHOTO_IMAGE
                }
                num_photo={
                  data.image
                    ? `${categoryContext.getNumPhoto()} fotiek`
                    : '0 fotiek'
                }
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
};

export default CategoryPage;
