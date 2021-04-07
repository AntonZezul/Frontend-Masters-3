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
  fetchNumImages,
} from '../../api/fetch-data';

const CategoryPage = () => {
  const categoryContext = useContext(MainContext);
  const [categoryNum, setCategoryNum] = useState([]);
  const categoryData = categoryContext.getCategoryData();
  const id = [];

  useEffect(() => {
    let cleanUp = false;

    fetchBackground().then((background) => {
      if (!cleanUp) categoryContext.setBackground(background);
    });
    fetchGalleries(cleanUp).then((galleries) => {
      if (!cleanUp) categoryContext.setCategoryData(galleries);
    });

    return () => {
      cleanUp = true;
      console.log('Unmount galleries');
    };
  }, []);

  useEffect(() => {
    const data = categoryData.filter((el) => el.image);
    // categoryData
    //   .filter((el) => el.image)
    //   .forEach((el) => {
    fetchNumImages(data)
      // .then((images) => {
      //   return images.sort((a, b) => a - b);
      // })
      .then((json) => {
        console.log(json)
      });
    // data.forEach(el=>{console.log(el.name)})

    // numPhotoArray.push(images)
    // images.forEach(element=>{
    //  console.log((images.substring(images.length, images.lastIndexOf('/')).replace("/","")))
    // if((el.name).includes(images)){
    // numPhotoArray.push(images)
    // console.log('flflfl')
    // }
    // })
    // });
    // });
    // setCategoryNum(numPhotoArray)
  }, [categoryData]);

  // console.log(categoryNum)

  return (
    <div className='categories'>
      {categoryData
        // .sort((a, b) => a.name.localeCompare(b.name))
        .map((data, i) => {
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
                  data.image ? `${categoryNum[id]} fotiek` : '0 fotiek'
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
