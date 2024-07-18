const loadResource = async (path, type) => {
  const res = await fetch(path);
  return res[type]();
};

export const loadText = async path => loadResource(path, 'text');
export const loadJson = async path => loadResource(path, 'json');
export const loadBlob = async path => loadResource(path, 'blob');
export const loadBuffer = async path => loadResource(path, 'arrayBuffer');

export const loadImage = async path => {
  const blob = await loadBlob(path);
  return Image.from(URL.createObjectURL(blob));
};