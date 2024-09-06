import { createBuffer } from '../../../../lib/gl-utils.js';
import parse from './utils/parse.js';

export default class {
  constructor(gl, store) {
    this._gl = gl;
    this._store = store;
  }

  parse(gltf, callback) {
    // Вместо литерального объекта используется Map, т.к. объект 
    // не сохраняет правильный порядок при добавлении эл-тов.
    const store = this._store.get(gltf);

    if (!store.size)
      this._parse(gltf, (mesh, index) => store.set(index, mesh));

    for (const [index, mesh] of store.entries())
      callback(mesh, index);
  }

  _parse(gltf, callback) {
    const bufferCb = this._bufferCb 
      ??= createBuffer.bind(null, this._gl);

    parse({ ...gltf, bufferCb }, callback);
  }
}