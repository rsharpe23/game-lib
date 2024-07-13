export const getFile = dir => {
  const name = dir.split('/').pop();
  return `${name}.gltf`;
};

export const getUrl = (dir, file = getFile(dir)) => `${dir}/${file}`;