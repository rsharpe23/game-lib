import traverse from './traverse.js';

const getPrimitives = ({ primitives }, getBuffer) => {
  return primitives.map(({ attributes, indices }) => ({
    vbo: getBuffer(attributes['POSITION']),
    nbo: getBuffer(attributes['NORMAL']),
    tbo: getBuffer(attributes['TEXCOORD_0']),
    ibo: getBuffer(indices),
  }));
};

const parseBufferView = (bufferView, 
  { bufferViews, buffers, glBuffer }) => {

  const { buffer, byteLength, 
    byteOffset, target } = bufferViews[bufferView];

  const data = new Uint8Array(buffers[buffer], 
    byteOffset, byteLength);

  return glBuffer(data, target);
};

const parseAccessor = (accessor, { accessors, ...rest }) => {
  const { bufferView, type, ...result } = accessors[accessor];

  result.typeSize = typeSizeMap[type];
  result.glBuffer = parseBufferView(bufferView, rest);

  return result;
};

const parseNode = (node, { nodes, meshes, ...rest }) => {
  const { mesh, ...result } = nodes[node];

  result.primitives = getPrimitives(meshes[mesh], 
    accessor => parseAccessor(accessor, rest));

  return result;
};

export default ({ scene, scenes, ...rest }, callback) => {
  traverse(scenes[scene], (node, next) => {
    const _node = parseNode(node, rest);
    callback(_node, node);
    next(_node);
  });
};