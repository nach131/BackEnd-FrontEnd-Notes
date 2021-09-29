const mongoose = require('mongoose')

const connectioString = process.env.MONGO_DB_URI
// const connectioString = process.env.HOST_URI

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
