const { src, dest, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')
const shortcss = require('postcss-short')

function css() {
  const plugins = [
    shortcss,
    postcssPresetEnv({ browsers: 'last 4 versions' }),
    cssnano
  ]
  return src('scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(dest('css'))
    .pipe(browserSync.stream())
}

function watchFiles() {
  browserSync.init({
      server: {
        baseDir: './'
      }
  })

  watch("scss/**/*.scss", css)
  watch("js/**/*.js").on('change', browserSync.reload)
  watch("*.html").on('change', browserSync.reload)
}

exports.css = css
exports.watchFiles = watchFiles