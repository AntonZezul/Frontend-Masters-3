import React from 'react';
import '../AddButtons.scss';

export const AddCategory = () => (
  <div
    className='photo-box-add'
    data-toggle='modal'
    data-target='#add_category_modal'>
    <div className='add-icon-content'>
      <img
        src={'/icons/shape-icon.svg'}
        style={{ width: 50, height: 50, marginBottom: 15 }}
        alt='add_category'
      />
      <p style={{ color: 'darkgrey' }}>PRIDAŤ KATEGÓRIU</p>
    </div>
  </div>
);
