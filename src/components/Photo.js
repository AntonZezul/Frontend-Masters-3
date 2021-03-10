import "./Photo_Category.scss";

const Photo = (props) => {
  return (
    <div
      onClick={props.wrapperFunction}
      className="photo_box"
      id="first_photo"
      data-toggle="modal"
      data-target="#photo-modal"
    >
      <img className="img_gallery" src={props.photo} alt={"photos"}/>
    </div>
  );
};

export default Photo;
