import { urlGallery, urlImages } from '../utils/url-util';
import {
  ERROR_BACKGROUND_MESSAGE,
  ERROR_GALLERY_MESSAGE,
  ERROR_GALLERY_PATH_MESSAGE,
  ERROR_IMAGES_COUNT,
  ERROR_IMAGES_MESSAGE,
  ERROR_POST_400,
  ERROR_POST_409,
  ERROR_POST_500,
} from '../constants/util-const';

//Get requests
export const fetchGalleries = async () => {
  const response = await fetch(urlGallery(''));
  if (response.ok) {
    const { galleries } = await response.json();
    return galleries;
  } else throw new Error(ERROR_GALLERY_MESSAGE);
};

export const countImagesInGalleries = async (galleries) => {
  const tempMap = new Map();
  const promises = galleries.map(async ({ name }) => {
    const count = await fetchImageCountByName(name);
    return () => tempMap.set(name, count);
  });
  const setterArray = await Promise.all(promises);
  setterArray.forEach((func) => func());

  return tempMap;
};

export const fetchBackground = async () => {
  const backgroundArray = [];
  const response = await fetch(urlGallery(''));
  if (response.ok) {
    const { galleries } = await response.json();
    galleries.forEach((el) => {
      if (el.image === undefined) {
        return null;
      } else {
        return backgroundArray.push(el.image.fullpath);
      }
    });
    return urlImages('800x600', backgroundArray[0]);
  } else {
    throw new Error(ERROR_BACKGROUND_MESSAGE);
  }
};

export const fetchAllImages = async (categoryName) => {
  const response1 = await fetch(urlGallery(categoryName));
  if (response1.ok) {
    const { images } = await response1.json();

    if (images.length === 0) {
      return [];
    } else {
      fetchImage(images);
      return images;
    }
  } else {
    throw new Error(ERROR_GALLERY_PATH_MESSAGE);
  }
};

const fetchImageCountByName = async (categoryName) => {
  try {
    const response = await fetch(urlGallery('/' + categoryName));
    const { images } = await response.json();
    return images?.length || 0;
  } catch (e) {
    throw new Error(ERROR_IMAGES_COUNT);
  }
};

const fetchImage = (images) => {
  images.forEach(async (element, i) => {
    try {
      const response2 = await fetch(urlImages('800x600', element.fullpath));
      if (!response2.ok) {
        images.splice(i, 1);
        throw new Error(ERROR_IMAGES_MESSAGE);
      }
    } catch (e) {
      console.info(e);
    }
  });
};

//Post requests
export const fetchPostImages = async (galleryName, options) => {
  try {
    await fetch(urlGallery('/' + galleryName), options);
    return [];
  } catch (e) {
    console.log(e);
  }
};

export const fetchPostGallery = async (options) => {
  try {
    const response = await fetch(urlGallery(''), options);
    if (response.ok) {
      console.log('OK');
    } else {
      if (response.status === 400) {
        throw new Error(ERROR_POST_400);
      }
      if (response.status === 409) {
        throw new Error(ERROR_POST_409);
      }
      if (response.status === 500) {
        throw new Error(ERROR_POST_500);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
