import Mesh from '../drawings/mesh.js';
import TRS from './trs.js';

const parents = {
  set(keys, value) {
    keys.forEach(key => this[key] = value);
  },
};

export default (gltf, gltfParser, meshGroup) => {
  gltfParser.parse(gltf, 
    ({ name, primitives, children, ...rest }, index) => {

    const mesh = new Mesh(name, new TRS(rest), primitives);
    mesh.setParent(parents[index] ?? meshGroup);

    if (children) 
      parents.set(children, mesh);

    return meshGroup;
  });
};
