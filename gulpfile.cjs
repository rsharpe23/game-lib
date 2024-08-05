const { src, dest } = require('gulp');

const glslify = require('gulp-glslify-next');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const rollup = require('@rollup/stream');

exports.build = () => {
  return rollup({ 
      input: './src/index.js', 
      output: { format: 'es' },
    })
    .pipe(source('game-lib.js'))
    .pipe(dest('./build'));
};

exports.shaders = () => {
  return src('./shaders/@*/*.glsl')
    .pipe(glslify({ basedir: './shaders' }))
    .pipe(rename(path => {
      path.dirname = path.dirname.substring(1);
    }))
    .pipe(dest('./build/shaders'));
};