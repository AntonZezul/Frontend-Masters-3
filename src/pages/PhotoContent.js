import HeaderContent from "../components/HeaderContent";
import { AddPhoto } from "../components/AddPhoto";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import PhotoView from "../modals/PhotoView";
import { lazy, Suspense, useEffect, useState } from "react";
import AddPhotoModal from "../modals/AddPhotoModal";
import Loading from "../components/Loading";
import { url_gallery, url_images } from "../utils/Url";
import Photo from "../components/Photo";
import {
  ERROR_GALLERY_PATH_MESSAGE,
  ERROR_IMAGES_MESSAGE,
} from "../utils/util_const";

export default function PhotoContent(props) {
  const { tag } = useParams();
  const [image, setImage] = useState("");
  const [index, setIndex] = useState();
  const [photoData, setPhotoData] = useState([]);
  const background = [];
  const history = useHistory();

  const arrID = photoData !== null ? photoData.map((_, i) => i) : null;
  const arrPhoto =
    photoData !== null
      ? photoData.map((photo) => url_images("1125x750", photo.fullpath))
      : null;

  const wrapperFunction = (id) => {
    setIndex(arrID[id]);
    setImage(arrPhoto[arrID[id]]);
  };

  const nextIc = (id) => {
    id++;
    setIndex(id);
    setImage(arrPhoto[id]);
    if (id === arrPhoto.length) {
      setIndex(0);
      setImage(arrPhoto[0]);
    }
  };

  const prevIc = (id) => {
    id--;
    setIndex(id);
    setImage(arrPhoto[id]);
    if (id < 0) {
      setIndex(arrPhoto.length - 1);
      setImage(arrPhoto[arrPhoto.length - 1]);
    }
  };

  const displayPhotos = () => {
    return photoData
      .sort((a, b) => Date.parse(a.modified) - Date.parse(b.modified))
      .map((data, i) => {
        background.push(data.fullpath);
        return (
          <Photo
            key={i}
            photo={url_images("1125x750", data.fullpath)}
            wrapperFunction={() => wrapperFunction(i)}
          />
        );
      });
  };
  // const firstLetterUppercase = (name) =>
  //   name.charAt(0).toUpperCase() + name.slice(1);

  useEffect(() => {
    let cleanUp = false;
    fetch(url_gallery("/" + tag))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          history.push("/");
          throw new Error(ERROR_GALLERY_PATH_MESSAGE + response.status);
        }
      })
      .then((json) => json.images)
      .then((image) => {
        return image;
      })
      .then((data) => {
        // console.log(data);
        if (data.length === 0 && !cleanUp) {
          setPhotoData([]);
        } else {
          data.forEach((element, i) => {
            fetch(url_images("1125x750", element.fullpath))
              .then((img) => {
                if (img.ok) {
                  if (data.length - i === 1 && !cleanUp) {
                    setPhotoData(data);
                  }
                } else {
                  data.splice(i, 1);
                  throw new Error(ERROR_IMAGES_MESSAGE + img.status);
                }
              })
              .catch((err) => console.info(err));
          });
        }
      })
      .catch((err) => console.info(err));
    return () => (cleanUp = true);
  }, []);

  // if (photoData === null) return <Loading />;

  return (
    <div className="content">
      <HeaderContent headerName={tag} icon={true} />
      <div className="img-area">
        {displayPhotos()}

        <PhotoView
          image={image}
          prevIcon={() => prevIc(index)}
          nextIcon={() => nextIc(index)}
        />
        <AddPhoto />
        <AddPhotoModal galleryName={tag} />
      </div>
    </div>
  );
}
