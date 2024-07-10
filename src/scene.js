import SceneBase from '../src/scene-base.js';

const applyGlobalMaterial = (gl, prog) => {
  gl.uniform3f(prog.u_MaterialAmbientColor, 0.2, 0.2, 0.2);
  gl.uniform3f(prog.u_MaterialSpecularColor, 0.8, 0.8, 0.8);
};

export default class extends SceneBase {
  constructor(texAtlas, camera, light) {
    super(camera, light);
    this.texAtlas = texAtlas;
  }

  _beforeRender({ gl, prog }) {
    gl.clearColor(0.0, 0.0, 0.14, 1.0);
    gl.enable(gl.DEPTH_TEST);

    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, 
      gl.UNSIGNED_BYTE, this.texAtlas);
    gl.generateMipmap(gl.TEXTURE_2D);

    prog.setLocations(gl);
  }

  _render(appProps) {
    const canvas = appProps.canvas;
    const gl =  appProps.gl;
    const prog =  appProps.prog;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    prog.use(gl);

    this.camera.apply(appProps);
    this.light.apply(appProps);

    applyGlobalMaterial(gl, prog);
  }
}

// const cameraRot = {
//   q: quat.create(),

//   update(deltaTime) {
//     quat.fromEuler(this.q, 0, degToRad(deltaTime), 0);
//     vec3.transformQuat(camera.position, camera.position, this.q);
//   }
// };