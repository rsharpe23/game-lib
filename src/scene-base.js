import Renderer from './renderer.js';

export default class extends Renderer {
  actors = [];

  constructor(camera, light) {
    super();
    this.camera = camera;
    this.light = light;
  }

  addActor(actor) {
    this.actors.push(actor);
  }

  findActor(name) {
    return this.actors.find(actor => actor.name === name);
  }

  render(appProps) {
    super.render(appProps);
    for (const actor of this.actors) {
      actor.render(appProps);
    }
  }
}