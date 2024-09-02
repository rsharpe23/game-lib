import { createBuffer } from '../../../../lib/gl-utils.js';
import parse from './parse.js';

export default class {
  constructor(gl, store) {
    this._gl = gl;
    this._store = store;
  }

  parse(gltf, callback) {
    // Вместо литерального объекта используется Map, т.к. объект 
    // не сохраняет правильный порядок при добавлении эл-тов.
    const store = this._store.get(gltf);

    if (!store.size())
      this._parse(gltf, (node, index) => store.set(index, node));

    for (const [index, node] of store.entries())
      callback(node, index);
  }

  _parse(gltf, callback) {
    const glBufferCb = this._glBufferCb 
      ??= createBuffer.bind(null, this._gl);

    parse({ ...gltf, glBufferCb }, callback);
  }
}