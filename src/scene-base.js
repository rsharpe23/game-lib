import Updatable from './updatable.js';

const addDrawing = (out, drawing) => {
  if (!drawing.prog) {
    out.unshift(drawing);
    return;
  }
  
  const index = out.findLastIndex(d => d.prog === drawing.prog);
  if (~index) {
    out.splice(index, 0, drawing);
    return;
  }
  
  out.push(drawing);
};

export default class extends Updatable {
  drawings = [];

  constructor(camera, light) {
    super();
    this.camera = camera;
    this.light = light;
  }

  addDrawing(drawing) { 
    addDrawing(this.drawings, drawing); 
  }

  removeDrawing(drawing) {
    this.drawings.remove(drawing);
  }

  findDrawing(name) {
    return this.drawings.find(d => d.name === name);
  }

  findDrawings(tag) {
    return this.drawings.filter(d => d.tag === tag);
  }

  update(appProps) {
    super.update(appProps);

    this.camera.update(appProps);
    this.light.update(appProps);

    for (const drawing of this.drawings) {
      drawing.update(appProps);
    }
  }
}