import { createBuffer } from '../../../../lib/gl-utils.js'
import { typeSizeMap, getRoot, mapPrimitives } from './utils.js';

export default class {
  constructor(gl) {
    this._gl = gl;
  }

  parse({ scene, scenes, ...rest }, callback) {
    traverse(getRoot(scenes[scene]), (node, next) => {
      const _node = this._getNode(node, rest);
      callback(_node, node);
      next(_node);
    });
  }

  _getNode(node, { nodes, ...rest }) {
    const { mesh, ...result } = nodes[node];
    result.primitives = this._getPrimitives(mesh, rest);
    return result;
  }

  _getPrimitives(mesh, { meshes, ...rest }) {
    return mapPrimitives(meshes[mesh], 
      accessor => this._getAccessor(accessor, rest));
  }

  _getAccessor(accessor, { accessors, ...rest }) {
    const { bufferView, type, ...result } = accessors[accessor];
    result.typeSize = typeSizeMap[type];
    result.buffer = this._getBuffer(bufferView, rest);
    return result;
  }

  _getBuffer(bufferView, { bufferViews, buffers }) {
    const { buffer, byteLength, byteOffset, target } = bufferViews[bufferView];
    const data = new Uint8Array(buffers[buffer], byteOffset, byteLength);
    return createBuffer(this._gl, data, target);
  }
}