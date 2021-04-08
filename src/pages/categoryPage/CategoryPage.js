import React, { useContext, useEffect, useState } from 'react';
import Category from '../../components/category/Category';
import { AddCategory } from '../../components/addButtons/addCategoryButton/AddCategory';
import AddCategoryModal from '../../modals/addCategoryModal/AddCategoryModal';
import { urlImages } from '../../utils/url-util';
import { NO_PHOTO_IMAGE } from '../../constants/util-const';
import { MainContext } from '../context/MainContext';
import './CategoryPage.scss';
import {
  fetchBackground,
  fetchGalleries,
  countImagesInGalleries,
} from '../../api/fetch-data';

const CategoryPage = () => {
  const categoryContext = useContext(MainContext);
  const [categoryNum, setCategoryNum] = useState(new Map());
  const categoryData = categoryContext.getCategoryData();
  const id = [];

  useEffect(() => {
    let cleanUp = false;

    fetchBackground()
      .then((background) => {
        if (!cleanUp) categoryContext.setBackground(background);
      })
      .catch((e) => {
        console.log(e);
      });

    fetchGalleries()
      .then((galleries) => {
        if (!cleanUp) {
          categoryContext.setCategoryData(galleries);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {
      cleanUp = true;
    };
  }, []);

  useEffect(() => {
    const data = categoryData.filter((el) => el.image);
    countImagesInGalleries(data)
      .then((data) => setCategoryNum(data))
      .catch((e) => {
        console.log(e);
      });
  }, [categoryData]);

  return (
    <div className='categories'>
      {categoryData &&
        categoryData.map((data, i) => {
          if (
            (data.path !== data.name && !data.path.includes('%20')) ||
            data.path.length > 20
          ) {
            return null;
          } else {
            if (data.image) id.push(i);
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
                    ? `${categoryNum.get(data.name)} fotiek`
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
