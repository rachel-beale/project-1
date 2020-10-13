const grid = document.querySelector('.grid')
const ScoreBoard = document.querySelector('.score')
const livesLeft = document.querySelector('.lives')
const startButton = document.querySelector('.start')

const width = 9
const cells = []

let score = 0
let lives = 3
let frog = 76

const lilypads = [2, 4, 6]
const logsRight = [24, 23, 22, 20, 19, 18]
const logsLeft = [27, 28, 29, 31, 32, 34]
const yellowCar = [55, 58, 61]
const policeCar = [65, 68, 71]
const grass = [9, 10, 11, 12, 13, 14, 15, 16, 17, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 72, 73, 74, 75, 76, 77, 78, 79, 80]
const roadYellow = [54, 55, 56, 57, 58, 59, 60, 61, 62]
const roadPolice = [63, 64, 65, 66, 67, 68, 69, 70, 71]

let moveLogLeftInterval
let moveLogRightInterval
let policeCarInterval
let yellowCarInterval
let logLeftFrog

let startGame = false
// const endGame = true

// ! Creating the game grid
for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  div.innerHTML = i
  cells.push(div)
}

// ! Starting placement of grid element
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

grass.forEach((grassTile => {
  cells[grassTile].classList.add('grass')
}))

roadYellow.forEach(roadTile => {
  cells[roadTile].classList.add('roadYellow')
})

roadPolice.forEach(roadTile => {
  cells[roadTile].classList.add('roadPolice')
})

// ! Moving frog around the board
function frogMovement() {
  document.addEventListener('keydown', (event) => {
    if (!startGame) {
      return
    } else {
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
    }
    gameOver()
  })
}
console.log(startGame)

// ! Moving yellow car - to the right 
function carRight() {
  yellowCarInterval = setInterval(() => {
    yellowCar.forEach((carRightMove, i) => {
      if (carRightMove === 62) {
        cells[carRightMove].classList.remove('yellowCar')
        yellowCar[i] -= 8
        cells[carRightMove -= 8].classList.add('yellowCar')
      } else {
        cells[carRightMove].classList.remove('yellowCar')
        yellowCar[i] += 1
        cells[carRightMove += 1].classList.add('yellowCar')
      }
    })
  }, 800)
}

// ! Moving police car - to the left
function carLeft() {
  policeCarInterval = setInterval(() => {
    policeCar.forEach((carLeftMove, i) => {
      if (carLeftMove === 63) {
        cells[carLeftMove].classList.remove('policeCar')
        policeCar[i] += 8
        cells[carLeftMove += 8].classList.add('policeCar')
      } else {
        cells[carLeftMove].classList.remove('policeCar')
        policeCar[i] -= 1
        cells[carLeftMove -= 1].classList.add('policeCar')
      }
    })
  }, 1000)
}

// ! Moving the logs - to the right - with the frog
function moveLogRight() {
  moveLogRightInterval = setInterval(() => {
    logsRight.forEach((log, i) => {
      if (log === 26) {
        cells[log].classList.remove('log')
        logsRight[i] -= 8
        cells[log -= 8].classList.add('log')
      } else {
        cells[log].classList.remove('log')
        logsRight[i] += 1
        cells[log += 1].classList.add('log')
      }

      // }, 600)
      // setInterval(() => {
      //   if (frog >= 18 && frog < 26 && cells[frog].classList.contains('log')) {

      //     cells[frog].classList.remove('frog')
      //     frog += 1
      //     cells[frog].classList.add('frog')
      //   }

    })
  }, 599.8)
}


// ! Moving the logs - to the left - with the frog 
function moveLogLeft() {
  moveLogLeftInterval = setInterval(() => {
    logsLeft.forEach((log, i) => {
      if (log === 27) {
        cells[log].classList.remove('log')
        logsLeft[i] += 8
        cells[log += 8].classList.add('log')
      } else {
        cells[log].classList.remove('log')
        logsLeft[i] -= 1
        cells[log -= 1].classList.add('log')
      }
    }, 500)
    logLeftFrog = setInterval(() => {
      if (frog >= 27 && frog < 36 && cells[frog].classList.contains('log')) {
        cells[frog].classList.remove('frog')
        frog -= 1
        cells[frog].classList.add('frog')
      }
    })
  }, 499.5)
}



// Start Button event listener - starts all movement on the page
startButton.addEventListener('click', () => {
  if (startGame) {
    return
  }
  startGame = true
  frogMovement()
  carRight()
  carLeft()
  moveLogRight()
  moveLogLeft()
  frogCrashDetection()
  gameOver()
  frogOnLilypad()
})

// console.log(gameRunning)

// Reset the frog to the starting point
function resetFrog() {
  cells[frog].classList.remove('frog')
  frog = 76
  cells[frog].classList.add('frog')
  frogCrashDetection()
}

// Car crash detection 
function frogCrashDetection() {
  const frogCarCrash = setInterval(() => {
    if (cells[frog].classList.contains('policeCar')
      || cells[frog].classList.contains('yellowCar')) {
      const newLives = lives -= 1
      livesLeft.innerHTML = newLives
      clearInterval(frogCarCrash)
      resetFrog()
    }
  }, 300)
}

// Gain points - reaching a lilypad 
function frogOnLilypad() {
  lilypads.forEach(lilypad => {
    if (cells[lilypad].classList.contains('frog')) {
      // cells[frog].classList.remove('frog')
      // frog = 76
      console.log('working')
      // cells[frog].classList.add('frog')
      const newScore = score += 1
      ScoreBoard.innerHTML = newScore
      // frogOnLilypad()
    } else {
      console.log('testing')
    }
  })
}

console.log(lilypads)
function gameOver() {
  if (lives === 0) {
    console.log('dead')
    startGame = false
    clearInterval(policeCarInterval)
    clearInterval(yellowCarInterval)
    clearInterval(moveLogLeftInterval)
    clearInterval(moveLogRightInterval)

    score = 0
    lives = 3

    ScoreBoard.innerHTML = `${score}`
    livesLeft.innerHTML = `${lives}`
    resetFrog()

    // cells[frog].classList.remove('frog')
    // frog = 76
    // cells[frog].classList.add('frog')

  }
}


