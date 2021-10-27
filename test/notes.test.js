const mongoose = require('mongoose')
const { server } = require('../app/index')

const Note = require('../models/Note')
const { api, initialNotes, getAllContentFromNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  // // Anadiendo una a una
  // const note1 = new Note(initialNotes[0])
  // await note1.save()
  // const note2 = new Note(initialNotes[1])
  // await note2.save()

  // PARAELO
  // const notesObjects = initialNotes.map(note => new Note(note))
  // const promesas = notesObjects.map(note => note.save())
  // await Promise.all(promesas)

  // SECUENCIAL
  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

test('notas devuelven json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Hay dos notas', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('Comprueba la primera nota', async () => {
  const { contents } = await getAllContentFromNotes()

  expect(contents).toContain('Primera Nota')
})

test('Validad nota add', async () => {
  const newNote = {
    content: 'Cuerpo de la nota',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // pasasr esto al helper
  const { contents, response } = await getAllContentFromNotes()

  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(contents).toContain(newNote.content)
})

test('nota sin contenido añadido', async () => {
  const newNote = {
    important: true
  }
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(initialNotes.length)
})

test('Nota borrada', async () => {
  const { response: firstResponse } = await getAllContentFromNotes()
  const { body: notes } = firstResponse
  const noteToDelete = notes[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const { contents, response: secondResponse } = await getAllContentFromNotes()

  expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
  expect(contents).not.toContain(noteToDelete.content)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})

// EJECUTAR SOLO UN TEST
// npm run test --  -t "Hay dos notas"
