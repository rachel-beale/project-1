const grid = document.querySelector('.grid')

const width = 5
const cells = []
const candyTypes = ['purple', 'red', 'blue']

// creating the grid 
for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  div.innerHTML = i
  cells.push(div)
}

let colours = []

// Creating the random grid 
cells.forEach((cell) => {
  const randomCandy = candyTypes[Math.floor(Math.random() * candyTypes.length)]
  colours.push((randomCandy))
  if (randomCandy === 'purple') {
    cell.classList.add('purple')
  } else if (randomCandy === 'red') {
    cell.classList.add('red')
  } else {
    cell.classList.add('blue')
  }
})

// let coloursArray = []
// console.log(colours)
// for (let i = 0; i < 5; i++) {
//   console.log(colours[i])
// coloursArray.push((colours[i]))

// }

// console.log(coloursArray)

// const purpler = ['purple', 'red', 'blue', 'purple', 'red', 'blue', 'purple', 'red', 'blue', 'purple', 'red', 'blue']
// function indexOfAll(arr, val) {
//   arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])
// }

// if (cells.classList.)

// Finding indexs of each colour 
function findAllIndexOf(arr, el) {
  return [].concat(...(function* () {
    for (let i = 0; i < arr.length; i++) if (arr[i] === el) yield [i];
  })());
}
blueArray = findAllIndexOf(colours, 'blue')
// console.log(redArray = findAllIndexOf(colours, 'red'))
// console.log(purpleArray = findAllIndexOf(colours, 'purple'))

colouringArray = [1, 2, 3, 4, 5, 4, 8, 6]
console.log(colouringArray)

function checkingARow(arr) {


  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1] === arr[i] + 1 && arr[i + 2] === arr[i] + 2) {
      console.log('yes')
    } else {
      console.log('error')
    }
  }
}

console.log(checkingARow([colouringArray]))
