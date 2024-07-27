Array.prototype.remove = function (item) {
  const index = this.indexOf(item);
  if (~index) this.splice(index, 1);
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

window.glsl = src => src;