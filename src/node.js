const traverse = ({ children }, callback) => {
  for (const child of children) {
    callback(child);
    traverse(child, callback);
  }
};

export default class {
  tag = 'default';
  parent = null;
  children = [];

  constructor(name) {
    this.name = name;
  }

  setParent(value) {
    if (value === this.parent) return;
    this.parent?.removeChild(this);
    value?.addChild(this);
  }
  
  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  removeChild(child) {
    if (!this.children.remove(child)) {
      throw new Error("Can't remove the child");
    }

    child.parent = null;
  }

  findChild(name) {
    const nodes = this.findChildren(node => node.name === name);
    // Метод массива find() также возвращает 
    // undefined, если элемент не найден
    return nodes[0];
  }

  findChildrenBy(tag) {
    return this.findChildren(node => node.tag === tag);
  }

  findChildren(predicate) {
    const children = [];
    traverse(this, child => {
      if (predicate(child)) children.push(child);
    });
    
    return children;
  }
}