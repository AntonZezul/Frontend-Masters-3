import './AddButtons.scss';

export const AddCategory = () => (
  <div className="photo_box_add" data-toggle="modal" data-target="#add_category_modal">
    <div id="add_photo_category">
      <img
        src={process.env.PUBLIC_URL + "/icons/shape-icon.svg"}
        style={{width: 50, height: 50, marginBottom: 15}}
        alt="add_category"
      />
      <p style={{color: 'darkgrey'}}>PRIDAŤ KATEGÓRIU</p>
    </div>
  </div>
);
