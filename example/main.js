import '../lib/gl-matrix.js';
import '../lib/global-ext.js';

import { loadImage } from '../lib/load-api.js';
import { loadShaders } from '../src/core/shader-api.js'
import { loadGeometry } from '../src/core/gltf-api/index.js';

import { createProgram as glCreateProgram, createTexture 
} from '../src/core/gl-util.js';

import app from '../src/app.js';
import Scene from '../src/scene.js';
import Camera from './camera.js';
import Light from '../src/light.js';
import Mesh from '../src/visuals/mesh/index.js';
import TRS from '../src/core/trs.js';

const { props } = app;
const { gl, store } = props;

const [shaders, texImg, geometry] = await Promise.all([
  loadShaders('/shaders/default'),
  loadImage('texture.jpg'), 
  loadGeometry('tank'),
]);

const createProgram = ([vs, fs]) => {
  const prog = glCreateProgram(gl, vs(gl), fs(gl));

  prog.a_Position = gl.getAttribLocation(prog, "a_Position");
  prog.a_Normal = gl.getAttribLocation(prog, "a_Normal");
  prog.a_Texcoord = gl.getAttribLocation(prog, "a_Texcoord");

  prog.u_PMatrix = gl.getUniformLocation(prog, "u_PMatrix");
  prog.u_MVMatrix = gl.getUniformLocation(prog, "u_MVMatrix");
  prog.u_NMatrix = gl.getUniformLocation(prog, "u_NMatrix");
  prog.u_Sampler = gl.getUniformLocation(prog, "u_Sampler");

  prog.u_AmbientColor = gl.getUniformLocation(prog, "u_AmbientColor");
  prog.u_DiffuseColor = gl.getUniformLocation(prog, "u_DiffuseColor");
  prog.u_SpecularColor = gl.getUniformLocation(prog, "u_SpecularColor");
  prog.u_LightingPos = gl.getUniformLocation(prog, "u_LightingPos");

  prog.u_MaterialAmbientColor = gl.getUniformLocation(prog, "u_MaterialAmbientColor");
  prog.u_MaterialSpecularColor = gl.getUniformLocation(prog, "u_MaterialSpecularColor");

  return prog;
};

const createScene = (camera, light) => {
  const scene = new Scene(camera, light);

  const translations = [
    [ 0,  0,  0],
    [ 0,  0,  7],
    [ 0,  0, -7],
    [ 7,  0,  0],
    [-7,  0,  0],
    [ 7,  0,  7],
    [ 7,  0, -7],
    [-7,  0,  7],
    [-7,  0, -7],
  ];

  for (const translation of translations) {
    const mesh = new Mesh('tank', 
      new TRS({ translation }), geometry, texImg);

    scene.addVisual(mesh);
  }

  return scene;
};

// Если props.updatable задать null, то store очистится автоматически.
// Но если перед этим вывести props на консоль, то будет показано
// что store имеет по прежнему данные. Возможно, это из-за того, 
// что ссылка на weakMap попадает в ф-цию log().

store.set(geometry, {});
store.set(texImg, createTexture(gl, texImg));

props.prog = createProgram(shaders);
props.updatable = createScene(new Camera([0, 5, 20]), new Light([0, -70, -100]));

app.loop(performance.now());