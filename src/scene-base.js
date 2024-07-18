import Updatable from './updatable.js';

// Не тестировалось
const addVisual = (visuals, visual) => {
  if (!visual.prog) {
    visuals.unshift(visual);
    return;
  }
  
  const index = visuals.findLastIndex(v => v.prog === visual.prog);
  if (~index) {
    visuals.splice(index, 0, visual);
    return;
  }
  
  visuals.push(visual);
};

export default class extends Updatable {
  visuals = [];

  constructor(camera, light) {
    super();
    this.camera = camera;
    this.light = light;
  }

  addVisual(visual) {
    addVisual(this.visuals, visual);
  }

  findVisual(name) {
    return this.visuals.find(visual => visual.name === name);
  }

  findVisuals(tag) {
    return this.visuals.filter(visual => visual.tag === tag);
  }

  update(appProps) {
    super.update(appProps);

    this.camera.update(appProps);
    this.light.update(appProps);

    for (const visual of this.visuals) {
      visual.update(appProps);
    }
  }
}