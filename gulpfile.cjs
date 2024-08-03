const { src, dest, series, parallel, watch } = require('gulp');

const clean = require('gulp-clean');
const rename = require('gulp-rename');
const glslify = require('gulp-glslify-next');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync');

const rollup = require('@rollup/stream');
const nodeResolve = require('@rollup/plugin-node-resolve');

const server = browserSync.create();

const clearTask = globs => {
  return src(globs, { allowEmpty: true })
    .pipe(clean()); 
};

const withReload = task => {
  // if (task.pipe) {
  //   return task.pipe();
  // }

  // return series(task, () => {})

  // которые не имеют метода pipe()

  return series(task, callback => {
    server.reload()
    callback();
  });
}

// ------------

// Перед сборкой нужно удалять предыдущие файлы, т.к. к ним 
// добавляется каждый раз доп. префикс и получаются 
// новые имена и соответсвенно новые файлы

const beforeShaders = () => clearTask('./shaders/**/*.build.glsl');

const shaders = () => {
  return src('./shaders/@*/*.glsl')
    .pipe(glslify({ basedir: './shaders' }))
    .pipe(rename({ extname: '.build.glsl' }))
    .pipe(dest('./shaders'));
}

// ------------

const beforeServe = () => {
  // Стартует сервер
  server.init({ 
    server: { baseDir: './' },
  });
};

const serve = () => {
  watch(['./src/**/*.js', './example/**/*.js'], 
    withReload( exports.build ));

  // Рекурсия вызывается из-за того, что watch реагирует 
  // на удаление build-файлов и на из создание 
  watch(['./shaders/**/*.glsl', '!**/*.build.glsl'], 
    withReload( exports.shaders ));
}

// ------------

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

exports.shaders = series(beforeShaders, shaders);
exports.default = parallel(beforeServe, serve);