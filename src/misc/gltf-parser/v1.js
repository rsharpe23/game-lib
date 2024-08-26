import { loadJson, loadBuffer } from '../../../lib/load-api.js';
import Node, { traverse } from '../../node/index.js';
import Mesh from '../../drawings/mesh.js'
import TRS from '../trs.js';

const loadGltf = async path => {
  const gltf = await loadJson(path);
  const { uri } = gltf.buffers[0];
  gltf.buffers[0] = await loadBuffer(uri);
  return gltf;
};

const typeSizeMap = {
  'SCALAR': 1,
  'VEC2': 2,
  'VEC3': 3,
};

const createBuffer = (gl, buffers, 
  { buffer, byteLength, byteOffset, target }) => {

  const data = new Uint8Array(buffers[buffer], byteOffset, byteLength);
  return glCreateBuffer(gl, data, target);
};

const parseAccessor = (accessor, 
  { accessors, bufferViews, buffers }) => {

  const { bufferView, type, ...result } = accessors[accessor];

  result.typeSize = typeSizeMap[type];
  result.glBuffer = (gl, store) => 
    store[accessor] ??= createBuffer(gl, buffers, 
      bufferViews[bufferView]);

  return result;
};

const getPrimitivesOf = ({ primitives }, callback) => {
  return primitives.map(({ attributes, indices }) => ({
    vbo: callback(attributes['POSITION']),
    nbo: callback(attributes['NORMAL']),
    tbo: callback(attributes['TEXCOORD_0']),
    ibo: callback(indices),
  }));
};

const parseNode = (node, { nodes, meshes, ...rest }) => {
  const { mesh, ...result } = nodes[node];

  result.primitives = getPrimitivesOf(meshes[mesh], 
    accessor => parseAccessor(accessor, rest));

  return result;
};

const parse = ({ scene, scenes, ...rest }, callback) => {
  const { nodes: children } = scenes[scene];
  // Нужная именно такая реализация traverse, иначе придется доп. 
  // создавать ф-ционал преобразования индекса в в нод
  traverse({ children }, (child, next) => {
    const _child = parseNode(child, rest);
    callback(_child, child);
    next(_child);
  });
};

const gltf = await loadGltf('assets/tank.gltf');
const meshGroup = new Node('MeshGroup');

const parents = {
  add(parent, indices) {
    for (const index of indices)
      this[index] = parent;
  },
};

parse(gltf, ({ name, primitives, children, ...rest }, index) => {
  const mesh = new Mesh(name, new TRS(rest), primitives);
  mesh.setParent(parents[index] ?? meshGroup);
  if (children) 
    parents.add(mesh, children);
});

console.log(meshGroup);