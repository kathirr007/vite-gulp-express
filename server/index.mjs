import { exec } from 'node:child_process'
import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors())
// eslint-disable-next-line node/prefer-global/process
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express api server..!' })
})

// Add this route to execute the 'testTask' gulp task
app.get('/api/run-test-task', (req, res) => {
  try {
    exec('gulp testTask', (error, stdout, stderr) => {
      if (error) {
        res.status(500).json({ success: false, error: stderr || error.message })
      }
      else {
        res.json({ success: true, output: stdout })
      }
    })
  }
  catch (error) {
    console.error('Error executing gulp task:', error)
    return res.status(500).json({ success: false, error: error.message })
  }
})

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express running successfully..!' })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

/* // Serve static files from the Vue frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')))

// Basic API endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express!' })
})

// Catch-all for all other requests to serve the Vue app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
}) */
