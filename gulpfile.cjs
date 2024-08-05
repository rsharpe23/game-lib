const { src, dest, parallel, watch } = require('gulp');

const glslify = require('gulp-glslify-next');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync');

const rollup = require('@rollup/stream');
const nodeResolve = require('@rollup/plugin-node-resolve');

const liveServer = browserSync.create();

const beforeServe = () => {
  liveServer.init({ 
    server: { 
      baseDir: './',
      routes: { "/": "example" }
    },
  });
}

const serve = () => {
  // Более удобный вариант ослеживания изменений 
  // (чем отслеживание src-файлов)
  watch('./build', callback => {
    liveServer.reload();
    callback();
  });
};

exports.build = () => {
  return rollup({ 
      input: './src/index.js', 
      output: { format: 'es' },
      plugins: [
        nodeResolve()
      ], 
    })
    .pipe(source('game-framework.js'))
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

exports.default = parallel(beforeServe, serve);