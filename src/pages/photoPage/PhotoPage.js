import React from 'react';
import { AddPhoto } from '../../components/addButtons/addPhotoButton/AddPhoto';
import { useParams, useHistory } from 'react-router-dom';
import PhotoView from '../../modals/photoView/PhotoView';
import { useEffect, useState } from 'react';
import AddPhotoModal from '../../modals/addPhotoModal/AddPhotoModal';
// import Loading from '../../components/Loading';
import { urlGallery, urlImages } from '../../utils/url-util';
import Photo from '../../components/photo/Photo';
import {
  ERROR_GALLERY_PATH_MESSAGE,
  ERROR_IMAGES_MESSAGE,
} from '../../constants/util-const';
import './PhotoPage.scss';

export default function PhotoPage() {
  const { tag } = useParams();
  const [image, setImage] = useState('');
  const [index, setIndex] = useState();
  const [photoData, setPhotoData] = useState([]);
  const background = [];
  const history = useHistory();

  const arrID = photoData !== null ? photoData.map((_, i) => i) : null;
  const arrPhoto =
    photoData !== null
      ? photoData.map((photo) => urlImages('1200x720', photo.fullpath))
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
    return (
      photoData
        // .sort((a, b) => Date.parse(a.modified) - Date.parse(b.modified))
        .map((data, i) => {
          background.push(data.fullpath);
          return (
            <Photo
              key={i}
              photo={urlImages('1200x720', data.fullpath)}
              wrapperFunction={() => wrapperFunction(i)}
            />
          );
        })
    );
  };
  const fetchImages = async (cleanUp) => {
    try {
      const response1 = await fetch(urlGallery(history.location.pathname));
      if (response1.ok) {
        const { images } = await response1.json();
        if (images.length === 0 && !cleanUp) {
          setPhotoData([]);
        } else {
          images.forEach(async (element, i) => {
            try {
              const response2 = await fetch(
                urlImages('1200x720', element.fullpath)
              );
              if (response2.ok) {
                if (images.length - i === 1 && !cleanUp) {
                  setPhotoData(images);
                }
              } else {
                data.splice(i, 1);
                throw new Error(ERROR_IMAGES_MESSAGE + img.status);
              }
            } catch (e) {
              console.info(e);
            }
          });
        }
      } else {
        history.push('/');
        throw new Error(ERROR_GALLERY_PATH_MESSAGE + response.status);
      }
    } catch (e) {
      console.info(e);
    }
  };

  useEffect(() => {
    let cleanUp = false;
    fetchImages(cleanUp);
    return () => (cleanUp = true);
  }, [history]);

  // if (photoData === null) return <Loading />;

  return (
    <div className='photos'>
      {displayPhotos()}
      <PhotoView
        image={image}
        prevIcon={() => prevIc(index)}
        nextIcon={() => nextIc(index)}
      />
      <AddPhoto />
      <AddPhotoModal galleryName={tag} />
    </div>
  );
}
