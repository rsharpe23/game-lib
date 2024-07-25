export default class {
  constructor(nodes) {
    this.nodes = nodes;
  }

  traverse(roots, cb, parentOfRoot) {
    for (const root of roots) {
      const { children, ...rest } = this.nodes[root];
      cb(rest, parentOfRoot);

      if (children) {
        this.traverse(children, cb, rest);
      }
    }
  }
}