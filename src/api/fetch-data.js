import { urlGallery, urlImages } from '../utils/url-util';

import {
  ERROR_BACKGROUND_MESSAGE,
  ERROR_GALLERY_MESSAGE,
  ERROR_GALLERY_PATH_MESSAGE,
  ERROR_IMAGES_MESSAGE,
} from '../constants/util-const';

export const fetchGalleries = async (cleanUp) => {
  try {
    const response = await fetch(urlGallery(''));
    if (response.ok) {
      const { galleries } = await response.json();
      if (!cleanUp) {
        return galleries;
      }
    } else throw new Error(ERROR_GALLERY_MESSAGE);
  } catch (e) {
    console.info(e);
  }
};

export const fetchBackground = async () => {
  try {
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
  } catch (e) {
    console.info(e);
  }
};

export const fetchAllImages = async (cleanUp, categoryName) => {
  try {
    const response1 = await fetch(urlGallery(categoryName));
    if (response1.ok) {
      const { images } = await response1.json();
      if (images.length === 0 && !cleanUp) {
        return [];
      } else {
        fetchImage(images);
        if (!cleanUp) {
          return images;
        }
      }
    } else {
      throw new Error(ERROR_GALLERY_PATH_MESSAGE);
    }
  } catch (e) {
    console.info(e);
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
