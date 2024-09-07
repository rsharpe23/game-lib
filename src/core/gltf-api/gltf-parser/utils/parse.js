import { traverse } from '../../../../../lib/node-utils.js';
import typeSizes from './type-sizes.js';

const getBuffer = (bufferView, { bufferViews, buffers, bufferCb }) => {
  const { buffer, byteLength, 
    byteOffset, target } = bufferViews[bufferView];

  const data = new Uint8Array(buffers[buffer], 
    byteOffset, byteLength);

  return bufferCb(data, target);
};

const getAccessor = (accessor, { accessors, ...rest }) => {
  const { bufferView, type, ...result } = accessors[accessor];

  result.typeSize = typeSizes[type];
  result.buffer = getBuffer(bufferView, rest);

  return result;
};

const getPrimitives = ({ primitives }, accessorCb) => {
  return primitives.map(({ attributes, indices }) => ({
    vbo: accessorCb(attributes['POSITION']),
    nbo: accessorCb(attributes['NORMAL']),
    tbo: accessorCb(attributes['TEXCOORD_0']),
    ibo: accessorCb(indices),
  }));
};

const getNode = (node, { nodes, meshes, ...rest }) => {
  const { mesh, ...result } = nodes[node];

  result.primitives = getPrimitives(meshes[mesh], 
    accessor => getAccessor(accessor, rest));

  return result;
};

export default ({ scene, scenes, ...rest }, callback) => {
  const { nodes: children } = scenes[scene];
  traverse({ children }, (child, next) => {
    const _child = getNode(child, rest);
    callback(_child, child);
    next(_child);
  });
};