import childProcess from 'node:child_process'
import gulp from 'gulp'

// Development task (runs client dev server and Express server concurrently)
gulp.task('dev', (cb) => {
  const clientProcess = childProcess.spawn('npm', ['run', 'dev'], { cwd: 'frontend', stdio: 'inherit' })
  const serverProcess = childProcess.spawn('nodemon', ['server/index.js'], { stdio: 'inherit' })

  // Handle process exits (important for graceful shutdown)
  clientProcess.on('exit', () => serverProcess.kill())
  serverProcess.on('exit', () => clientProcess.kill())

  cb() // Signal task completion
})

gulp.task('build', (cb) => {
  const clientProcess = childProcess.spawn('npm', ['run', 'build'], { cwd: 'client', stdio: 'inherit' })
  clientProcess.on('exit', cb)
})
