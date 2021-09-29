module.exports = (error, req, res) => {
  // const ruta = req.path
  console.error(error)
  if (error.name === 'CastError') {
    res.status(400).send({ error: 'esta mal el id' })
  } else {
    res.status(500).end()
  }
}
