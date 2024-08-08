export default class {
  constructor(nodes) {
    this.nodes = nodes;
  }

  traverse(roots, callback, parentOfRoot) {
    for (const root of roots) {
      const { children, ...rest } = this.nodes[root];
      callback(rest, parentOfRoot);
      if (children) {
        this.traverse(children, callback, rest);
      }
    }
  }
}