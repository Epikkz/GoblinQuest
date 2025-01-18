// Reference the existing 'player' variable (assumes it's declared in animate.js)
const hitbox = document.querySelector('.hitbox');

// Player movement variables
const playerSpeed = 1.5;
const jumpHeight = 100;
let isJumping = false;
let isFalling = false;
let isJumpingOrFalling = false; // New flag to block movement while jumping/falling
let playerY = 0; // Player's vertical position (jumping)

// Set initial position
let playerX = 50; // Player's horizontal position
player.style.left = `${playerX}px`;

// Key states
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  j: false, // Track J key state to prevent holding attack
};

// Movement and jump logic
function movePlayer() {
  // Only allow left/right movement if not jumping or falling
  if (!isJumpingOrFalling) {
    // Move left
    if (keys.a) {
      playerX = Math.max(0, playerX - playerSpeed);
    }
    // Move right
    if (keys.d) {
      // Ensure the player moves to the right edge without overflowing
      const containerWidth = document.querySelector('.game-container').offsetWidth;
      playerX = Math.min(containerWidth - player.offsetWidth, playerX + playerSpeed); // Limit player to container width
    }
  }

  // Jump (if not already jumping or falling)
  if (keys.w && !isJumping && !isFalling) {
    isJumping = true;
    isJumpingOrFalling = true; // Block movement during jump
    const jumpInterval = setInterval(() => {
      if (playerY < jumpHeight) {
        playerY += 8;
        player.style.bottom = `${playerY}px`;
      } else {
        clearInterval(jumpInterval);
        isJumping = false;
        isFalling = true;
      }
    }, 20);
  }

  // Fall back down
  if (isFalling) {
    const fallInterval = setInterval(() => {
      if (playerY > 0) {
        playerY -= 2;
        player.style.bottom = `${playerY}px`;
      } else {
        clearInterval(fallInterval);
        isFalling = false;
        isJumpingOrFalling = false; // Allow movement again after falling
      }
    }, 20);
  }

  // Update player's position
  player.style.left = `${playerX}px`;

  requestAnimationFrame(movePlayer);
}

// Start moving the player
movePlayer();

// Handle keydown events
document.addEventListener('keydown', (e) => {
  // Prevent attacking while jumping or falling
  if (e.key.toLowerCase() === 'j' && !isJumping && !isFalling && !keys.j) {
    keys.j = true; // Mark the J key as pressed
    attack();
  }

  if (keys.hasOwnProperty(e.key.toLowerCase())) {
    // Block A, S, D if jumping or falling
    if (isJumpingOrFalling && (e.key === 'a' || e.key === 's' || e.key === 'd')) {
      return;
    }

    keys[e.key.toLowerCase()] = true;
  }
});

// Handle keyup events
document.addEventListener('keyup', (e) => {
  if (keys.hasOwnProperty(e.key.toLowerCase())) {
    keys[e.key.toLowerCase()] = false;
  }

  // Reset the attack flag when J is released
  if (e.key.toLowerCase() === 'j') {
    keys.j = false;
  }
});

// Attack logic
function attack() {
  // Display hitbox
  hitbox.style.left = `${playerX + 50}px`;
  hitbox.style.bottom = '0';
  hitbox.style.display = 'block';

  // Check for collision (logic in gameLogic.js)
  checkCollision();

  // Hide hitbox after a short delay
  setTimeout(() => {
    hitbox.style.display = 'none';
  }, 200);
}
