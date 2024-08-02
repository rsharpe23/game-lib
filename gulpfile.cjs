const { src, dest, series } = require('gulp');

const clean = require('gulp-clean');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const glslify = require('gulp-glslify-next');

const rollupStream = require('@rollup/stream');
const nodeResolve = require('@rollup/plugin-node-resolve');

const clearTask = globs => {
  return src(globs, { allowEmpty: true })
    .pipe(clean()); 
};

const clearBuild = () => clearTask('./build/');
const clearShaders = () => clearTask('./shaders/**/*.build.glsl');

const build = () => {
  return rollupStream({ 
      input: './src/index.js', 
      output: { format: 'es' },
      plugins: [
        nodeResolve()
      ], 
    })
    .pipe(source('game-framework.js'))
    .pipe(dest('./build'));
};

const shaders = () => {
  return src('./shaders/@*/*.glsl')
    .pipe(glslify({ basedir: './shaders' }))
    .pipe(rename({ extname: '.build.glsl' }))
    .pipe(dest('./shaders'));
};

exports.build = series(clearBuild, build);
exports.shaders = series(clearShaders, shaders);

exports.default = () => {
  // TODO: watch
};