const supertest = require('supertest')
const { app } = require('../app/index')
const api = supertest(app)

const initialNotes = [
  {
    content: 'Primera Nota',
    important: true,
    date: new Date()
  },
  {
    content: 'Segunda nota',
    important: false,
    date: new Date()
  }
]

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

module.exports = {
  api,
  initialNotes,
  getAllContentFromNotes
}

// NO HE PASADO NADA
