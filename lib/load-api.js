const loadResource = async (path, type) => {
  const res = await fetch(path);
  return res[type]();
};

export const loadText = async path => loadResource(path, 'text');
export const loadJson = async path => loadResource(path, 'json');
export const loadBlob = async path => loadResource(path, 'blob');
export const loadBuffer = async path => loadResource(path, 'arrayBuffer');

// Создание картинки это асинхронный процесс, 
// даже если в src указывать уже подгруженный blob
export const loadImage = path => {
  return new Promise(resolve => {
    const img = Image.from(path);
    img.onload = () => resolve(img);
  });
};