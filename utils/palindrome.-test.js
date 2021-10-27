const { palindrome } = require('./fot_testing')

test('palilndrome of nacho', () => {
  const result = palindrome('midudev')

  expect(result).toBe('vedudim')
})

test('palilndrome string vacio', () => {
  const result = palindrome('')

  expect(result).toBe('')
})

test('palilndrome undefined', () => {
  const result = palindrome()

  expect(result).toBeUndefind()
})
