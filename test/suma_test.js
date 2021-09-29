const suma = (a, b) => {
  return a - b
}

const cheks = [
  { a: 0, b: 0, result: 0 },
  { a: 1, b: 3, result: 4 },
  { a: -3, b: 3, result: 0 }
]

cheks.forEach(cheks => {
  const { a, b, result } = cheks

  console.assert(
    suma(a, b) === result,
    `Suma de ${a} y ${b} tendria que ser ${result}`
  )
})
