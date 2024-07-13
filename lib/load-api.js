const load = async (url, resType) => {
  const res = await fetch(url);
  return res[resType]();
};

export const loadText = async url => load(url, 'text');
export const loadJson = async url => load(url, 'json');
export const loadBlob = async url => load(url, 'blob');
export const loadBuffer = async url => load(url, 'arrayBuffer');