// let res = src.matchAll(/\s*(attribute|uniform)\s+\w+\s+(\w+)\s*;/g);
// res = Array.from(res).map(item => item[2]);

import '../lib/global-ext.js';
import { loadShaders } from "../src/core/shader-api.js";
import { createProgram } from "../src/core/program-api.js";
import app from '../src/app.js';

const { gl } = app.props;
const shaders = await loadShaders('/shaders/default');

const prog = createProgram(gl, shaders);
console.log(prog);