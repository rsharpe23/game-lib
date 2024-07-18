class A {
  constructor(prop) {
    this.prop = prop;
  }
}

const arr = [];
fn(arr, new A());
fn(arr, new A());
fn(arr, new A('hello'));
fn(arr, new A('world'));
fn(arr, new A('hello'));
fn(arr, new A());
fn(arr, new A('world'));
fn(arr, new A('hello'));
console.log(arr);

function fn(arr, obj) {
  if (!obj.prop) {
    arr.unshift(obj);
    return;
  }
  
  const index = arr.findLastIndex(o => o.prop === obj.prop);
  if (~index) {
    arr.splice(index, 0, obj);
    return;
  }
  
  arr.push(obj);
}