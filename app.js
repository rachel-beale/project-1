// const cells = Array.from(document.querySelectorAll('.cell'))
// const purple = Array.from(document.querySelectorAll('.purple'))
// console.log(purple)
// console.log(cells[1])

const grid = document.querySelector('.grid')
const width = 4
const cells = []
// let purple = []
// let red = []
// let blue = []

const candyTypes = ['purple', 'red', 'blue']



// creating the grid 
for (let i = 0; i < width ** 2; i++) {
  const tile = document.createElement('div')
  tile.classList.add('cell')
  grid.appendChild(tile)
  cells.push(tile)
}

// Creating the random grid 
cells.forEach((cell) => {
   const randomCandy = candyTypes[Math.floor(Math.random() * candyTypes.length)]
    console.log(randomCandy) 
  if (randomCandy === 'purple') {
cell.classList.add('purple')
  } else if (randomCandy === 'red') {
    cell.classList.add('red')
  } else { 
    cell.classList.add('blue')
  }

})



//   if (candyToAdd === 'purple') {
//     const purpleTile = cells[purple].classList.add('purple')
//   } else if (candyToAdd === 'red') {
//     const redTile = cells[red].classList.add('red')
//   } else {
//     const blueTile = cells[blue].classList.add('blue')
//   }


// console.log(candyToAdd)
// }
// randomGenerator()


// cells[purple].classList.add('purple')
// purple -= 1
// cells[purple].classList.add('purple')
// purple -= width
// cells[purple].classList.add('purple')
// purple -= 1
// cells[purple].classList.add('purple')
// purple -= 1
// cells[purple].classList.add('purple')

// cells[red].classList.add('red')
// red += 1
// cells[red].classList.add('red')
// red += width 
// cells[red].classList.add('red')
// red -= 1
// cells[red].classList.add('red')
// red += width
// cells[red].classList.add('red')


// cells[blue].classList.add('blue')
// blue += width
// cells[blue].classList.add('blue')
// blue -= 1
// cells[blue].classList.add('blue')
// blue += 1 
// cells[blue].classList.add('blue')
// blue -= width 
// cells[blue].classList.add('blue')
// blue += 1 
// cells[blue].classList.add('blue')
// blue += width
// cells[blue].classList.add('blue')