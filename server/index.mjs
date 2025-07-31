/* eslint-disable node/prefer-global/process */
import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import cors from 'cors'
import express from 'express'
import multer from 'multer'

const app = express()
app.use(cors())

const PORT = process.env.PORT || 5000

// Set up multer for file uploads (store in a temp folder)
const upload = multer({ dest: 'uploads/' })

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express api server..!' })
})

// POST /optimize-images
app.post('/optimize-images', upload.array('images'), async (req, res) => {
  try {
    // 1. Move uploaded files to assets/img (overwrite or create as needed)
    const assetsImgDir = path.join(process.cwd(), 'assets', 'img')
    if (!fs.existsSync(assetsImgDir))
      fs.mkdirSync(assetsImgDir, { recursive: true })

    // Move each uploaded file to assets/img
    for (const file of req.files) {
      const destPath = path.join(assetsImgDir, file.originalname)
      fs.renameSync(file.path, destPath)
    }

    // 2. Run the gulp optimize-images task
    exec('gulp optimize-images', async (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ success: false, error: stderr || error.message })
      }

      // 3. Read optimized images from builds/development/assets/img/
      const optimizedDir = path.join(process.cwd(), 'builds', 'development', 'assets', 'img')


      fs.readdir(optimizedDir, (err, files) => {
        if (err) {
          return res.status(500).json({ success: false, error: 'Could not read optimized images directory' })
        }

        // 4. Read each file as a buffer and send as base64
        const images = files.map((filename) => {
          const filePath = path.join(optimizedDir, filename)
          const buffer = fs.readFileSync(filePath)
          return {
            filename,
            data: buffer.toString('base64'),
          }
        })

        res.json({ success: true, images })
      })
    })
  }
  catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// Add this route to execute the 'testTask' gulp task
app.get('/run-test-task', (req, res) => {
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

app.get('/hello', (req, res) => {
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
