const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')

app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3001

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: false
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.get('/', (req, res) => {
  res.send('<h1>hola q ases</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.send('No existe este id')
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  // res.json(id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  // notes = notes.concat(newNote)
  notes = [...notes, newNote]

  res.status(201).json(newNote)
})

app.use((req, res) => {
  const ruta = req.path
  res.status(404).json({
    error: 'Not found',
    ruta
  })
})
app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')))

app.listen(PORT, console.log(`Server is starting at ${PORT}`))
