const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNum = document.getElementById('characterAmountNum')
const upperCase = document.getElementById('upperCase')
const numbers = document.getElementById('numbers')
const symbols= document.getElementById('symbols')
const form = document.getElementById('passwordGenerator')
const passDisplay = document.getElementById('password_display')

const UPPERCASE_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)

characterAmountNum.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)

form.addEventListener('submit', e => {
  e.preventDefault()
  const characterAmount = characterAmountNum.value
  const includeUppercase = upperCase.checked
  const includeNumbers = numbers.checked
  const includeSymbols = symbols.checked
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
  passDisplay.innerText = password
})

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
  let charCodes = LOWERCASE_CODES
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CODES)
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CODES)
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CODES)
  
  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  return passwordCharacters.join('')
}

function arrayFromLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array
}

function syncCharacterAmount(e) {
  const value = e.target.value
  characterAmountNum.value = value
  characterAmountRange.value = value
}