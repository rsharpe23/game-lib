const loadResource = async (url, type) => {
  const res = await fetch(url);
  return res[type]();
};

export const loadText = async url => loadResource(url, 'text');
export const loadJson = async url => loadResource(url, 'json');
export const loadBlob = async url => loadResource(url, 'blob');
export const loadBuffer = async url => loadResource(url, 'arrayBuffer');

export const loadImage = async url => {
  const blob = await loadBlob(url);
  return Image.from(URL.createObjectURL(blob));
};