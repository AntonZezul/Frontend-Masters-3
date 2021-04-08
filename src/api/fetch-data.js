import { urlGallery, urlImages } from '../utils/url-util';

import {
  ERROR_BACKGROUND_MESSAGE,
  ERROR_GALLERY_MESSAGE,
  ERROR_GALLERY_PATH_MESSAGE,
  ERROR_IMAGES_COUNT,
  ERROR_IMAGES_MESSAGE,
} from '../constants/util-const';

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

const fetchImageCountByName = async (categoryName) => {
  try {
    const response = await fetch(urlGallery('/' + categoryName));
    const { images } = await response.json();
    return images?.length || 0;
  } catch (e) {
    throw new Error(ERROR_IMAGES_COUNT);
  }
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
    return urlImages('1200x720', backgroundArray[0]);
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

const fetchImage = (images) => {
  images.forEach(async (element, i) => {
    try {
      const response2 = await fetch(urlImages('1200x720', element.fullpath));
      if (!response2.ok) {
        images.splice(i, 1);
        throw new Error(ERROR_IMAGES_MESSAGE);
      }
    } catch (e) {
      console.info(e);
    }
  });
};
