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

// ------------------

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

const parseAccessor = (gl, accessor, 
  { accessors, bufferViews, buffers }) => {

  const { bufferView, type, ...result } = accessors[accessor];

  result.typeSize = typeSizeMap[type];
  result.buffer = createBuffer(gl, buffers, bufferViews[bufferView]);

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

const parseNode = (gl, node, { nodes, meshes, ...rest }) => {
  const { mesh, ...result } = nodes[node];

  result.primitives = getPrimitivesOf(
    meshes[mesh], accessor => parseAccessor(gl, accessor, rest));

  return result;
};

const getNode = (gl, store, index, data) => 
  store[index] ??= parseNode(gl, index, data);

const _parse = (gl, store, { scene, scenes, ...rest }, callback) => {
  const { nodes: children } = scenes[scene];
  traverse({ children }, (child, next) => {
    const _child = getNode(gl, store, child, rest);
    callback(_child, child);
    next(_child);
  });
};

const parse = (gl, store, gltf, callback) => {
  if (!store.has(gltf)) store.set(gltf, {});
  _parse(gl, store.get(gltf), gltf, callback);
};

// ------------------

const store = new WeakMap();

const gltf = await loadGltf('assets/tank.gltf');
// const meshGroup = new Node('MeshGroup');

// const parents = {
//   add(parent, indices) {
//     for (const index of indices)
//       this[index] = parent;
//   },
// };

// TODO: Подумать, как сократить вложенность gl
// Можно, например, расширить объект gltf, чтобы он хранил 
// ссылку на gl, либо вместо gltf парсит какую-нибудь обёртку