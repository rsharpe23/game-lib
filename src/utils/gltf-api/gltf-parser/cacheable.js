import GltfParser from './default.js';

export default class extends GltfParser {
  constructor(gl, store) {
    super(gl);
    this._store = store;
  }

  parse(gltf, callback) {
    const store = this._store.get(gltf);

    // Будет неправильно расширить объект каким-нибудь isEmpty 
    // или hasKeys, т.к. они будут доступны всем наследникам 
    // Например массиву не нужны такие методы
    if (!Object.keys(store).length)
      super.parse(gltf, (node, index) => store[index] = node);

    for (const [index, node] of Object.entries(store))
      callback(node, index);
  }
}