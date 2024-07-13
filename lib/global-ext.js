Array.prototype.remove = function (item) {
  const index = this.indexOf(item);
  if (~index) this.splice(index, 1);
};

Image.from = src => {
  const img = new Image();
  img.src = src;
  return img;
};