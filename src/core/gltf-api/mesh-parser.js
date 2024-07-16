import { createBuffer } from '../gl-utils.js';

const typeSizeMap = {
  'SCALAR': 1,
  'VEC2': 2,
  'VEC3': 3,
};

export default class {
  constructor({ meshes, accessors, bufferViews, buffers }) {
    this.meshes = meshes;
    this.accessors = accessors;
    this.bufferViews = bufferViews;
    this.buffers = buffers;
  }

  parseMesh(mesh) {
    return this._parseMesh(this.meshes[mesh]);
  }

  _parseMesh({ primitives }) {
    return primitives.map(({ attributes, indices }) => ({
      vbo: this._createBuffer(attributes['POSITION']),
      nbo: this._createBuffer(attributes['NORMAL']),
      tbo: this._createBuffer(attributes['TEXCOORD_0']),
      ibo: this._createBuffer(indices),
    }));
  }

  _createBuffer(accessor) {
    const { bufferView, type, ...rest } = this.accessors[accessor];

    rest.typeSize = typeSizeMap[type];
    rest.buffer = (gl, store) => {
      return store[accessor] ??= this._createRawBuffer(
        gl, this.bufferViews[bufferView]);
    };

    return rest;
  }

  _createRawBuffer(gl, { buffer, byteLength, byteOffset, target }) {
    const data = new Uint8Array(this.buffers[buffer], 
      byteOffset, byteLength);

    return createBuffer(gl, data, target);
  }
}