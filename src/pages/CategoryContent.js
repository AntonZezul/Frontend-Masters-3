import Category from "../components/Category";
import HeaderContent from "../components/HeaderContent";
import { AddCategory } from "../components/AddCategory";
import AddCategoryModal from "../modals/AddCategoryModal";
import { useEffect, useState } from "react";
import { url_gallery, url_images } from "../utils/Url";
import { NO_PHOTO_IMAGE } from "../utils/util_const";

export default function CategoryContent(props) {
  const [photoDataLen, setPhotoDataLen] = useState([]);

  const displayCategories = () => {
    return props.dataCategory
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((data, i) => {
        const dataPath = data.path;
        const dataName = data.name;
        const dataImage = data.image;
        if (
          (dataPath !== dataName && !dataPath.includes("%20")) ||
          dataPath.length > 15
        ) {
          return null;
        } else {
          if (dataImage === undefined) {
            return (
              <Category
                key={i}
                tag={dataName}
                theme={dataName}
                alt={dataName}
                photo={NO_PHOTO_IMAGE}
                num_photo={"0 fotiek"}
                onMouseEnter={() => props.onMouseEnter(NO_PHOTO_IMAGE)}
              />
            );
          } else {
            // props.dataCategory.map((el) => {
            //   if (el.image !== undefined) {
            //     if (el.image.fullpath === props.categoryImages.fullpath) {
            //       console.log(el.image.fullpath);
            //     } else {
            //       console.log("no");
            //     }
            //   }
            // });
            // if(props.categoryImages ){
            //   console.log(props.categoryImages.fullpath)
            // }
            return (
              <Category
                key={i}
                tag={dataName}
                photo={url_images("1125x750", dataImage.fullpath)}
                theme={dataName}
                alt={dataPath}
                num_photo={photoDataLen + " fotiek"}
                onMouseEnter={() =>
                  props.onMouseEnter(url_images("1125x750", dataImage.fullpath))
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
