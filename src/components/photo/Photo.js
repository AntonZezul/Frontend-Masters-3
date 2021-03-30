import React from 'react';

export default function Photo(props){
  return (
    <div
      onClick={props.wrapperFunction}
      className='photo'
      id='first_photo'
      data-toggle='modal'
      data-target='#photo-modal'>
      <img className='background' src={props.photo} alt={'photos'} />
    </div>
  );
};
