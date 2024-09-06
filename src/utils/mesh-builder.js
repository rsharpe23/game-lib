import Mesh from '../nodes/drawings/mesh.js';
import TRS from './trs.js';

const parents = {
  set(keys, value) {
    keys.forEach(key => this[key] = value);
  },
};

export default class {
  constructor(gltfParser) {
    this.gltfParser = gltfParser;
  }

  build(gltf, rootMesh) {
    this.gltfParser.parse(gltf, 
      ({ name, primitives, children, ...rest }, index) => {

      const mesh = new Mesh(name, new TRS(rest), primitives);
      mesh.setParent(parents[index] ?? rootMesh);

      if (children) 
        parents.set(children, mesh);

      return rootMesh;
    });
  }
};