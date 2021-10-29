const uniqueValidator = require('mongoose-unique-validator')
const { model, Schema } = require('mongoose')

//Decimos que username sea un valor unico
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    // Que no devuelve el Password
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

//Aplicamos el uniqueValidator al schema
userSchema.plugin(uniqueValidator)

module.exports = User
