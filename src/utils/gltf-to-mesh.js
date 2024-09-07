import Mesh from '../nodes/drawings/mesh.js';
import TRS from './trs.js';

const parents = {
  set(node, children) {
    children.forEach(child => this[child] = node);
  },
};

// Можно вынести в MeshBase как обычный (не статический) 
// метод build(gltf, gltfParser)

export default (gltfParser, gltf, mesh) => {
  gltfParser.parse(gltf, ({ name, primitives, children, ...rest }, index) => {
    const node = new Mesh(name, new TRS(rest), primitives);
    node.setParent(parents[index] ?? mesh);
    if (children) 
      parents.set(node, children);
  });

  return mesh;
};