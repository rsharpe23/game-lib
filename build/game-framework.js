// Диначеская загрузка лучше тем, что позволяет загружать ресурсы 
// постепенно, например сначала для начальной сцены, затем для игровой и т.д.
// Если собрать статический бандл (шейдеры, текстуры, модели), то его нужно 
// будет подгружать целиком, что приведет к долгой начальной загрузке.

const loadResource = async (path, type) => {
  const res = await fetch(path);
  return res[type]();
};

const loadText = async path => loadResource(path, 'text');
const loadJson = async path => loadResource(path, 'json');
const loadBuffer = async path => loadResource(path, 'arrayBuffer');

/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */

function create$5() {
  var out = new ARRAY_TYPE(9);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }

  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */

function create$4() {
  var out = new ARRAY_TYPE(16);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @returns {mat4} out
 */

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds.
 * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
 * which matches WebGL/OpenGL's clip volume.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */

function perspectiveNO(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    var nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }

  return out;
}
/**
 * Alias for {@link mat4.perspectiveNO}
 * @function
 */

var perspective = perspectiveNO;
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */

var mul = multiply;

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */

function create$3() {
  var out = new ARRAY_TYPE(3);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */

function fromValues(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize$2(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec3} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Alias for {@link vec3.length}
 * @function
 */

var len = length;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

(function () {
  var vec = create$3();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
})();

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */

function create$2() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to normalize
 * @returns {vec4} out
 */

function normalize$1(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

(function () {
  var vec = create$2();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
})();

/**
 * Quaternion in the format XYZW
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */

function create$1() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyVec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/

function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > EPSILON) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyMat3} m rotation matrix
 * @returns {quat} out
 * @function
 */

function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

var normalize = normalize$1;
/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {ReadonlyVec3} a the initial vector
 * @param {ReadonlyVec3} b the destination vector
 * @returns {quat} out
 */

(function () {
  var tmpvec3 = create$3();
  var xUnitVec3 = fromValues(1, 0, 0);
  var yUnitVec3 = fromValues(0, 1, 0);
  return function (out, a, b) {
    var dot$1 = dot(a, b);

    if (dot$1 < -0.999999) {
      cross(tmpvec3, xUnitVec3, a);
      if (len(tmpvec3) < 0.000001) cross(tmpvec3, yUnitVec3, a);
      normalize$2(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot$1 > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot$1;
      return normalize(out, out);
    }
  };
})();
/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {ReadonlyQuat} c the third operand
 * @param {ReadonlyQuat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

(function () {
  var temp1 = create$1();
  var temp2 = create$1();
  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
})();
/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {ReadonlyVec3} view  the vector representing the viewing direction
 * @param {ReadonlyVec3} right the vector representing the local "right" direction
 * @param {ReadonlyVec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */

(function () {
  var matr = create$5();
  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize(out, fromMat3(out, matr));
  };
})();

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */

function create() {
  var out = new ARRAY_TYPE(2);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

(function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
})();

class TRS {
  _matrix = create$4();
  _changed = false;

  _translation = [0, 0, 0];
  _rotation = [0, 0, 0, 1];
  _scale = [1, 1, 1];
  _parent = null;

  constructor({ translation, rotation, scale } = {}, parent) {
    if (translation) this.translation = translation;
    if (rotation) this.rotation = rotation;
    if (scale) this.scale = scale;
    if (parent) this.parent = parent;
  }

  get translation() { return this._translation; }
  set translation(value) {
    this._translation = value;
    this.onChange();
  }

  get rotation() { return this._rotation; }
  set rotation(value) {
    this._rotation = value;
    this.onChange();
  }

  get scale() { return this._scale; }
  set scale(value) {
    this._scale = value;
    this.onChange();
  }

  get parent() { return this._parent; }
  set parent(value) {
    // Перед тем, как задать новый parent, нужно очистить предыдущий, 
    // иначе получится так, что trs, который уже не является 
    // parent'ом, при обновлении будет дёргать onChange 
    // тех trs, к которым уже не относится
    if (this._parent) {
      const { origin } = this._parent.onChange;
      if (origin) this._parent.onChange = origin;
    }

    // Это условие должно идти вторым, т.к. если задавать parent'ом 
    // один и тот же trs, то получится цепочка ф-ций, 
    // в которых origin будет иметь зависимости
    if (value) {
      const { onChange } = value;
      value.onChange = Object.assign(() => {
        onChange.call(value);
        this.onChange();
      }, { origin: onChange });
    }

    this._parent = value;
    this.onChange();
  }

  get matrix() {
    if (this._changed) {
      this._calcWorldMatrix(this._matrix);
      this._changed = false;
    }

    return this._matrix;
  }

  onChange() {
    this._changed = true;
  }

  _calcWorldMatrix(out) {
    this._calcLocalMatrix(out);
    if (this.parent) {
      mul(out, this.parent.matrix, out);
    }
  }

  _calcLocalMatrix(out) {
    fromRotationTranslationScale(out, 
      this.rotation, this.translation, this.scale);
  }
}

class Geometry {
  constructor(scene, nodeTree, meshParser) {
    this._scene = scene;
    this._nodeTree = nodeTree;
    this._meshParser = meshParser;
  }
  
  traverse(cb) {
    this._nodeTree.traverse(this._scene.nodes, 
      (node, parent) => {
        node.trs = new TRS(node, parent?.trs);
        cb(this._parseNode(node));
      });
  }

  _parseNode({ name, trs, mesh }) {
    return { 
      name, trs, 
      primitives: this._meshParser.parseMesh(mesh),
      get matrix() { 
        return this.trs.matrix; 
      }, 
    };
  }
}

class NodeTree {
  constructor(nodes) {
    this.nodes = nodes;
  }

  traverse(roots, cb, parentOfRoot) {
    for (const root of roots) {
      const { children, ...rest } = this.nodes[root];
      cb(rest, parentOfRoot);

      if (children) {
        this.traverse(children, cb, rest);
      }
    }
  }
}

// TODO: Этот модуль можно вообще вынести в lib, 
// но для этого нужно убрать некоторые связи с ядром, 
// в часности параметры: store, buffer, prog.

const createProgram$1 = (gl, vs, fs) => {
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw new Error('Program link error');
  }

  return prog;
};

const createShader = (gl, type, src) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`Shader error: ${gl.getShaderInfoLog(shader)}`);
  }

  return shader;
};

const createBuffer = (gl, data, target) => {
  const buffer = gl.createBuffer();
  gl.bindBuffer(target, buffer);
  gl.bufferData(target, data, gl.STATIC_DRAW);
  return buffer;
};

const createTexture$1 = (gl, img, isPowerOf2) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

  if (isPowerOf2(img.width) && isPowerOf2(img.height)) {
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  }

  return texture;
};

// getParameter(gl.CURRENT_PROGRAM) влияет на производительность. 
// Эту ф-цию лучше не использовать в цикле отрисовки
const useProgram = (gl, prog) => {
  if (prog === gl.currentProg) return;
  gl.currentProg = prog;
  gl.useProgram(prog.glProg);
};

const setMatUniform = (gl, uniform, matrix) => {
  gl.uniformMatrix4fv(uniform, false, matrix);
};

const setTexUniform = (gl, uniform, texture, unitIndex = 0) => {
  gl.activeTexture(gl.TEXTURE0 + unitIndex);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(uniform, unitIndex);
};

const setAttribute = (gl, store, attr, buffer) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.glBuffer(gl, store));
  gl.enableVertexAttribArray(attr);
  gl.vertexAttribPointer(attr, buffer.typeSize, 
    buffer.componentType, false, 0, 0);
};

const drawElements = (gl, store, buffer) => {
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.glBuffer(gl, store));
  gl.drawElements(gl.TRIANGLES, buffer.count, 
    buffer.componentType, 0);
};

var glUtil = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createProgram: createProgram$1,
  createShader: createShader,
  createBuffer: createBuffer,
  createTexture: createTexture$1,
  useProgram: useProgram,
  setMatUniform: setMatUniform,
  setTexUniform: setTexUniform,
  setAttribute: setAttribute,
  drawElements: drawElements
});

const typeSizeMap = {
  'SCALAR': 1,
  'VEC2': 2,
  'VEC3': 3,
};

class MeshParser {
  constructor({ meshes, accessors, bufferViews, buffers }) {
    this.meshes = meshes;
    this.accessors = accessors;
    this.bufferViews = bufferViews;
    this.buffers = buffers;
  }

  parseMesh(mesh) {
    return this._parseMesh(this.meshes[mesh]);
  }

  _parseMesh({ primitives }) {
    return primitives.map(({ attributes, indices }) => ({
      vbo: this._createBuffer(attributes['POSITION']),
      nbo: this._createBuffer(attributes['NORMAL']),
      tbo: this._createBuffer(attributes['TEXCOORD_0']),
      ibo: this._createBuffer(indices),
    }));
  }

  _createBuffer(accessor) {
    const { bufferView, type, ...rest } = this.accessors[accessor];

    rest.typeSize = typeSizeMap[type];
    rest.glBuffer = (gl, store) => {
      return store[accessor] ??= this._createGLBuffer(
        gl, this.bufferViews[bufferView]);
    };

    return rest;
  }

  _createGLBuffer(gl, { buffer, byteLength, byteOffset, target }) {
    const data = new Uint8Array(this.buffers[buffer], 
      byteOffset, byteLength);

    return createBuffer(gl, data, target);
  }
}

const loadGltf = async path => {
  const gltf = await loadJson(path);
  const { uri } = gltf.buffers[0];
  gltf.buffers[0] = await loadBuffer(uri);
  return gltf;
};

const parseGltf = gltf => {
  const { scene, scenes, nodes, ...rest } = gltf;
  const nodeTree = new NodeTree(nodes);
  const meshParser = new MeshParser(rest);
  return new Geometry(scenes[scene], nodeTree, meshParser);
};

const loadGeometry = async path => {
  const gltf = await loadGltf(path);
  return parseGltf(gltf);
};

var index$4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadGltf: loadGltf,
  parseGltf: parseGltf,
  loadGeometry: loadGeometry
});

class Program {
  constructor(glProg) {
    this.glProg = glProg;
  }

  setLocationProps(gl, locations) {
    for (const [qualifier, name] of locations) {
      const action = qualifier === 'attribute' ? 'getAttribLocation' :
        qualifier === 'uniform' ? 'getUniformLocation' : '';

      if (!action) {
        throw new Error(`Incorrect qualifier: ${qualifier}`
          + ` of location: ${name}`);
      }

      this[name] = gl[action](this.glProg, name);
    }
  }
}

const _createProgram = (gl, glProg, locations) => {
  const prog = new Program(glProg);
  prog.setLocationProps(gl, locations);
  return prog;
};

const createProgram = (gl, shaders) => {
  const locations = shaders.map(shader => shader.parse()).flat();

  const [vs, fs] = shaders;
  const glProg = createProgram$1(gl, vs(gl, gl.VERTEX_SHADER), 
    fs(gl, gl.FRAGMENT_SHADER));

  return _createProgram(gl, glProg, locations);
};

var index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createProgram: createProgram,
  Program: Program
});

class Shader extends Callable {
  constructor(src) {
    super();
    this.src = src;
  }

  parse() {
    const matches = this.src.matchAll(
      /\s*(attribute|uniform)\s+((low|medium|high)p\s+)?\w+\s+(\w+)\s*;/g);

    return Array.from(matches).map(item => [item[1], item[4]]);
  }

  // Можно заменить на compile
  _call(gl, type) {
    return createShader(gl, type, this.src);
  }
}

// Если в файле index.js участвуют также некоторые классы api, 

const loadShader = async path => {
  const src = await loadText(path);
  return new Shader(src);
};

const loadShaders = dir => {
  const requiredFiles = ['vert.glsl', 'frag.glsl'];

  const requests = requiredFiles
    .map(file => loadShader(`${dir}/${file}`));

  return Promise.all(requests);
};

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loadShader: loadShader,
  loadShaders: loadShaders,
  Shader: Shader
});

const isPowerOf2 = value => (value & (value - 1)) === 0;

const createTexture = (gl, img) => 
  createTexture$1(gl, img, isPowerOf2);

var textureApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createTexture: createTexture
});

// Контекст webgl можно создать и динамически (см. demo fxaa)
const elem = document.getElementById('app');

const ctxOpts = {
  // antialias: false,
};

var app = {
  props: {
    gl: elem.getContext('webgl', ctxOpts),
    shaderDir: elem.dataset.shaderDir,
    prog: null,
    updatable: null,
    store: new WeakMap(),
    deltaTime: 0,
    time: 0,
  },

  get loop() {
    return this._loop ??= elapsedTime => {
      const props = this.props;
      props.deltaTime = elapsedTime - props.time;
      props.time = elapsedTime;
      props.updatable.update(props);
      // TODO: Приостанавливать цикл, когда приложение теряет фокус
      requestAnimationFrame(this.loop);
    };
  },

  // TODO: Добавить 2 метода: stop() и resume()
};

class Updatable {
  _canUpdate = false; 

  update(appProps) {
    if (this._canUpdate) {
      this._update(appProps);
      return;
    }

    this._beforeUpdate?.(appProps);
    this._canUpdate = true;
  }

  _update(appProps) {
    throw new Error('Not implemented');
  }
}

const addVisual = (out, visual) => {
  if (!visual.prog) {
    out.unshift(visual);
    return;
  }
  
  const index = out.findLastIndex(v => v.prog === visual.prog);
  if (~index) {
    out.splice(index, 0, visual);
    return;
  }
  
  out.push(visual);
};

class SceneBase extends Updatable {
  visuals = [];

  constructor(camera, light) {
    super();
    this.camera = camera;
    this.light = light;
  }

  addVisual(visual) { 
    addVisual(this.visuals, visual); 
  }

  findVisual(name) {
    return this.visuals.find(visual => visual.name === name);
  }

  findVisuals(tag) {
    return this.visuals.filter(visual => visual.tag === tag);
  }

  update(appProps) {
    super.update(appProps);

    this.camera.update(appProps);
    this.light.update(appProps);

    for (const visual of this.visuals) {
      visual.update(appProps);
    }
  }
}

const setMaterialUniforms = (gl, prog) => {
  gl.uniform3f(prog.u_MaterialAmbientColor, 0.4, 0.4, 0.4);
  gl.uniform3f(prog.u_MaterialSpecularColor, 1.0, 1.0, 1.0);
};

class scene extends SceneBase {
  _beforeUpdate({ gl }) {
    gl.clearColor(0.0, 0.0, 0.14, 1.0);
    gl.enable(gl.DEPTH_TEST);
  }

  _update(appProps) {
    const gl =  appProps.gl;
    const prog = appProps.prog;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    useProgram(gl, prog);
    setMaterialUniforms(gl, prog);
  }
}

const worldPos = create$3();

const setColorUniforms = (gl, prog, colors) => {
  gl.uniform3fv(prog.u_AmbientColor, colors.ambient);
  gl.uniform3fv(prog.u_DiffuseColor, colors.diffuse);
  gl.uniform3fv(prog.u_SpecularColor, colors.specular);
};

class light extends Updatable {
  colors = {
    ambient: [0.4, 0.4, 0.4],
    diffuse: [0.8, 0.8, 0.8],
    specular: [1, 1, 1],
  };

  constructor(position) {
    super();
    this.position = position;
  }

  _update(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;
    const camera = appProps.updatable.camera;

    transformMat4(worldPos, this.position, camera.viewMat);
    gl.uniform3fv(prog.u_LightingPos, worldPos);

    setColorUniforms(gl, prog, this.colors);
  }
}

class Projection {
  constructor(matrix) { 
    this.matrix = matrix; 
  }

  setMatUniform(gl, prog) {
    setMatUniform(gl, prog.u_PMatrix, this.matrix);
  }
}

class Perspective extends Projection {
  fov = 1.04;
  aspect = 1;
  near = 0.1;
  far = 1000;

  constructor() {
    super(create$4());
  }

  setMatUniform(gl, prog) {
    perspective(this.matrix, this.fov, this.aspect, 
      this.near, this.far);
      
    super.setMatUniform(gl, prog);
  }
}

// В одной папке camera не может быть несколько разных файлов камер, 

class index$1 extends Updatable {
  viewMat = create$4();
  projection = new Perspective();

  constructor(position, lookAtPoint) {
    super();
    this.position = position;
    this.lookAtPoint = lookAtPoint;
  }

  get projMat() {
    return this.projection.matrix;
  }

  _update(appProps) {
    this.projection.setMatUniform(appProps.gl, appProps.prog);

    // Вокруг glMatrix тоже можно сделать обертку
    lookAt(this.viewMat, this.position, 
      this.lookAtPoint, [0, 1, 0]);
  }
}

class Visual extends Updatable {
  tag = 'default';
  isHidden = false;
  // Может хранить любые данные пользовательского 
  // рендеринга, например: материал, вспом. текстуры 
  // и шейдерную программу для их обработки.
  renderProps = {};

  constructor(name, trs) {
    super();
    this.name = name;
    this.trs = trs;
  }

  get prog() {
    return this.renderProps.prog;
  }

  update(appProps) {
    if (this.isHidden) return;
    super.update(appProps);
  }
}

class ItemList extends Array {
  constructor(geometry) {
    super();
    this._geometry = geometry;
    geometry.traverse(node => this.push(node));
    Object.freeze(this);
  }
  
  get geometry() {
    return this._geometry;
  }
}

// TODO: Порефакторить подобным образом класс Projection или попробовать 
// сразу сделать униформы и атрибуты программы такими объектами 

// class MatrixUniform {
//   matrix = mat4.create();

//   constructor(location) {
//     this.location = location;
//   }

//   set(gl) { 
//     setMatUniform(gl, this.location, this.matrix); 
//   }
// }

// TODO: Перенести в более подходящий раздел

class MatrixUniform {
  matrix = create$4();

  // Временный перенос location из констурктора 
  // в параметры, для удобства
  set(gl, location) { 
    setMatUniform(gl, location, this.matrix); 
  }
}

class ModelViewMatrixUniform extends MatrixUniform {
  set(gl, prog, viewMat, modelMat) {
    mul(this.matrix, viewMat, modelMat);
    super.set(gl, prog.u_MVMatrix);
  }
}

class NormalMatrixUniform extends MatrixUniform {
  set(gl, prog, mvMat) {
    invert(this.matrix, mvMat);
    transpose(this.matrix, this.matrix);
    super.set(gl, prog.u_NMatrix);
  }
}

const mvMatUniform = new ModelViewMatrixUniform();
const nMatUniform = new NormalMatrixUniform();

const setMatUniforms = (gl, prog, camera, item) => {
  mvMatUniform.set(gl, prog, camera.viewMat, item.matrix);
  nMatUniform.set(gl, prog, mvMatUniform.matrix);
};

class index extends Visual {
  constructor(name, trs, texImg, geometry) {
    super(name, trs);
    this.texImg = texImg;
    this.items = new ItemList(geometry);
  }

  get geometry() {
    return this.items.geometry;
  }

  findItem(name) {
    return this.items.find(item => item.name === name);
  }

  _beforeUpdate() {
    for (const { trs } of this.items) {
      if (!trs.parent) trs.parent = this.trs;
    }
  }
  
  _update(appProps) {
    const gl = appProps.gl;
    const prog = appProps.prog;
    const camera = appProps.updatable.camera;
  
    const texture = appProps.store.get(this.texImg);
    const geomStore = appProps.store.get(this.geometry);
  
    setTexUniform(gl, prog.u_Sampler, texture);
    
    for (const item of this.items) {
      setMatUniforms(gl, prog, camera, item);
  
      for (const primitive of item.primitives) {
        setAttribute(gl, geomStore, prog.a_Position, primitive.vbo);
        setAttribute(gl, geomStore, prog.a_Normal, primitive.nbo);
        setAttribute(gl, geomStore, prog.a_Texcoord, primitive.tbo);
        drawElements(gl, geomStore, primitive.ibo);
      }
    }
  }

}

const matrix = create$4();
const color = [1, 1, 1, 1];

// TODO: Попробовать перенести часть логики в шейдер, 
// чтобы не создавать буфер и атрибут в js

// Не получится это сделать, т.к. луч требует минимум 2х точек 
// в пространстве, начальной и конечной, кот. должны 
// передаваться через атрибуты и соотв. задаваться через буфер.

// Можно еще попытаться реализовать луч через gl.POINTS

const shaders = [
  new Shader(`
    attribute vec4 a_Position;
    uniform mat4 u_Matrix;

    void main() {
      gl_Position = u_Matrix * a_Position;
    }
  `),

  new Shader(`
    uniform mediump vec4 u_Color;

    void main() {
      gl_FragColor = u_Color;
    }
  `),
];

class ray extends Visual {
  constructor(name, trs) {
    super(name, trs);
    this.renderProps.prog = true;
  }

  _beforeUpdate({ gl }) {
    // TODO: Попробовать сделать так, чтобы в буфер 
    // сразу попадали нужны координаты

    const { renderProps } = this;
    renderProps.prog = createProgram(gl, shaders);
    renderProps.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, renderProps.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, 
      new Float32Array([0, 0, 0, 1, 0, 0]), gl.STATIC_DRAW);
  }

  _update(appProps) {
    const gl = appProps.gl;
    const camera = appProps.updatable.camera;

    useProgram(gl, this.prog);

    mul(matrix, camera.viewMat, this.trs.matrix);
    mul(matrix, camera.projMat, matrix);
    setMatUniform(gl, this.prog.u_Matrix, matrix);

    gl.uniform4fv(this.prog.u_Color, color);

    const attr = this.prog.a_Position;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.renderProps.vbo);
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(attr, 3, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.LINES, 0, 2);
  }
}

export { index$1 as Camera, Perspective as CameraPerspective, Projection as CameraProjection, light as Light, index as Mesh, ray as Ray, scene as Scene, TRS, Updatable, Visual, app, index$4 as gltfApi, glUtil as glu, index$3 as progApi, index$2 as shaderApi, textureApi as texApi };
