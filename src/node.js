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

  // TODO: Если параметр name будет задан с null, то  
  // его значение должно сгенерироваться автоматически 
  // (this.constructor.name + кол-во нодов этого типа в сцене). 
  // Этот ф-ционал можно реализовать через core-утилиту, 
  // поскольку это не обязанность Node

  constructor(name, tag) {
    super();
    this.name = name;
    this.tag = tag;
  }

  appendChild(child) {
    child.setParent(this);
  }

  removeChild(child) {
    if (!this.children.includes(child)) return;
    child.setParent(null);
  }

  setParent(value) {
    // Если выбрасывать исключение, тогда его придется всегда обрабатывать 
    // во внешнем коде, даже когда очевидно, что оно не произойдет.
    // Лучше просто вызывать return, а если надо проверить изменения, 
    // то обращаться к children/parent напрямую.
    if (value === this || value === this.parent) return;
    this.parent?.onRemoveChild(this);
    value?.onAppendChild(this);
    this.parent = value;
  }

  onRemoveChild(child) {
    this.children.remove(child);
  }

  onAppendChild(child) {
    this.children.push(child);
  }

  // Не тестировалось

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
  findNodes(callback) {
    const nodes = [];
    traverse(this, (child, next) => {
      if (callback(child)) nodes.push(child);
      next();
    });

    return nodes;
  }

  // Этот метод можно не выносить в производный класс, поскольку он 
  // по сути является обязанностью для любого класса в иерархии 
  // (каждый нод - это updatable-объект). Кроме того, сцена 
  // переопределяет update() именно в базовом классе.
  update(appProps) {
    super.update(appProps);
    for (const child of this.children) {
      child.update(appProps);
    }
  }
}