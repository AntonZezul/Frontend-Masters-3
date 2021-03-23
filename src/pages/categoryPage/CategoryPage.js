import React from 'react';
import Category from '../../components/Category';
import HeaderContent from '../../components/HeaderContent';
import { AddCategory } from '../../components/AddCategory';
import AddCategoryModal from '../../modals/addCategoryModal/AddCategoryModal';
import { url_images } from '../../utils/url-util';
import { NO_PHOTO_IMAGE } from '../../constants/util-const';
import { useCategoryPage } from './CategoryPageContext';

export default function CategoryPage() {
  const categoryPage = useCategoryPage();
  return (
    <div className='content'>
      <HeaderContent headerName={'KATEGÓRIE'} icon={false} />
      <div className='img-area'>
        {categoryPage.dataCategory
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
                      ? url_images('1125x750', data.image.fullpath)
                      : NO_PHOTO_IMAGE
                  }
                  num_photo={data.image ? ' fotiek' : '0 fotiek'}
                  onMouseEnter={
                    data.image
                      ? () =>
                          categoryPage.setBackground(
                            url_images('1125x750', data.image.fullpath)
                          )
                      : () => categoryPage.setBackground(NO_PHOTO_IMAGE)
                  }
                />
              );
            }
          })}
        <AddCategory />
        <AddCategoryModal />
      </div>
    </div>
  );
}
