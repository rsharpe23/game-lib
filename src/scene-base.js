import Updatable from './updatable.js';

export default class extends Updatable {
  visuals = [];

  constructor(camera, light) {
    super();
    this.camera = camera;
    this.light = light;
  }

  addVisual(visual) {
    // Не тестировалось
    this.visuals.push(visual);
    this.visuals.sort((a, b) => {
      if (!a.renderProps.prog) return -1;
      if (a === b) return 0;
      if (a !== b) return 1;
    });
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