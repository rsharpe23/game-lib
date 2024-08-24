// Эта реализация не подходит для поиска одного нода, т.к. проходит 
// по всей иерархии, даже если нод найден где-то в начале

// Как вариант, можно сделать чтобы callback возвращал true/false 
// и в зависимости от результата прерывать цикл

// const traverse = ({ children }, callback) => {
//   for (const child of children) {
//     callback(child);
//     traverse(child, callback);
//   }
// };

// ---------------------

// Эта реализация подходит только для нодов, чьи потомки также 
// являются нодами, но не подойдет если потомки нодов 
// представлены через индексы (как в gltf)

// export const traverse = ({ children }, callback) => {
//   if (!children || children.length === 0) return;
  
//   const next = it => {
//     const { done, value } = it.next();
//     if (done) return;
//     callback(value, () => {
//       traverse(value, callback);
//       next(it);
//     });
//   }; 
  
//   next(children[Symbol.iterator]());
// };

// ---------------------

// Бывает что не все ф-ции нужны во внешнем коде, 
// поэтому лучше их вынести как дополнение к дефолтному Node

export const traverse = ({ children }, callback) => {
  if (!children || children.length === 0) return;
  
  const next = it => {
    const { done, value } = it.next();
    if (done) return;
    callback(value, newValue => {
      traverse(newValue, callback);
      next(it);
    });
  }; 
  
  next(children[Symbol.iterator]());
};

// Метод массива find() тоже возвращает undefined, 
// если элемент не найден
export const findNode = (root, name) => {
  let node;
  traverse(root, (child, next) => {
    if (child.name === name) node = child;
    else next(child);
  });

  return node;
};

// Название findChildren не подойдет, т.к. оно даёт неоднознач. понимаение 
// того, что ищется: только дочерние ноды или ноды во всей иерархии
export const findNodes = (root, callback) => {
  const nodes = [];
  traverse(root, (child, next) => {
    if (callback(child)) nodes.push(child);
    next(child);
  });

  return nodes;
};