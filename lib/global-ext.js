Array.prototype.remove = function (item) {
  const index = this.indexOf(item);
  if (~index) {
    this.splice(index, 1);
    return true;
  }

  return false;
};

Image.from = src => {
  const img = new Image();
  img.src = src;
  return img;
};

window.Callable = class extends Function {
  constructor() {
    super('...args', 'return this._bound._call(...args)');
    this._bound = this.bind(this);
    return this._bound;
  }
}

window.benchmark = callback => {
  const start = performance.now();
  callback()
  const end = performance.now();
  return end - start; 
  // const diffSec = (end - start) / 1000;
  // console.log('op/sec: ' + (1 / diffSec));
};