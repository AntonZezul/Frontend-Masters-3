import React, { useState } from 'react';
import { LOW_QUALITY_SRC } from '../../constants/util-const';
import useProgressiveImg from '../../custom-hooks/ProgressiveImg';

export default function Photo(props) {
  const [src, { blur }] = useProgressiveImg(
    LOW_QUALITY_SRC,
    props.highQualitySrc
  );

  return (
    <div
      onClick={props.wrapperFunction}
      className='photo'
      id='first_photo'
      data-toggle='modal'
      data-target='#photo-modal'>
      <img
        className='background'
        src={src}
        alt={'photos'}
        // loading='lazy'
        style={{
          filter: blur ? 'blur(20px)' : 'none',
          transition: blur ? 'none' : 'filter 0.3s ease-out',
        }}
      />
    </div>
  );
}
