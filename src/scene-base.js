import Updatable from './updatable.js';

// Не тестировалось
const setProp = (node, prop, value) => {
  node.removeChild(node[prop]);
  node.appendChild(node[prop] = value);
};

export default class extends Updatable {
  constructor(name, camera, light) {
    super(name, 'scene');
    this.setCamera(camera);
    this.setLight(light);
  }

  setCamera(value) {
    setProp(this, 'camera', value);
  }

  setLight(value) {
    setProp(this, 'light', value);
  }

  // TODO: Переопределить addChild так, чтобы в children сначала 
  // попадали те drawing'и, у которых нет собственной программы
}