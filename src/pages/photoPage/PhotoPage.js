import React, { useContext } from 'react';
import { AddPhoto } from '../../components/addButtons/addPhotoButton/AddPhoto';
import { useParams, useHistory } from 'react-router-dom';
import PhotoView from '../../modals/photoView/PhotoView';
import { useEffect, useState } from 'react';
import AddPhotoModal from '../../modals/addPhotoModal/AddPhotoModal';
import { urlImages } from '../../utils/url-util';
import Photo from '../../components/photo/Photo';
import { NO_PHOTO_IMAGE } from '../../constants/util-const';
import './PhotoPage.scss';
import { MainContext } from '../context/MainContext';
import { fetchAllImages } from '../../api/fetch-data';

export default function PhotoPage() {
  const { tag } = useParams();
  const [image, setImage] = useState('');
  const [index, setIndex] = useState();
  const background = [];
  const history = useHistory();
  const categoryName = history.location.pathname;
  const photoContext = useContext(MainContext);
  const photoData = photoContext.getPhotoData();

  const arrID = photoData !== null ? photoData.map((_, i) => i) : null;
  const arrPhoto =
    photoData !== null
      ? photoData.map((photo) => urlImages('800x600', photo.fullpath))
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
      photoData &&
      photoData.map((data, i) => {
        background.push(data.fullpath);
        return (
          <Photo
            key={i}
            highQualitySrc={urlImages('800x600', data.fullpath)}
            wrapperFunction={() => wrapperFunction(i)}
          />
        );
      })
    );
  };

  useEffect(() => {
    let cleanUp = false;

    fetchAllImages(categoryName)
      .then((data) => {
        if (data) {
          if (data.length) {
            if (!cleanUp) {
              photoContext.setPhotoData(data);
              photoContext.setBackground(
                urlImages('800x600', data[0].fullpath)
              );
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
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {
      cleanUp = true;
      photoContext.setPhotoData([]);
    };
    // eslint-disable-next-line
  }, []);

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
