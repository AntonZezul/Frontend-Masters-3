import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Category(props) {
  return (
    <div className='category' onMouseEnter={props.onMouseEnter}>
      <NavLink to={`/${props.tag}`} style={{ textDecoration: 'none' }}>
        <img className='background' src={props.photo} alt={props.alt} />
        <div className='category-description'>
          <p className='title'>{props.theme}</p>
          <p className='num-photo'>{props.num_photo}</p>
        </div>
      </NavLink>
    </div>
  );
}
