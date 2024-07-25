// Утилита для загрузки раздельного gltf + bin

// const loadGltf = async dir => {
//   const gltf = await loadJson(getPath(dir));
//   const { uri } = gltf.buffers[0];
//   gltf.buffers[0] = await loadBuffer(getPath(dir, uri));
//   return gltf;
// };

export const getFile = dir => {
  const name = dir.split('/').pop();
  return `${name}.gltf`;
};

export const getPath = (dir, file = getFile(dir)) => `${dir}/${file}`;