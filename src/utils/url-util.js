export function urlGallery(category_name) {
  return `http://api.programator.sk/gallery${category_name}`;
}

export function urlImages(wh, fullpath) {
  return `http://api.programator.sk/images/${wh}/${fullpath}`;
}
