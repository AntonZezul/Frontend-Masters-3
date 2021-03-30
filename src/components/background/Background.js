import React from 'react';
import { useCategoryPage } from '../../pages/category-page-context/CategoryPageContext';

export default function Background() {
  const back = useCategoryPage();
  return <img src={back.background} className='background' alt='' />;
}