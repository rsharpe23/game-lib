import NodeBase from './node-base.js';

export default class extends NodeBase {
  update(appProps) {
    super.update(appProps);
    for (const child of this.children) {
      child.update(appProps);
    }
  }
}