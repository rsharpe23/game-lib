// В одной папке camera не может быть несколько разных модулей камер, 
// например camera.js и orbit-camera.js. В этом случае нужно сделать папку cameras, 
// которая будет содержать подпапку camera (с её функционалом) и файл orbit-camera.js.
// Посему можно смело размещать основные модули/классы в файлах index.js.

// Если модуль/класс имеет несколько реализаций, например сначала использовалась 
// обычная камера, а затем её заменили на оптимизированную камеру, то можно опускать 
// полные названия модулей до локальных, например в папке camera, файлы camera.js 
// и optimized-camera.js можно назвать default.js и optimized.js соответсвенно. 
// А файл index.js будет делать реэкспорт актуальной реализации.

// ------------------------

// Если класс использует локальные зависимости, то это всё можно разместить 
// в одноименном каталоге, а сам класс объявить в файле index.js

// * -- mesh
// * ---- index.js
// * ---- item-list.js
// * ---- utils.js

// Иерархию классов можно размещать в каталоге с назван. во множ. числе

// * -- meshes
// * ---- mesh (подкаталог)
// * ---- solid-mesh.js

// Если у класса есть несколько реализаций, и при этом нет локальных 
// зависимостей, то эти реализации не нужно размещать в отдельном каталоге

// * -- trs-base.js
// * -- trs-optimized.js
// * -- trs.js

// Если локальные зависимости есть, то можно орагнизовать так:

// * -- trs
// * ---- base.js
// * ---- index.js
// * ---- calc-utils.js

// ------------------------

import { mat4 } from '../../lib/gl-matrix/index.js';
import Node from '../node.js';
import Perspective from './projections/perspective.js';

const vectorUp = [0, 1, 0];

export default class extends Node {
  viewMat = mat4.create();
  viewProjMat = mat4.create();
  projection = new Perspective(1.04, 1, 0.1, 1000);

  constructor(name, position, lookAtPoint) {
    super(name, 'camera');
    this.position = position;
    this.lookAtPoint = lookAtPoint;
  }

  get projMat() {
    return this.projection.matrix; 
  }

  _update(appProps) {
    this.projection.apply(appProps.gl, appProps.prog);

    mat4.lookAt(this.viewMat, this.position, 
      this.lookAtPoint, vectorUp);

    mat4.mul(this.viewProjMat, this.projMat, this.viewMat);
  }
};

export { Perspective };