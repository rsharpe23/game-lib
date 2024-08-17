import Node from './node.js';

export default class extends Node {
  // Сцена имеет ссылки на главную камеру и свет. Эти ноды должны быть 
  // в единичном экземпляре (поскольку это часть общего рендеринга) 
  // и устанавливаться через конструктор, чтобы пользователь 
  // не манипулировал этим явно. Если во внешнем коде попытаться их 
  // удалить, то сломаются все зависмые ноды.

  constructor(name, camera, light) {
    super(name, 'scene');
    this._appendCamera(camera);
    this._appendLight(light);
  }

  get camera() { return this._camera; }
  get light() { return this._light; }

  _appendCamera(value) {
    this.appendChild(this._camera = value);
  }

  _appendLight(value) {
    this.appendChild(this._light = value);
  }

  // Сортировку children можно делегировать самим drawing'ам, 
  // чтобы каждый нод сам решал как ему добавляться
}