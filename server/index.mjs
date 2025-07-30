import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import express from 'express'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const app = express()
app.use(cors())
const PORT = process.env.PORT || 5000

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
