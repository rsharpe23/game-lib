import '../require/gl-matrix.js';
import '../require/global-ext.js';

import { loadGeometry } from '../src/core/gltf-api/index.js';
import { loadBlob } from '../lib/load-api.js';

import app from '../src/app.js';
import Scene from '../src/scene.js';
import Camera from './camera.js';
import Light from '../src/light.js';
import Mesh from '../src/actors/mesh.js';
import TRS from '../src/core/trs.js';

const loadImg = async url => {
  const blob = await loadBlob(url);
  return Image.from(URL.createObjectURL(blob));
};

const _loadGeometry = async dir => {
  const geometry = await loadGeometry(dir);
  app.props.store[geometry.accessor] = {};
  return geometry;
};

const createScene = ([texAtlas, geometry]) => {
  const { drawingBufferWidth: w, drawingBufferHeight: h } = app.props.gl;
  const camera = new Camera({ aspect: w / h }, [0, 5, 20]);

  const light = new Light([0, -70, -100]);

  const scene = new Scene(texAtlas, camera, light);

  const translations = [
    [ 0,  0,  0],
    [ 0,  0,  7],
    [ 0,  0, -7],
    [ 7,  0,  0],
    [-7,  0,  0],
    [ 7,  0,  7],
    [ 7,  0, -7],
    [-7,  0,  7],
    [-7,  0, -7]
  ];

  for (const translation of translations) {
    const tank = new Mesh('tank', new TRS({ translation }), 
      geometry.asArray());

    scene.addActor(tank);
  }

  return scene;
};

const res = await Promise.all([
  loadImg('tex-atlas.jpg'), 
  _loadGeometry('tank'),
]);

app.run(createScene(res));
