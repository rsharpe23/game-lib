import { traverse } from '../../../../lib/node-utils.js';

const getPrimitives = ({ primitives }, bufferCb) => {
  return primitives.map(({ attributes, indices }) => ({
    vbo: bufferCb(attributes['POSITION']),
    nbo: bufferCb(attributes['NORMAL']),
    tbo: bufferCb(attributes['TEXCOORD_0']),
    ibo: bufferCb(indices),
  }));
};

const parseBufferView = (bufferView, 
  { bufferViews, buffers, glBufferCb }) => {

  const { buffer, byteLength, 
    byteOffset, target } = bufferViews[bufferView];

  const data = new Uint8Array(buffers[buffer], 
    byteOffset, byteLength);

  return glBufferCb(data, target);
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
  const { nodes: children } = scenes[scene];
  traverse({ children }, (node, next) => {
    const _node = parseNode(node, rest);
    callback(_node, node);
    next(_node);
  });
};