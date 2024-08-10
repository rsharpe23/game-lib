import Updatable from '../updatable.js';

const addVisual = (out, visual) => {
  // Можно проверять не по наличию программы, а по наличию 
  // renderProps, т.к. по сути любые его св-ва говорят 
  // о нестандартном рендеринге объекта

  if (!visual.prog) {
    out.unshift(visual);
    return;
  }
  
  const index = out.findLastIndex(v => v.prog === visual.prog);
  if (~index) {
    out.splice(index, 0, visual);
    return;
  }
  
  out.push(visual);
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