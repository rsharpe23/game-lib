import { loadJson, loadBuffer } from '../../../lib/loader.js';

// export default async path => {
//   const gltf = await loadJson(path);
//   const { uri } = gltf.buffers[0];
//   gltf.buffers[0] = await loadBuffer(uri);
//   return gltf;
// };

// TODO: Написать тесты

const mapBuffers = buffers => 
  buffers.map(({ uri }) => loadBuffer(uri));

export default async path => {
  const gltf = await loadJson(path);
  gltf.buffers = await Promise.all(mapBuffers(gltf.buffers));
  return gltf;
};