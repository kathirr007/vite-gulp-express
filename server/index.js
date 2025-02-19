import express from 'express'

const app = express()
const port = 5000 // Choose your port

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express running successfully..!' })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
