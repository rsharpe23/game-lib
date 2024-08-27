import Mesh from '../drawings/mesh.js';
import TRS from './trs.js';

const parents = {
  add(parent, indices) {
    for (const index of indices)
      this[index] = parent;
  },
};

export default (gltfParser, rootMesh) => {
  // Здесь нельзя делать деструктуризацию нода, т.к. его свойства 
  // будут каждый раз пересоздаваться по новой, что сведёт 
  // на нет все оптимизации со store
  gltfParser.parse((node, index) => {
    const mesh = new Mesh(node.name, new TRS(node), node.primitives);
    mesh.setParent(parents[index] ?? rootMesh);
    if (node.children) 
      parents.add(mesh, node.children);
  });
};