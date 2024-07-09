import Renderer from './renderer.js';

export default class extends Renderer {
  actors = [];

  addActor(actor) {
    this.actors.push(actor);
  }

  removeActor(actor) {
    this.actors.remove(actor);
  }

  findActor(name) {
    return this.actors.find(actor => actor.name === name);
  }

  render(appProps, deltaTime) {
    super.render(appProps, deltaTime);
    
    for (const actor of this.actors) {
      actor.render(appProps, deltaTime);
    }
  }
}