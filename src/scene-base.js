import Updatable from './updatable.js';
import { add, find } from '../mixins/list-mixin.js';

export default class SceneBase extends Updatable {
  items = [];

  constructor(camera, light) {
    super();
    this.camera = camera;
    this.light = light;
  }

  update(appProps) {
    super.update(appProps);

    this.camera.update(appProps);
    this.light.update(appProps);

    for (const item of this.items) {
      item.update(appProps);
    }
  }
}

Object.assign(SceneBase.prototype, { add, find });