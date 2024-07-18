import '../lib/gl-matrix.js';
import '../lib/global-ext.js';

import { loadImage } from '../lib/load-api.js';
import { loadShaders } from '../src/core/shader-api.js'
import { loadGeometry } from '../src/core/gltf-api/index.js';
import { createProgram } from '../src/core/program-factory.js';
import { createTexture } from '../src/core/gl-util.js';

import app from '../src/app.js';
import Scene from '../src/scene.js';
import Camera from './camera.js';
import Light from '../src/light.js';
import Mesh from '../src/visuals/mesh/index.js';
import TRS from '../src/core/trs.js';

const { props } = app;
const { gl, store } = props;

// После того, как был изменен способ загрузки gltf (с раздельного gltf + bin на сплошной), 
// стала появлятся ошибка: "WebGL warning: tex(Sub)Image[23]D: Resource has no data (yet?)."
// До этого она появлялась лишь изредко. Возникает она из-за вложенного Promise.all() 
// внутри другого Promise.all() и только когда нет задержки при получении данных. 
// При тестир. с throttling'ом (3g/4g) такой ошибки не было, но с доб. WiFi уже появлялась.
const [shaders, texImg, geometry] = await Promise.all([
  loadShaders('/shaders/default'),
  loadImage('texture.jpg'), 
  loadGeometry('tank.gltf'),
  new Promise(resolve => setTimeout(() => resolve(), 100)), // HACK 
]);

const createScene = (camera, light) => {
  const scene = new Scene(camera, light);

  // const translations = [
  //   [ 0,  0,  0],
  //   [ 0,  0,  7],
  //   [ 0,  0, -7],
  //   [ 7,  0,  0],
  //   [-7,  0,  0],
  //   [ 7,  0,  7],
  //   [ 7,  0, -7],
  //   [-7,  0,  7],
  //   [-7,  0, -7],
  // ];

  // for (const translation of translations) {
  //   const mesh = new Mesh('tank', 
  //     new TRS({ translation }), texImg, geometry);

  //   scene.addVisual(mesh);
  // }

  scene.addVisual(new Mesh('tank', new TRS(), texImg, geometry));

  return scene;
};

props.prog = createProgram(gl, shaders);
props.updatable = createScene(new Camera([0, 5, 20]), new Light([0, -70, -100]));

// Создавать текстуру лучше после создания программы, иначе может 
// появиться всё таже ошибка "WebGL warning: tex(Sub)Image[23]D"
store.set(texImg, createTexture(gl, texImg));
store.set(geometry, {});

app.loop(performance.now());