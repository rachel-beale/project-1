const grid = document.querySelector('.grid')

const width = 9
const cells = []
let frog = 76
const lilypads = [2, 4, 6]
const water = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
const logsRight = [24, 23, 22, 20, 19, 18]
const logsLeft = [27, 28, 29, 31, 32, 34]
const yellowCar = [55, 58, 61]
const policeCar = [65, 68, 71]

// Creating the game grid
for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  div.innerHTML = i
  cells.push(div)
}

// Starting placement of grid element
cells[frog].classList.add('frog')

lilypads.forEach(lilypad => {
  cells[lilypad].classList.add('lilypad')
})
yellowCar.forEach(yellowCarTile => {
  cells[yellowCarTile].classList.add('yellowCar')
})
policeCar.forEach(policeCarTile => {
  cells[policeCarTile].classList.add('policeCar')
})
logsRight.forEach(log => {
  cells[log].classList.add('log')
})
logsLeft.forEach(log => {
  cells[log].classList.add('log')
})

// Moving frog around the board
document.addEventListener('keydown', (event) => {
  const key = event.key
  if (key === 'ArrowUp' && !(frog < width)) {
    cells[frog].classList.remove('frog')
    frog -= width
    cells[frog].classList.add('frog')
  } else if (key === 'ArrowDown' && !(frog > (width ** 2) - width - 1)) {
    cells[frog].classList.remove('frog')
    frog += width
    cells[frog].classList.add('frog')
  } else if (key === 'ArrowLeft' && !(frog % width === 0)) {
    cells[frog].classList.remove('frog')
    frog -= 1
    cells[frog].classList.add('frog')
  } else if (key === 'ArrowRight' && !(frog % width === width - 1)) {
    cells[frog].classList.remove('frog')
    frog += 1
    cells[frog].classList.add('frog')
  }
})

// Moving yellow car - to the right 
function carRight() {
  yellowCar.forEach(carRight => {
    setInterval(() => {
      if (cells[carRight] === cells[62]) {
        clearInterval
        cells[carRight].classList.remove('yellowCar')
        carRight -= 9
      } else {
        cells[carRight].classList.remove('yellowCar')
        carRight += 1
        cells[carRight].classList.add('yellowCar')
      }
    }, 1000)
  })
}
carRight()

// Moving police car - to the left
function carLeft() {
  policeCar.forEach(carLeft => {
    setInterval(() => {
      if (cells[carLeft] === cells[63]) {
        clearInterval
        cells[carLeft].classList.remove('policeCar')
        carLeft += 9
      } else {
        cells[carLeft].classList.remove('policeCar')
        carLeft -= 1
        cells[carLeft].classList.add('policeCar')
      }
    }, 1000)
  })
}
carLeft()

// Moving the logs - to the right 
function moveLogRight() {
  logsRight.forEach(log => {
    setInterval(() => {
      if (cells[log] === cells[26]) {
        clearInterval
        cells[log].classList.remove('log')
        log -= 9
      } else {
        cells[log].classList.remove('log')
        log += 1
        cells[log].classList.add('log')
      }
    }, 500)
  })
}
moveLogRight()

// Moving the logs - to the left 
function moveLogLeft() {
  logsLeft.forEach(log => {
    setInterval(() => {
      if (cells[log] === cells[27]) {
        clearInterval
        cells[log].classList.remove('log')
        log += 9
      } else {
        cells[log].classList.remove('log')
        log -= 1
        cells[log].classList.add('log')
      }
    }, 500)
  })
}
moveLogLeft()