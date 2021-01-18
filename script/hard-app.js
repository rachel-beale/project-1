const grid = document.querySelector('.grid')
const ScoreBoard = document.querySelector('.score')
const livesLeft = document.querySelector('.lives')
const startButton = document.querySelector('.start')
const gameEndDisplay = document.querySelector('.gameover')
const timer = document.querySelector('.timer')
const modal = document.querySelector('#myModal')
const btn = document.querySelector('#myBtn')
const span = document.querySelector('.close')

const highScoreDisplay = document.querySelector('.highScore')
const highScore = JSON.parse(localStorage.getItem('highScore')) || []

const width = 9
const cells = []

let score = 0
let lives = 3
let frog = 76
let time = 20

const lilypads = [2, 6]
const logsRight = [20, 19, 25, 24]
const logsLeft = [29, 30, 32, 33]
let snake = [43]
const bike = [47, 50, 53]
const policeCar = [55, 58, 61]
const yellowCar = [65, 68, 71]
const water = [0, 1, 3, 5, 7, 8, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
const grass = [9, 10, 11, 12, 13, 14, 15, 16, 17, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 72, 73, 74, 75, 76, 77, 78, 79, 80]
const roadTop = [45, 46, 47, 48, 49, 50, 51, 52, 53]
const roadMiddle = [54, 55, 56, 57, 58, 59, 60, 61, 62]
const roadBottom = [63, 64, 65, 66, 67, 68, 69, 70, 71]

let moveLogLeftInterval
let moveLogRightInterval
let bikeInterval
let policeCarInterval
let yellowCarInterval
let lilypadInterval
let frogOnLog
let gainingPoints
let gameTimer
let snakeInterval

let gameRunning = false

// ! Creating the game grid
for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  // div.innerHTML = i
  cells.push(div)
}

// GAME RENDERING - function 
function renderGame() {
  cells.forEach(cell => {
    cell.classList.remove('frog')
    cell.classList.remove('yellowCar')
    cell.classList.remove('policeCar')
    cell.classList.remove('log')
    cell.classList.remove('bike')
    cell.classList.remove('lilypad')
  })
  cells[frog].classList.add('frog')
  yellowCar.forEach(yellowCarTile => {
    cells[yellowCarTile].classList.add('yellowCar')
  })
  policeCar.forEach(policeCarTile => {
    cells[policeCarTile].classList.add('policeCar')
  })
  logsRight.forEach(logTile => {
    cells[logTile].classList.add('log')
  })
  logsLeft.forEach(logTile => {
    cells[logTile].classList.add('log')
  })
  bike.forEach(bikeTile => {
    cells[bikeTile].classList.add('bike')
  })
  lilypads.forEach(lilypadTile => {
    cells[lilypadTile].classList.add('lilypad')
  })
}

//          SETTING UP THE BOARD 
// ! Starting placement of grid element - none moving elements that are not in the renderGame function 
renderGame()

grass.forEach(grassTile => {
  cells[grassTile].classList.add('grass')
})
water.forEach(waterTile => {
  cells[waterTile].classList.add('water')
})
roadTop.forEach(roadTile => {
  cells[roadTile].classList.add('roadTop')
})
roadMiddle.forEach(roadTile => {
  cells[roadTile].classList.add('roadMiddle')
})
roadBottom.forEach(roadTile => {
  cells[roadTile].classList.add('roadBottom')
})

// ! Moving frog around the board
document.addEventListener('keydown', (event) => {
  if (!gameRunning) {
    return
  } else {
    const key = event.key
    if (key === 'ArrowUp' && !(frog < width)) {
      frog -= width
    } else if (key === 'ArrowDown' && !(frog > (width ** 2) - width - 1)) {
      frog += width
    } else if (key === 'ArrowLeft' && !(frog % width === 0)) {
      frog -= 1
    } else if (key === 'ArrowRight' && !(frog % width === width - 1)) {
      frog += 1
    }
  }
  renderGame()
  gameOver()
})

// ! Moving the lilypads
function moveLilypads() {
  lilypadInterval = setInterval(() => {
    lilypads.forEach((lilypad, i) => {
      if (lilypad === 0) {
        lilypads[i] += 8
      } else {
        lilypads[i] -= 1
      }
    })
    renderGame()
  }, 500)
}

// ! Moving bike - to the left
function bikeLeft() {
  bikeInterval = setInterval(() => {
    bike.forEach((bikeLeft, i) => {
      if (bikeLeft === 53) {
        bike[i] -= 8
      } else {
        bike[i] += 1
      }
    })
  }, 500)
}


//  ! Idea for a movement function - would mean do not need individual functions to move traffic & logs etc. 
// Movement Function
function movement(callIntervalName, cellArray, rowEnd, rowSize, numMove, time) {
  callIntervalName = setInterval(() => {
    cellArray.forEach((cellIndividual, i) => {
      if (cellIndividual === rowEnd) {
        cellArray[i] += rowSize
      } else {
        cellArray[i] -= numMove
      }
    })
    renderGame()
  }, time)
}

// ! Moving police car - to the right 
// function carRight() {
//   policeCarInterval = setInterval(() => {
//     policeCar.forEach((carRightMove, i) => {
//       if (carRightMove === 54) {
//         policeCar[i] += 8
//       } else {
//         policeCar[i] -= 1
//       }
//     })
//     renderGame()
//   }, 600)
// }

// ! Moving yellow car - to the left
function carLeft() {
  yellowCarInterval = setInterval(() => {
    yellowCar.forEach((carLeftMove, i) => {
      if (carLeftMove === 71) {
        yellowCar[i] -= 8
      } else {
        yellowCar[i] += 1
      }
    })
    renderGame()
  }, 700)
}

// ! Moving the logs - to the right
function moveLogRight() {
  moveLogRightInterval = setInterval(() => {
    logsRight.forEach((log, i) => {
      if (log === 26) {
        logsRight[i] -= 8
      } else {
        logsRight[i] += 1
      }
    })
    renderGame()
  }, 1000)
}

// ! Moving the logs - to the left 
function moveLogLeft() {
  moveLogLeftInterval = setInterval(() => {
    logsLeft.forEach((log, i) => {
      if (log === 27) {
        logsLeft[i] += 8
      } else {
        logsLeft[i] -= 1
      }
    })
    renderGame()
  }, 1000)
}

// ! Moving the frog when it is on the log. 
function frogLogMove() {
  frogOnLog = setInterval(() => {
    if (frog >= 27 && frog < 36 && cells[frog].classList.contains('log')) {
      frog -= 1
    } else if (frog >= 18 && frog < 26 && cells[frog].classList.contains('log')) {
      frog += 1
    }
    renderGame()
  }, 999.5)
}

// ! Function to make the snake randomly appear
function randomSnake() {
  snakeInterval = setInterval(() => {
    cells[snake].classList.remove('snake')
    snake = grass[Math.floor(Math.random() * grass.length)]
    cells[snake].classList.add('snake')
  }, 5000)
}

// Start Button event listener - starts all movement on the page
startButton.addEventListener('click', () => {
  if (gameRunning) {
    return
  }
  gameRunning = true

  // Starting game timer - inside the start button function 
  gameTimer = setInterval(() => {
    time = time -= 1
    timer.innerHTML = `Time left ${time}`
    if (time === 0) {
      clearInterval(gameTimer)
    }
  }, 1000)

  // Starting all functions to get the game moving, detect crashes & movement
  bikeLeft()
  // carRight()
  movement(policeCarInterval, policeCar, 54, 8, 1, 600)
  carLeft()
  moveLogRight()
  moveLogLeft()
  frogCrashDetection()
  gameOver()
  frogOnLilypad()
  frogLogMove()
  moveLilypads()
  randomSnake()
})

// Reset the frog to the starting point
function resetFrog() {
  frog = 76
  frogCrashDetection()
  renderGame()
}

// Car crash detection 
function frogCrashDetection() {
  const frogCarCrash = setInterval(() => {
    if (cells[frog].classList.contains('policeCar')
      || cells[frog].classList.contains('yellowCar')
      || cells[frog].classList.contains('bike')
      || cells[frog].classList.contains('water') && !cells[frog].classList.contains('log') && !cells[frog].classList.contains('lilypad')) {
      const newLives = lives -= 1
      livesLeft.innerHTML = newLives
      clearInterval(frogCarCrash)
      resetFrog()
    }
  }, 300)
}

// Gain points - reaching a lilypad 
function frogOnLilypad() {
  gainingPoints = setInterval(() => {
    if (cells[frog].classList.contains('lilypad')) {
      cells[frog].classList.remove('frog')
      frog = 76
      cells[frog].classList.add('frog')
      const scoring = score += 1
      ScoreBoard.innerHTML = `${scoring}`
      frogOnLilypad()
    }
  }, 300)
}

// Message at the end of the game 
function gameDisplay(message, delay) {
  gameEndDisplay.style.display = 'block'
  gameEndDisplay.innerHTML = message
  setTimeout(() => {
    gameEndDisplay.style.display = 'none'
  }, delay)
}

// Local Storage  
function saveHighScore() {
  highScore.push(score)
  highScore.sort((a, b) => b.score = a.score)
  highScore.splice(1)
  highScoreDisplay.innerHTML = `Score to beat ${highScore}`
}

// Game Over Function 
// Clears all the intervals, resets score, lives & time 
function gameOver() {
  if (lives === 0 || time === 0 || cells[frog].classList.contains('snake')) {
    gameRunning = false
    saveHighScore()
    gameDisplay(`GAME OVER! <br> You scored ${score} points!`, 3000)
    clearInterval(policeCarInterval)
    clearInterval(yellowCarInterval)
    clearInterval(bikeInterval)
    clearInterval(lilypadInterval)
    clearInterval(moveLogLeftInterval)
    clearInterval(moveLogRightInterval)
    clearInterval(gainingPoints)
    clearInterval(frogOnLog)
    clearInterval(gameTimer)
    clearInterval(snakeInterval)
    document.removeEventListener('keydown', event)

    score = 0
    lives = 3
    time = 20

    ScoreBoard.innerHTML = `${score}`
    livesLeft.innerHTML = `${lives}`
    resetFrog()
  }
}

// ! Modal box - open and close 
btn.addEventListener('click', () => {
  modal.style.display = 'block'
})
span.addEventListener('click', () => {
  modal.style.display = 'none'
})
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none'
  }
})






