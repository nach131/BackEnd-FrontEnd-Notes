require('dotenv').config()
require('../mongo')
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')

const Note = require('../models/Note')
const handleError = require('../middleware/handleError')
const notFound = require('../middleware/notFound')

const usersRouter = require('../controllers/users')

app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 8090

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'))
// }
app.use(express.static('client/build'))

app.get('/', (req, res) => {
  res.send('<h1>hola q ases</h1>')
})

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params

  Note.findById(id).then(note => {
    if (note) {
      return res.json(note)
    } else {
      return res.send('No existe este id')
    }
  }).catch(err => {
    next(err)
  })
})
app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  const note = req.body

  const NewNoteInfo = {
    content: note.content,
    important: note.important
  }
  Note.findByIdAndUpdate(id, NewNoteInfo, { new: true })
    .then(result => {
      res.json(result)
    })
})

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  Note.findByIdAndRemove(id).then(result => {
    res.status(204).end()
  }).catch(error => next(error))
  res.status(204).end()
})

app.post('/api/notes', async (req, res, next) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = Note({
    content: note.content,
    date: new Date(),
    important: typeof note.important !== 'undefined' ? note.important : false
  })

  // newNote.save().then(savedNote => {
  //   res.json(savedNote)
  // })
  try {
    const savedNote = await newNote.save()
    res.json(savedNote)
  } catch (error) {
    next(error)
  }
})

app.use('/api/users', usersRouter)

app.use(notFound)

app.use(handleError)

app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')))

const server = app.listen(PORT, () => {
  console.log(`Server is starting at ${PORT}`)
})

module.exports = { app, server }
