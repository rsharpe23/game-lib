export const getFile = dir => {
  const name = dir.split('/').pop();
  return `${name}.gltf`;
};

export const getURL = (dir, file = getFile(dir)) => `${dir}/${file}`;