export function url_gallery(category_name) {
  return `http://api.programator.sk/gallery${category_name}`;
}

export function url_images(wh, fullpath) {
  return `http://api.programator.sk/images/${wh}/${fullpath}`;
}
