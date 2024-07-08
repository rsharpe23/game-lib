import { Scene } from '../src/scene.js';

export default class extends Scene {
  _cameraAngle = 0;

  constructor(texAtlas, actors) {
    super(actors);
    this.texAtlas = texAtlas;
  }

  _beforeRender({ gl, prog }) {
    gl.clearColor(0.0, 0.0, 0.14, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(prog);

    // Если использовать текстурный атлас, 
    // то он будет только один на всю сцену.
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, 
      gl.UNSIGNED_BYTE, this.texAtlas);
    gl.generateMipmap(gl.TEXTURE_2D);
  }

  _render({ canvas, gl, prog, matrices }, deltaTime) {
    const { width, height } = canvas;

    gl.viewport(0, 0, width, height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(matrices.projection, 1.04, width / height, 0.1, 1000.0);
    gl.uniformMatrix4fv(prog.u_PMatrix, false, matrices.projection);

    this._cameraAngle += deltaTime;
    const cameraRot = quat.create();
    const cameraPos = vec3.create();
    quat.fromEuler(cameraRot, 0, degToRad(this._cameraAngle), 0);
    vec3.transformQuat(cameraPos, [0, 3, 10], cameraRot);
    mat4.lookAt(matrices.modelView, cameraPos, [0, 0, 0], [0, 1, 0]);

    // mat4.lookAt(matrices.modelView, [0, 0, 5], [0, 0, 0], [0, 1, 0]);

    const lightingPos = vec3.create();
    vec3.transformMat4(lightingPos, [0, -7, -10], matrices.modelView);
    prog.setLightUniforms(lightingPos);

    prog.setMaterialUniforms();
  }
}