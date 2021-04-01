import React, { useContext } from 'react';
import { LOW_QUALITY_SRC } from '../../constants/util-const';
import useProgressiveImg from '../../custom-hooks/ProgressiveImg';
import { CategoryPageContext } from '../../pages/category-page-context/CategoryPageContext';

export default function Background() {
  const backContext = useContext(CategoryPageContext);
  const [src, { blur }] = useProgressiveImg(LOW_QUALITY_SRC, backContext.getBackground());

  return (
    <img
      src={src}
      className='background'
      alt=''
      style={{
        filter: blur ? 'blur(20px)' : 'none',
        transition: blur ? 'none' : 'filter 0.3s ease-out',
      }}
    />
  );
}
