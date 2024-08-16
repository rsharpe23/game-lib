import Node from './node.js';

export default class extends Node {
  constructor(name, camera, light) {
    super(name, 'scene');
    this.appendChild(camera);
    this.appendChild(light);
  }

  // BUG: Перед установкой новых значений нужно 
  // удалять parent из предыдущих

  get camera() { return this.children[0]; }
  set camera(value) {
    this.children[0] = value;
  }

  get light() { return this.children[1]; }
  set light(value) {
    this.children[1] = value;
  }

  // Такой вариант не подойдет, т.к. свет и камера не будут 
  // среди потомков сцены. Кроме того, получится так, что ф-ционал 
  // камеры и света будет вызываться раньше, чем ф-ционал сцены 
  // (который по задумке должен вызываться перед всеми нодами)

  // update(appProps) {
  //   this.camera.update(appProps);
  //   this.light.update(appProps);
  //   super.update(appProps);
  // }

  // Сортировку children можно делегировать самим drawing'ам, 
  // чтобы каждый нод сам решал как ему добавляться
}