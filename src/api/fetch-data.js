// import { useContext } from "react";
// import { ERROR_BACKGROUND_MESSAGE } from "../constants/util-const";
// import { CategoryPageContext } from "../pages/category-page-context/CategoryPageContext";
// import { urlGallery } from "../utils/url-util";


// const categoryContextFetch = useContext(CategoryPageContext);

// export const fetchBackground = async () => {
//     try {
//       const backgroundArray = [];
//       const response = await fetch(urlGallery(''));
//       if (response.ok) {
//         const { galleries } = await response.json();
//         galleries.forEach((el) => {
//           if (el.image === undefined) {
//             return null;
//           } else {
//             return backgroundArray.push(el.image.fullpath);
//           }
//         });
//         categoryContextFetch.setBackground(
//           urlImages('1200x720', backgroundArray[0])
//         );
//       } else {
//         throw new Error(ERROR_BACKGROUND_MESSAGE + response.status);
//       }
//     } catch (e) {
//       console.info(e);
//     }
//   };