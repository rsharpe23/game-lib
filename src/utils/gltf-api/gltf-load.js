import { loadJson, loadBuffer } from '../../../lib/loader.js';

// export default async path => {
//   const gltf = await loadJson(path);
//   const { uri } = gltf.buffers[0];
//   gltf.buffers[0] = await loadBuffer(uri);
//   return gltf;
// };

// TODO: Написать тесты

const loadBuffers = buffers =>
  Promise.all( buffers.map(({ uri }) => loadBuffer(uri)) );

export default async path => {
  const { buffers, ...rest } = await loadJson(path);
  rest.buffers = await loadBuffers(buffers);
  return rest;
};