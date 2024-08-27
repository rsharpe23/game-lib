import Mesh from '../drawings/mesh.js';
import TRS from './trs.js';

const parents = {
  add(parent, indices) {
    for (const index of indices)
      this[index] = parent;
  },
};

// TODO: Проверить, одинаковы ли свойства у мешей, 
// созданных через эту ф-цию, для одного и того же gltf
export default (gltfParser, rootMesh) => {
  gltfParser.parse(({ name, primitives, children, ...rest }, index) => {
    const mesh = new Mesh(name, new TRS(...rest), primitives);
    mesh.setParent(parents[index] ?? rootMesh);
    if (children) 
      parents.add(mesh, children);
  });
};