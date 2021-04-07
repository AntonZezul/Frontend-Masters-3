import React from 'react';
import { NavLink } from 'react-router-dom';
import { LOW_QUALITY_SRC } from '../../constants/util-const';
import useProgressiveImg from '../../custom-hooks/ProgressiveImg';

export default function Category(props) {
  const [src, { blur }] = useProgressiveImg(
    LOW_QUALITY_SRC,
    props.highQualitySrc
  );

  return (
    <div className='category' onMouseEnter={props.onMouseEnter}>
      <NavLink to={`/${props.tag}`} style={{ textDecoration: 'none' }}>
        <img
          className='background'
          src={src}
          alt={props.alt}
          style={{
            filter: blur ? 'blur(20px)' : 'none',
            transition: blur ? 'none' : 'filter 0.3s ease-out',
          }}
<<<<<<< HEAD
          // loading='lazy'
=======
          loading='lazy'
>>>>>>> b6726117e0079f779ff0fbc9d42c72e75d0d3018
        />
        <div className='category-description'>
          <p className='title'>{props.theme}</p>
          <p className='num-photo'>{props.num_photo}</p>
        </div>
      </NavLink>
    </div>
  );
}
