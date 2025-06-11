function isDateField(value: any): boolean {
  // Only accept strings that look like proper ISO date formats
  if (typeof value !== 'string') return false

  // Check for ISO 8601 date formats (YYYY-MM-DD, YYYY-MM-DDTHH:mm:ss, etc.)
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/

  if (!isoDateRegex.test(value)) return false

  // Additional validation: ensure it's actually a valid date
  const date = new Date(value)
  const datePart = value.split('T')[0]
  return !isNaN(date.getTime()) && !!datePart && date.toISOString().startsWith(datePart)
}

const value = '10000'

// Convert ISO date strings to Date objects for BetterAuth
if (isDateField(value)) {
  const date = new Date(value)
  console.log(date)
}

const testValues = [
  '10000', // numeric string (should be false)
  '2023-12-25', // valid ISO date (should be true)
  '2023-12-25T10:30:00Z', // valid ISO datetime (should be true)
  '2023-12-25T10:30:00.123Z', // valid ISO datetime with ms (should be true)
  'not a date', // invalid string (should be false)
  '2023/12/25', // wrong format (should be false)
  123456, // number (should be false)
]

console.log('Testing improved isDateField function:')
testValues.forEach((value) => {
  const result = isDateField(value)
  console.log(`isDateField(${JSON.stringify(value)}) = ${result}`)
  if (result) {
    console.log(`  -> converts to: ${new Date(value as string).toISOString()}`)
  }
})
