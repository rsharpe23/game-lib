import Updatable from './updatable.js';

// Эта ф-ция не подходит для поиска одного нода, т.к. проходит 
// по всей иерархии, даже если нод найден где-то в начале
// const traverse = ({ children }, callback) => {
//   for (const child of children) {
//     callback(child);
//     traverse(child, callback);
//   }
// };

const traverse = ({ children }, callback) => {
  if (!children || children.length === 0) return;
  
  const next = it => {
    const { done, value } = it.next();
    if (done) return;
    callback(value, () => {
      traverse(value, callback);
      next(it);
    });
  }; 
  
  next(children[Symbol.iterator]());
};

// TODO: Написать тесты
export default class extends Updatable {
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

  // ------------------

  // findNode(name) {
  //   const nodes = this.findNodes(node => node.name === name);
  //   return nodes[0];
  // }

  // findNodesBy(tag) {
  //   return this.findNodes(node => node.tag === tag);
  // }

  // findNodes(predicate) {
  //   const children = [];
  //   traverse(this, child => {
  //     if (predicate(child)) children.push(child);
  //   });
    
  //   return children;
  // }

  // ------------------

  // Метод массива find() тоже возвращает undefined, 
  // если элемент не найден
  findNode(name) {
    let node;
    traverse(this, (child, next) => {
      if (child.name === name) node = child;
      else next();
    });

    return node;
  }

  findNodesBy(tag) {
    return this.findNodes(node => node.tag === tag);
  }

  // Название findChildren не подойдет, т.к. оно даёт неоднознач. понимаение 
  // того, что ищется: только дочерние ноды либо ноды во всей иерархии
  findNodes(predicate) {
    const nodes = [];
    traverse(this, (child, next) => {
      if (predicate(child)) nodes.push(child);
      next();
    });

    return nodes;
  }
}