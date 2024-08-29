const typeSizeMap = {
  'SCALAR': 1, 
  'VEC2': 2, 
  'VEC3': 3,
};

const getRoot = ({ nodes }) => ({ children: nodes });

const getPrimitives = ({ primitives }, accessorCb) => {
  return primitives.map(({ attributes, indices }) => ({
    vbo: accessorCb(attributes['POSITION']),
    nbo: accessorCb(attributes['NORMAL']),
    tbo: accessorCb(attributes['TEXCOORD_0']),
    ibo: accessorCb(indices),
  }));
};

export default class {
  constructor(gl) {
    this.gl = gl;
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
    return getPrimitives(meshes[mesh], 
      accessor => this._getAccessor(accessor, rest));
  }

  _getAccessor(accessor, { accessors, ...rest }) {
    const { bufferView, type, ...result } = accessors[accessor];
    result.typeSize = typeSizeMap[type];
    result.buffer = this._getBuffer(bufferView, rest);
    return result;
  }

  _getBuffer(bufferView, { bufferViews, buffers }) {
    const { buffer, byteLength, 
      byteOffset, target } = bufferViews[bufferView];

    const data = new Uint8Array(buffers[buffer], 
      byteOffset, byteLength);

    return gluCreateBuffer(this.gl, data, target);
  }
}