import { NavLink } from "react-router-dom";
import "./Photo_Category.scss";

const Category = (props) => {
  return (
    <div className="photo_box" onMouseEnter={props.onMouseEnter}>
      <NavLink to={`/${props.tag}`} style={{ textDecoration: "none" }}>
        <div className="photo">
          <img
            className="img-photo_gallery"
            src={props.photo}
            alt={props.alt}
          />
        </div>
        <div className="photo_info">
          <p className="photo_text">{props.theme}</p>
          <p className="num_photo_text">{props.num_photo}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Category;
