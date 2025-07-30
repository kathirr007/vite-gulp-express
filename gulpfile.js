import spawn from 'cross-spawn'
import gulp from 'gulp'

// Development task (runs client dev server and Express server concurrently)
gulp.task('dev', (cb) => {
  const clientProcess = spawn('pnpm', ['run', 'dev'], { cwd: 'frontend', stdio: 'inherit' })
  const serverProcess = spawn('nodemon', ['server/index.mjs'], { stdio: 'inherit' })

  // Handle process exits (important for graceful shutdown)
  clientProcess.on('exit', () => serverProcess.kill())
  serverProcess.on('exit', () => clientProcess.kill())

  cb() // Signal task completion
})

gulp.task('build', (cb) => {
  const clientProcess = spawn('pnpm', ['run', 'build'], { cwd: 'frontend', stdio: 'inherit' })
  clientProcess.on('exit', () => clientProcess.kill())
  cb()
})
