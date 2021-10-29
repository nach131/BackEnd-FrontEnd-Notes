const mongoose = require('mongoose')
const { server } = require('../app/index')

const bcrypt = require('bcrypt')
const User = require('../models/User')
const { api } = require('./helpers')

describe('Crear nuevo Usuario', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ username: 'pedro', passwordHash })

    await user.save()
  })

  test('Crear un usuario que no existe', async () => {
    const usersDB = await User.find({})
    const usersAtStart = usersDB.map(user => user.toJSON())

    const newUser = {
      username: 'pablo',
      name: 'Pablo',
      password: '12345'
    }

    // Se crea el nuevo usuario
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Buscar todos los suarios de la BD
    const usersDBAfter = await User.find({})
    const usersAtEnd = usersDBAfter.map(user => user.toJSON())
    // Compronamos que se ha añadido uno
    expect(usersAtEnd).toHaveLenght(usersAtStart.length + 1)

    // comprobamos que el nuevo usuario es el que se ha añadido
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
})
