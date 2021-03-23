import './AddButtons.scss';

export const AddPhoto = () => (
  <div
    className='photo_box_add'
    data-toggle='modal'
    data-target='#add_photo_modal'>
    <div className='add_photo_category'>
      <img
        src={process.env.PUBLIC_URL + '/icons/add-photo-icon.svg'}
        style={{ width: 50, height: 50 }}
        alt='add_photo'
      />
      <p style={{ color: 'darkgrey' }}>PRIDAŤ FOTKY</p>
    </div>
  </div>
);
