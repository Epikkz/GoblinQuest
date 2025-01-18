// If 'player' is already declared in another script, use this:
const player = document.querySelector('.player');

// Define local paths for images
const playerIdleImage = './assets/Goblin/Idle.png'; // Idle image
const playerMoveImage = './assets/Goblin/walking.gif'; // Walking animation (GIF)
const attackImages = [
  './assets/Goblin/Punching.png',
  './assets/Goblin/Kicking.png',
  './assets/Goblin/punching2.png',
  './assets/Goblin/kick2.png',
]; // Attack images
const jumpImage = './assets/Goblin/jumping.png'; // Jump image

// Set initial state
let isMoving = false;
let attackIndex = 0; // To cycle through attack images
let jumpTimeout; // Timeout for resetting to idle after jumping
let attackTimeout; // Timeout for resetting attack index
let isAttacking = false; // Flag to prevent holding the 'J' key
player.style.backgroundImage = `url(${playerIdleImage})`;
player.style.backgroundSize = 'cover'; // Ensure image fits

// Load sound effect for attack
const attackSound = new Audio('./assets/sound/woosh.mp3'); // Add your sound file here

// Function to reset to idle
function resetToIdle() {
  player.style.backgroundImage = `url(${playerIdleImage})`;
}

// Event listeners for movement
document.addEventListener('keydown', (event) => {
  // Handle movement (A, D)
  if ((event.key === 'a' || event.key === 'd') && !isMoving) {
    isMoving = true;
    player.style.backgroundImage = `url(${playerMoveImage})`;
  }

  // Handle attack (J)
  if (event.key === 'j' && !isAttacking) {
    isAttacking = true; // Set the flag to prevent holding 'J'
    player.style.backgroundImage = `url(${attackImages[attackIndex]})`;
    attackIndex = (attackIndex + 1) % attackImages.length; // Cycle through attack images

    // Play attack sound effect
    attackSound.currentTime = 0; // Reset sound to start for overlapping presses
    attackSound.play();

    // Reset attackIndex to the first image if no 'J' is pressed within 2 seconds
    clearTimeout(attackTimeout); // Clear any existing timeout
    attackTimeout = setTimeout(() => {
      attackIndex = 0; // Reset to the first attack image
      resetToIdle(); // Return to idle animation
    }, 500);
  }

  // Handle jump (W)
  if (event.key === 'w') {
    player.style.backgroundImage = `url(${jumpImage})`;

    // Clear existing timeout to avoid resetting idle too early
    clearTimeout(jumpTimeout);

    // Reset to idle after 2 seconds
    jumpTimeout = setTimeout(() => {
      resetToIdle();
    }, 500);

    // Simulate jump animation
    player.classList.add('jumping'); // Add a CSS class for jump effect
    setTimeout(() => {
      player.classList.remove('jumping'); // Remove jump class after animation
    }, 500); // Adjust time to match the jump duration
  }
});

// Handle keyup events to reset movement and allow attack again
document.addEventListener('keyup', (event) => {
  if (event.key === 'a' || event.key === 'd') {
    isMoving = false;
    resetToIdle();
  }

  // Allow attacking again when 'J' is released
  if (event.key === 'j') {
    isAttacking = false;
  }
});
