// import { createRequire } from 'node:module'
import spawn from 'cross-spawn'

import gulp from 'gulp'
import gulpImage from 'gulp-image'
import gulpNewer from 'gulp-newer'
import gulpPlumber from 'gulp-plumber'
import gulpSize from 'gulp-size'

/* const require = createRequire(import.meta.url)

const $ = require('gulp-load-plugins')({
  lazy: true,
}) */

// const loadGulpImage = async () => await import('gulp-image')

// file locations
const devBuild
    // eslint-disable-next-line node/prefer-global/process
    = (process.env.NODE_ENV || 'development').trim().toLowerCase()
      !== 'production'

const source = './'

const dest = devBuild ? 'builds/development/' : 'builds/production/'

const images = {
  in: [`${source}assets/img/**/*`],
  out: `${dest}assets/img/`,
}

// Development task (runs client dev server and Express server concurrently)
gulp.task('dev', (cb) => {
  const clientProcess = spawn('pnpm', ['run', 'dev'], { cwd: 'frontend', stdio: 'inherit' })
  const serverProcess = spawn('nodemon', ['server/index.mjs'], { stdio: 'inherit' })

  // Handle process exits (important for graceful shutdown)
  clientProcess.on('exit', () => serverProcess.kill())
  serverProcess.on('exit', () => clientProcess.kill())

  cb() // Signal task completion
})

gulp.task('testTask', (cb) => {
  console.log('Test task executed successfully!')
  cb() // Signal task completion
})

// manage images
gulp.task('optimize-images', () => {
  return (
    gulp
      .src(images.in)
      .pipe(
        gulpSize({
          title: 'images in ',
        }),
      )
      .pipe(gulpNewer(images.out))
      .pipe(gulpPlumber())
      .pipe(
        gulpImage({
          optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
          pngquant: ['--speed=1', '--force', 256],
          zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
          jpegRecompress: ['--strip', '--quality', 'medium', '--loops', 15, '--min', 30, '--max', 60],
          mozjpeg: ['-optimize', '-progressive'],
          gifsicle: ['--optimize'],
          svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors'],
          quiet: true,
        }),
      )
      .pipe(
        gulpSize({
          title: 'images out ',
        }),
      )
      .pipe(gulp.dest(images.out))
  )
})

gulp.task('build', (cb) => {
  const clientProcess = spawn('pnpm', ['run', 'build'], { cwd: 'frontend', stdio: 'inherit' })
  clientProcess.on('exit', () => clientProcess.kill())
  cb()
})
