const grid = document.querySelector('.grid')
const ScoreBoard = document.querySelector('.score')
const livesLeft = document.querySelector('.lives')
const startButton = document.querySelector('.start')
const gameEndDisplay = document.querySelector('.gameover')
const timer = document.querySelector('.timer')
const highScoreDisplay = document.querySelector('.highScore')
const highScore = JSON.parse(localStorage.getItem('highScore')) || []
const modal = document.querySelector('#myModal')
const btn = document.querySelector('#myBtn')
const span = document.querySelector('.close')

const width = 9
const cells = []

let score = 0
let lives = 3
let frog = 76
let time = 20

const lilypads = [1, 4, 7]
const logsRight = [24, 23, 22, 20, 19, 18]
const logsLeft = [27, 28, 29, 31, 32, 34]
const yellowCar = [55, 58, 61]
const policeCar = [65, 68, 71]
const water = [0, 1, 3, 5, 7, 8, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
const grass = [9, 10, 11, 12, 13, 14, 15, 16, 17, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 72, 73, 74, 75, 76, 77, 78, 79, 80]
const roadYellow = [54, 55, 56, 57, 58, 59, 60, 61, 62]
const roadPolice = [63, 64, 65, 66, 67, 68, 69, 70, 71]

let moveLogLeftInterval
let moveLogRightInterval
let policeCarInterval
let yellowCarInterval
let lilypadInterval
let frogOnLog
let gainingPoints
let gameTimer

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

//          SETTING UP THE BOARD 
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

grass.forEach(grassTile => {
  cells[grassTile].classList.add('grass')
})

water.forEach(waterTile => {
  cells[waterTile].classList.add('water')
})

roadYellow.forEach(roadTile => {
  cells[roadTile].classList.add('roadYellow')
})

roadPolice.forEach(roadTile => {
  cells[roadTile].classList.add('roadPolice')
})

// ! Modal - open and close 
btn.addEventListener('click', () => {
  modal.style.display = 'block'
})

span.addEventListener('click', () => {
  modal.style.display = 'none'
})

window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = 'none'
  }
})

// ! Moving frog around the board
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

// ! Moving yellow car - to the right 

function moveLilypads() {
  lilypadInterval = setInterval(() => {
    lilypads.forEach((lilypad, i) => {
      if (lilypad === 0) {
        cells[lilypad].classList.remove('lilypad')
        lilypads[i] += 8
        cells[lilypad += 1].classList.add('lilypad')
      } else {
        cells[lilypad].classList.remove('lilypad')
        lilypads[i] -= 1
        cells[lilypad -= 1].classList.add('lilypad')
      }
    })
  }, 500)
}

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

// ! Moving the logs - to the right
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
    })
  }, 1000)
}

// ! Moving the logs - to the left 
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
    })
  }, 1000)
}

// ! Moving the frog when it is on the log. 
function frogLogMove() {
  frogOnLog = setInterval(() => {
    if (frog >= 27 && frog < 36 && cells[frog].classList.contains('log')) {
      cells[frog].classList.remove('frog')
      frog -= 1
      cells[frog].classList.add('frog')
    } else if (frog >= 18 && frog < 26 && cells[frog].classList.contains('log')) {
      cells[frog].classList.remove('frog')
      frog += 1
      cells[frog].classList.add('frog')
    }
  }, 999.5)
}

// Start Button event listener - starts all movement on the page
startButton.addEventListener('click', () => {
  if (startGame) {
    return
  }
  startGame = true

  // Starting game timer
  gameTimer = setInterval(() => {
    time = time -= 1
    timer.innerHTML = `Time left ${time}`
    if (time === 0) {
      clearInterval(gameTimer)
    }
  }, 1000)

  // Starting all functions
  carRight()
  carLeft()
  moveLilypads()
  moveLogRight()
  moveLogLeft()
  frogCrashDetection()
  gameOver()
  frogOnLilypad()
  frogLogMove()
})

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
      || cells[frog].classList.contains('yellowCar')
      || cells[frog].classList.contains('water') && !cells[frog].classList.contains('log') && !cells[frog].classList.contains('lilypad')) {
      console.log('frog dead')
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
  console.log(highScore)
}

function gameOver() {
  if (lives === 0 || time === 0) {
    startGame = false
    saveHighScore()
    gameDisplay(`GAME OVER! <br> You scored ${score} points!`, 3000)
    clearInterval(policeCarInterval)
    clearInterval(yellowCarInterval)
    clearInterval(lilypadInterval)
    clearInterval(moveLogLeftInterval)
    clearInterval(moveLogRightInterval)
    clearInterval(gainingPoints)
    clearInterval(frogOnLog)
    clearInterval(gameTimer)
    document.removeEventListener('keydown', event)

    score = 0
    lives = 3
    time = 20

    ScoreBoard.innerHTML = `${score}`
    livesLeft.innerHTML = `${lives}`
    resetFrog()

  }
}


