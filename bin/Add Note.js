const { model, Schema } = require('mongoose')
const mongoose = require('mongoose')

// const connectioString = process.env.MONGO_DB_URI
const connectioString = 'mongodb://localhost:27017/notesMidudev'

// conexion mongodb
mongoose.connect(connectioString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('Esta conectado')
  }).catch(err => {
    console.log(err)
  })

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Nombre del modelo en singular
const Note = model('Note', noteSchema)

const note = new Note({
  content: 'Esta esta en local',
  date: new Date(),
  important: true
})

note.save()
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  })
  .catch(err => {
    console.error(err)
  })

// en la consola node Add Note.js
