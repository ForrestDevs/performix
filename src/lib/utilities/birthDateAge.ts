export function getAgeFromBirthDate(birthDate: string) {
  const today = new Date()
  const birthDateObj = new Date(birthDate)
  const age = today.getFullYear() - birthDateObj.getFullYear()
  return age
}
