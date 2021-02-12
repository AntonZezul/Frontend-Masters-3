import { NavLink } from "react-router-dom";
import "./Photo_Category.scss";
// import CJSON from "../storage/CategoryJSON.json";

const Category = (props) => {
  return (
    <div
      className="photo_box"
      onMouseEnter={props.onMouseEnter}
      onClick={props.onClick}
    >
      <NavLink
        to={{
          pathname: `/album/${props.tag}`,
          state: { pass: `${props.theme}` },
        }}
        style={{ textDecoration: "none" }}
      >
        <div className="photo">
          <img className="img-photo_gallery" src={props.photo} alt={"box"} />
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
