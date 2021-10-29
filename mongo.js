const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectioString = process.env.MONGO_DB_URI

// const connectioString = NODE_ENV === 'test'
//   ? MONGO_DB_URI_TEST
//   : MONGO_DB_URI

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
