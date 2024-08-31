import GltfParser from './default.js';

export default class GltfParser {
  constructor(gl, store) {
    super(gl);
    this._store = store;
  }

  parse(gltf, callback) {
    // Вместо литерального объекта используется Map, т.к. объект 
    // не сохраняет правильный порядок при добавлении эл-тов.
    const store = this._store.get(gltf);

    if (!store.size())
      super.parse(gltf, (node, index) => store.set(index, node));

    for (const [index, node] of store.entries())
      callback(node, index);
  }
}