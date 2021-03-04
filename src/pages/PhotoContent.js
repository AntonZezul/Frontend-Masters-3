import HeaderContent from "../components/HeaderContent";
import Photo from "../components/Photo";
import { AddPhoto } from "../components/AddPhoto";
import PhotoJSON from "../storage/PhotoJSON.json";
import { useParams, useLocation } from "react-router-dom";
import PhotoView from "../modals/PhotoView";
import { useEffect, useState } from "react";
import AddPhotoModal from "../modals/AddPhotoModal";

export default function PhotoContent(props) {
  const location = useLocation();
  const [image, setImage] = useState("");
  const [index, setIndex] = useState();
  const URL_IMAGE = "http://api.programator.sk/images/1125x750/";
  const background = []

  const arrID = props.dataPhotos.map((_, i) => i);
  const arrPhoto = props.dataPhotos.map(
    (photo) => `http://api.programator.sk/images/1125x750/${photo.fullpath}`
  );

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
    return props.dataPhotos.map((data, i) => {
      background.push(data.fullpath)
      return (
        <Photo
          key={i}
          photo={URL_IMAGE + data.fullpath}
          wrapperFunction={() => wrapperFunction(i)}
        />
      );
    });
  };

  return (
    <div className="content">
      <HeaderContent headerName={location.state.pass} icon={true} />
      <div className="img-area">
        {displayPhotos()}
        <PhotoView
          photo={image}
          nextIcon={() => nextIc(index)}
          prevIcon={() => prevIc(index)}
        />
        <AddPhoto />
        <AddPhotoModal galleryName={props.galleryName}/>
      </div>
    </div>
  );
}