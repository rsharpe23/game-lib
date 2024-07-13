import '../lib/gl-matrix.js';
import '../lib/global-ext.js';

import { loadBlob } from '../lib/load-api.js';
import { loadGeometry } from '../src/core/gltf-api/index.js';

import app from '../src/app.js';
import Scene from '../src/scene.js';
import Camera from './camera.js';
import Light from '../src/light.js';
import Mesh from '../src/visuality/mesh.js';
import TRS from '../src/core/trs.js';

// import Camera from '../src/camera/index.js';
// import Tank from './tank.js';

const loadImg = async url => {
  const blob = await loadBlob(url);
  return Image.from(URL.createObjectURL(blob));
};

// Инкапсулировать создание стора по geometry.id
const _loadGeometry = async dir => {
  const geometry = await loadGeometry(dir);
  app.props.store[geometry.id] = {};
  return geometry;
};

const createScene = ([texAtlas, geometry]) => {
  const camera = new Camera([0, 5, 20]);
  // const camera = new Camera([0, 5, 20], [0, 0, 0]);
  // camera.projection.aspect = 1.5;

  const light = new Light([0, -70, -100]);

  const scene = new Scene(texAtlas, camera, light);

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
  //   scene.add(new Mesh('tank', new TRS({ translation }), geometry));
  // }

  scene.add(new Mesh('tank', new TRS(), geometry));
  // scene.add(new Tank(geometry));

  return scene;
};

const res = await Promise.all([
  loadImg('tex-atlas.jpg'), 
  _loadGeometry('tank'),
]);

app.run(createScene(res));