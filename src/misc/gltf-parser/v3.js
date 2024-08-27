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

const getRoot = ({ scene, scenes }) => {
  const { nodes: children } = scenes[scene];
  return { children };
};

const getPrimitives = ({ primitives }, callback) => {
  return primitives.map(({ attributes, indices }) => ({
    vbo: callback(attributes['POSITION']),
    nbo: callback(attributes['NORMAL']),
    tbo: callback(attributes['TEXCOORD_0']),
    ibo: callback(indices),
  }));
};

const createBuffer = (gl, buffers, 
  { buffer, byteLength, byteOffset, target }) => {

  const data = new Uint8Array(buffers[buffer], byteOffset, byteLength);
  return glCreateBuffer(gl, data, target);
};

class GltfParser {
  constructor(gl, gltf, store) {
    this.gl = gl;
    this.gltf = gltf;
    this.store = store;
  }

  parse(callback) {
    const { gltf, store } = this;
    if (!store.has(gltf)) store.set(gltf, {});
    this._parse(getRoot(gltf), store.get(gltf), callback);
  }

  _parse(root, store, callback) {
    traverse(root, (child, next) => {
      const _child = this._getNode(child, store);
      callback(_child, child);
      next(_child);
    });
  }

  _getNode(index, store) {
    return store[index] ??= this._parseNode(index, this.gltf);
  }

  _parseNode(node, { nodes, meshes }) {
    const { mesh, ...result } = nodes[node];

    result.primitives = getPrimitives(meshes[mesh], 
      accessor => this._parseAccessor(accessor, this.gltf));

    return result;
  }

  _parseAccessor(accessor, { accessors, bufferViews, buffers }) {
    const { bufferView, type, ...result } = accessors[accessor];

    result.typeSize = typeSizeMap[type];
    result.buffer = createBuffer(this.gl, buffers, 
      bufferViews[bufferView]);

    return result;
  }
}

// ------------------

const store = new WeakMap();
const gltf = await loadGltf('assets/tank.gltf');
const gltfParser = new GltfParser(null, gltf, store);
