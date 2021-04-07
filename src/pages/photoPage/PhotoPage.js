import React, { useContext } from 'react';
import { AddPhoto } from '../../components/addButtons/addPhotoButton/AddPhoto';
import { useParams, useHistory } from 'react-router-dom';
import PhotoView from '../../modals/photoView/PhotoView';
import { useEffect, useState } from 'react';
import AddPhotoModal from '../../modals/addPhotoModal/AddPhotoModal';
// import Loading from '../../components/Loading';
import { urlImages } from '../../utils/url-util';
import Photo from '../../components/photo/Photo';
import { LOW_QUALITY_SRC, NO_PHOTO_IMAGE } from '../../constants/util-const';
import './PhotoPage.scss';
import { MainContext } from '../context/MainContext';
import { fetchAllImages } from '../../api/fetch-data';
import useProgressiveImg from '../../custom-hooks/ProgressiveImg';

export default function PhotoPage() {
  const { tag } = useParams();
  const [image, setImage] = useState('');
  const [index, setIndex] = useState();
  // const [photoData, setPhotoData] = useState([]);
  const background = [];
  const history = useHistory();
  const categoryName = history.location.pathname;
  const photoContext = useContext(MainContext);
  const photoData = photoContext.getPhotoData();

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
              highQualitySrc={urlImages('1200x720', data.fullpath)}
              wrapperFunction={() => wrapperFunction(i)}
            />
          );
        })
    );
  };

  useEffect(() => {
    let cleanUp = false;

    fetchAllImages(categoryName).then((data) => {
      if (data) {
        if (data.length) {
          if (!cleanUp) {
            photoContext.setPhotoData(data);
            photoContext.setBackground(urlImages('1200x720', data[0].fullpath));
          }
        } else {
          if (!cleanUp) {
            photoContext.setPhotoData([]);
            photoContext.setBackground(NO_PHOTO_IMAGE);
          }
        }
      } else {
        history.push('/');
      }
    });
    return () => {
      cleanUp = true;
      photoContext.setPhotoData([]);
      console.log('Unmount photoPage');
    };
  }, []);

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
