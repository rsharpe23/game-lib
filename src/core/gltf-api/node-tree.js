export default class {
  constructor(nodes) {
    this.nodes = nodes;
  }

  *traverse(roots, fn, parent) {
    for (const root of roots) {
      const { children, ...rest } = this.nodes[root];
      yield fn(rest, parent);

      if (children) {
        yield* this.traverse(children, fn, rest);
      }
    }
  }
}