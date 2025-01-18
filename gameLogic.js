const enemy = document.querySelector('.enemy');
const playerHealthBar = document.getElementById('player-health');
const enemyHealthBar = document.getElementById('enemy-health');
const timerElement = document.getElementById('timer');

// Health and timer variables
let playerHealth = 100;
let enemyHealth = 100;
let gameTimer = 60;

// Timer logic
function startTimer() {
  const timerInterval = setInterval(() => {
    if (gameTimer > 0) {
      gameTimer--;
      timerElement.textContent = gameTimer;
    } else {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// End game logic
function endGame() {
  alert('Time’s up! The game is over.');
}

// Collision logic
function checkCollision() {
  const hitbox = document.querySelector('.hitbox');
  const playerRect = hitbox.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();

  if (
    playerRect.right >= enemyRect.left &&
    playerRect.left <= enemyRect.right &&
    playerRect.bottom >= enemyRect.top &&
    playerRect.top <= enemyRect.bottom
  ) {
    // Decrease enemy health
    enemyHealth -= 10;
    if (enemyHealth < 0) enemyHealth = 0;

    // Update health bar
    enemyHealthBar.style.width = `${enemyHealth}%`;

    // Check if enemy health is 0, then display the win message
    if (enemyHealth === 0) {
      alert('You Win!');
      // Automatically refresh the page after the alert
      location.reload(); 
    }
  }
}

// Start the game timer
startTimer();
