import { createShader, createProgram, createBuffer 
  } from '../../core/gl-util.js';

import Visual from '../visual.js';

// const shaders = [
//   {
//     type: 35633,
//     src: glsl`
//       attribute vec4 a_Position;
//       attribute vec4 a_Color;

//       uniform mat4 u_Matrix;
//       varying vec4 v_Color;

//       void main() {
//         gl_Position = u_Matrix * a_Position;
//         v_Color = a_Color;
//       }
//     `,
//   },
//   {
//     type: 35632,
//     src: glsl`
//       varying mediump vec4 v_Color;

//       void main() {
//         gl_FragColor = v_Color;
//       }
//     `,
//   }
// ];

export default class extends Visual {
  _beforeUpdate({ gl }) {
    // const [vs, fs] = shaders.map(({ type, src }) => 
    //   createShader(gl, type, src));

    // prog = createProgram(gl, vs, fs);
  }

  _update(appProps) {
    
  }
}