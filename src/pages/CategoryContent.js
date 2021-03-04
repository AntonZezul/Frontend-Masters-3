import Category from "../components/Category";
import HeaderContent from "../components/HeaderContent";
import { AddCategory } from "../components/AddCategory";
import AddCategoryModal from "../modals/AddCategoryModal";
import { useEffect, useState } from "react";

export default function CategoryContent(props) {
  const URL_IMAGE = "http://api.programator.sk/images/1125x750/";
  const [photoData, setPhotoData] = useState([]);
  const noPhotoImage =
    "https://databox-360.com/wp-content/themes/consultix/images/no-image-found-360x250.png";

  const displayCategories = () => {
    return props.dataCategory.map((data, i) => {
      const dataPath = data.path;
      const dataName = data.name;
      const dataImage = data.image;
      if (dataPath !== dataName && !dataPath.includes("%20") || dataPath.length > 15) {
        return null;
      } else {
        if (dataImage === undefined) {
          return (
            <Category
              key={i}
              tag={dataName}
              theme={dataName}
              alt={dataName}
              photo={noPhotoImage}
              num_photo={"0 fotiek"}
              onClick={() => props.onClick(dataPath)}
              onMouseEnter={() => props.onMouseEnter(noPhotoImage)}
            />
          );
        } else {
          return (
            <Category
              key={i}
              tag={dataName}
              photo={URL_IMAGE + dataImage.fullpath}
              theme={dataName}
              alt={dataPath}
              num_photo={
                // props.dataPhotoLength.length + " fotiek"
                `http://api.programator.sk/gallery/${dataPath}`.length +
                " fotiek"
              }
              onClick={() => props.onClick(dataPath)}
              onMouseEnter={() =>
                props.onMouseEnter(
                  `http://api.programator.sk/images/1125x750/${dataImage.fullpath}`
                )
              }
            />
          );
        }
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
