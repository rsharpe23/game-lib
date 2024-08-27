import { traverse } from '../../../lib/node-utils.js';
import { createBuffer as gluCreateBuffer 
} from '../../../lib/gl-utils.js';

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

  const data = new Uint8Array(buffers[buffer], 
    byteOffset, byteLength);
    
  return gluCreateBuffer(gl, data, target);
};

export default class {
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
    const { mesh, ...rest } = nodes[node];

    rest.primitives = getPrimitives(meshes[mesh], 
      accessor => this._parseAccessor(accessor, this.gltf));

    return rest;
  }

  _parseAccessor(accessor, { accessors, bufferViews, buffers }) {
    const { bufferView, type, ...rest } = accessors[accessor];

    rest.typeSize = typeSizeMap[type];
    rest.buffer = createBuffer(this.gl, buffers, 
      bufferViews[bufferView]);

    return rest;
  }
}