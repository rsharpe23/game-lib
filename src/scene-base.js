export default class {
  constructor(name, camera, light) {
    super(name, 'scene');
    this.camera = camera;
    this.light = light;
  }

  update(appProps) {
    this.camera.update(appProps);
    this.light.update(appProps);
    super.update(appProps);
  }

  // TODO: Переопределить addChild так, чтобы в children сначала 
  // попадали те ноды (drawing'и), у которых нет собственной программы
}