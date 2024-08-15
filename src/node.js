const traverse = ({ children }, callback) => {
  for (const child of children) {
    callback(child);
    traverse(child, callback);
  }
};

// TODO: Написать тесты
export default class {
  parent = null;
  children = [];

  constructor(name, tag) {
    this.name = name;
    this.tag = tag;
  }

  setParent(value) {
    // Если выбрасывать исключение, тогда его придется всегда обрабатывать 
    // во внешнем коде, даже когда очевидно, что оно не произойдет.
    // Лучше просто вызывать return, а когда надо проверять изменения, 
    // то обращаться к children/parent напрямую.
    if (value === this || value === this.parent) return;
    this.parent?.onRemoveChild(this);
    value?.onAppendChild(this);
    this.parent = value;
  }

  onAppendChild(child) {
    this.children.push(child);
  }

  onRemoveChild(child) {
    this.children.remove(child);
  }

  appendChild(child) {
    child.setParent(this);
  }

  removeChild(child) {
    if (!this.children.includes(child)) return;
    child.setParent(null);
  }

  findChild(name) {
    const nodes = this.findChildren(node => node.name === name);
    // Метод массива find() тоже возвращает undefined, 
    // если элемент не найден
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