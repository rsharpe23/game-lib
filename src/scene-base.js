import Updatable from './updatable.js';

export default class extends Updatable {
  constructor(name, camera, light) {
    super(name, 'scene');
    this.setCamera(camera);
    this.setLight(light);
  }

  setCamera(value) {
    this.camera = value;
  }

  // get camera() {
  //   // const node = this.findChildrenBy('camera')[0];

  //   // if (!this._camera || this._camera.parent !== this) {

  //   // }


  // }

  // get light() {
  //   return this.findChildrenBy('light')[0];
  // }

  // TODO: Переопределить addChild так, чтобы в children сначала 
  // попадали те drawing'и, у которых нет собственной программы
}