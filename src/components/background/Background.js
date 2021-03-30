import React, { useContext } from 'react';
import { CategoryPageContext } from '../../pages/category-page-context/CategoryPageContext';

export default function Background() {
  const backContext = useContext(CategoryPageContext);

  return (
    <img src={backContext.getBackground()} className='background' alt='' />
  );
}
