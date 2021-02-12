import Category from "../components/Category";
import HeaderContent from "../components/HeaderContent";
import { AddCategory } from "../components/AddCategory";
import AddCategoryModal from "../modals/AddCategoryModal";
import { useEffect, useState } from "react";

export default function CategoryContent(props) {
  const URL_IMAGE = "http://api.programator.sk/images/1125x750/";
  const [photoData, setPhotoData] = useState([]);

  const displayCategories = () => {
    return props.dataCategory.map((data, i) => {
      const dataPath = data.path;
      const dataImage = data.image;
      if (dataImage === undefined) {
        return null;
      } else {
        return (
          <Category
            key={i}
            tag={data.name}
            photo={URL_IMAGE + dataImage.fullpath}
            theme={data.name}
            num_photo={
              // props.dataPhotoLength.length + " fotiek"
              `http://api.programator.sk/gallery/${dataPath}`.length + " fotiek"
            }
            onClick={() => props.onClick(data.name)}
            onMouseEnter={()=>props.onMouseEnter(`http://api.programator.sk/images/1125x750/${dataImage.fullpath}`)}
          />
        );
      }
    });
  };

  return (
    <div className="content">
      <HeaderContent headerName={"KATEGÓRIE"} icon={false} />
      <div className="img-area">
        {displayCategories()}
        <AddCategory />
        <AddCategoryModal />
      </div>
    </div>
  );
}
