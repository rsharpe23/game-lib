// Утилита для загрузки раздельных gltf + bin

export const getFile = dir => {
  const name = dir.split('/').pop();
  return `${name}.gltf`;
};

export const getPath = (dir, file = getFile(dir)) => `${dir}/${file}`;