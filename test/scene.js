import Scene from '../src/scene.js';
import light from '../src/light.js';
import camera from '../src/camera.js';
import { degToRad } from '../lib/math.js';

const { quat, vec3 } = glMatrix;

const cameraRot = {
  q: quat.create(),

  update(deltaTime) {
    quat.fromEuler(this.q, 0, degToRad(deltaTime), 0);
    vec3.transformQuat(camera.position, camera.position, this.q);
  }
};

const applyGlobalMaterial = (gl, prog) => {
  gl.uniform3f(prog.u_MaterialAmbientColor, 0.2, 0.2, 0.2);
  gl.uniform3f(prog.u_MaterialSpecularColor, 0.8, 0.8, 0.8);
};

export default class extends Scene {
  constructor(texAtlas) {
    super();
    this.texAtlas = texAtlas;
  }

  _beforeRender({ canvas, gl, prog }) {
    gl.clearColor(0.0, 0.0, 0.14, 1.0);
    gl.enable(gl.DEPTH_TEST);

    prog.setLocations(gl);
    prog.use(gl);

    // Если использовать текстурный атлас, то он будет только один на всю сцену.
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, 
      gl.UNSIGNED_BYTE, this.texAtlas);
    gl.generateMipmap(gl.TEXTURE_2D);

    camera.position = [0, 5, 20];
    camera.perspective.aspect = canvas.width / canvas.height;

    light.position = [0, -70, -100];
  }

  _render(appProps, deltaTime) {
    const canvas = appProps.canvas;
    const gl =  appProps.gl;
    const prog =  appProps.prog;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // TODO: Свет и камеру можно сделать классами, задавать их как 
    // свойства сцены и вызывать здесь, вместо импорта напрямую

    // TODO: Подумать, нужно ли убирать матрицы из глобального доступа в app

    cameraRot.update(deltaTime);
    camera.apply(appProps);

    light.apply(appProps);

    applyGlobalMaterial(gl, prog);
  }
}