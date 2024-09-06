import { loadImage } from '../lib/loader.js';

import { app, progApi, shaderApi, Scene, Light, DebugLine, MeshBase, 
  TRS, MeshBuilder, gltfApi, texApi } from '../src/index.js';

import Camera from './camera.js';

const { props } = app;
const { gl, store, dataset: { shaderDir } } = props;
const meshBuilder = new MeshBuilder(new gltfApi.GltfParser(gl, store));

const loadShaders = subDir => 
  shaderApi.loadShaders(`${shaderDir}/${subDir}`);

// После того, как был изменен способ загрузки gltf (с раздельного gltf + bin на сплошной), 
// стала появлятся ошибка: "WebGL warning: tex(Sub)Image[23]D: Resource has no data (yet?)."
// До этого она появлялась лишь изредко. При этом, чем быстрее загрузка данных, 
// тем больше вероятностью её появления. Возникает она, скорей всего, 
// из-за загрузки изображений через fetch, а сам процесс создания 
// обьекта изображения несинхронный (даже через blob).
const [shaders, dlShaders, texImg, gltf] = await Promise.all([
  loadShaders('default'),
  loadShaders('debug-line'),
  loadImage('assets/texture.jpg'),
  gltfApi.loadGltf('assets/tank.gltf'),
]);

const buildScene = scene => {
  scene.appendChild(new Camera('Camera', [0, 2, 10]));
  scene.appendChild(new Light('Light', [0, -70, -100]));

  const debugLine = new DebugLine('Line', [0, 3, 0], [2, 3, 0]);
  debugLine.prog = progApi.createProgram(gl, dlShaders);
  scene.appendChild(debugLine);

  const tank = new MeshBase('Tank', new TRS(), texImg);
  meshBuilder.build(gltf, tank);
  scene.appendChild(tank);

  return scene;
};

// TODO: Сделать так, чтобы при потере ссылки на сцену, очищались 
// свяазанные данные из store (возможно как-то через WeakMap)
store.set(texImg, texApi.createTexture(gl, texImg));
store.set(gltf, new Map());

props.prog = progApi.createProgram(gl, shaders);
props.scene = buildScene(new Scene('Scene'));

app.loop(performance.now());
app.watchFps();
// setTimeout(() => app.report(), 5000);