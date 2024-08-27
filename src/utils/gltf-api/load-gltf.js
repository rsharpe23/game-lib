import { loadJson, loadBuffer } from '../../../lib/load-api.js';

// TODO: Сделать через for await of

export default async path => {
  const gltf = await loadJson(path);
  const { uri } = gltf.buffers[0];
  gltf.buffers[0] = await loadBuffer(uri);
  return gltf;
};