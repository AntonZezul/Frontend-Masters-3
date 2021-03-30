import React from 'react';
import Category from '../../components/category/Category';
import { AddCategory } from '../../components/addButtons/addCategoryButton/AddCategory';
import AddCategoryModal from '../../modals/addCategoryModal/AddCategoryModal';
import { url_images } from '../../utils/url-util';
import { NO_PHOTO_IMAGE } from '../../constants/util-const';
import { useCategoryPage } from '../category-page-context/CategoryPageContext';
import './CategoryPage.scss';
import { useHistory } from 'react-router';

export default function CategoryPage() {
  const categoryPage = useCategoryPage();

  const history = useHistory();
  console.log(history);
  return (
    <div className='categories'>
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
                    ? url_images('1200x720', data.image.fullpath)
                    : NO_PHOTO_IMAGE
                }
                num_photo={data.image ? ' fotiek' : '0 fotiek'}
                onMouseEnter={
                  data.image
                    ? () =>
                        categoryPage.setBackground(
                          url_images('1200x720', data.image.fullpath)
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
  );
}
