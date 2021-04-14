const apiUrl = 'http://api.programator.sk/';

export function urlGallery(category_name) {
  return `${apiUrl}gallery${category_name}`;
}

export function urlImages(wh, fullpath) {
  return `${apiUrl}images/${wh}/${fullpath}`;
}
