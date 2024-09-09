import { loadJson, loadBuffer } from '../../../lib/loader.js';

// TODO: Написать тесты

const loadBuffers = buffers =>
  Promise.all( buffers.map(({ uri }) => loadBuffer(uri)) );

export default async path => {
  const { buffers, ...rest } = await loadJson(path);
  rest.buffers = await loadBuffers(buffers);
  return rest;
};