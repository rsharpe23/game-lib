import { traverse } from '../../../../../lib/node-utils.js';

export default ({ nodes }, callback) => {
  traverse({ children: nodes }, callback);
}