const Enemy = function (x = 0, y = 0, minSpeed = 150, maxSpeed = 350) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.minSpeed = minSpeed;
  this.maxSpeed = maxSpeed;
  this.speed = this.generateSpeed();

};

//getting a random number for speed
Enemy.prototype.generateSpeed = function () {
  const min = Math.ceil(this.minSpeed);
  const max = Math.floor(this.maxSpeed);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Update the enemy's position
Enemy.prototype.reset = function () {
  this.x = -65;
  this.speed = this.generateSpeed()
};
Enemy.prototype.update = function (dt) {
  if (this.x >= 650) {
    this.reset();
  }
  this.x += this.speed * dt; //multiplying by dt to ensure the game runs at the same speed for all computers.
};

//checking bugs' and player's positions to determine collision
Enemy.prototype.isCollidingWith = function (x, y) {
  if (this.x < x + charWidth && this.x > x - charWidth && this.y < y + charWidth && this.y > y - charWidth) {
    gameResult.lostGame();
    return true;
  }
  return false;
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


function Player() {
  this.sprite = 'images/char-boy.png';
  this.x = startPlayerX;
  this.y = startPlayerY;
}

//resetting the player position
Player.prototype.reset = function () {
  this.x = startPlayerX;
  this.y = startPlayerY;
};

Player.prototype.update = function () {
  allEnemies.forEach(function (enemy) {
    if (enemy.isCollidingWith(player.x, player.y)) {
      resetGame();
    }
  });
  gameResult.winGame();
};

//moving the player on press.
Player.prototype.handleInput = function (press) {
  if (press === 'left' && this.x > 0) {
    this.x -= canvas.cellWidth;
  }
  else if (press === 'right' && this.x < canvas.width) {
    this.x += canvas.cellWidth;
  }
  else if (press === 'up' && this.y > 0) {
    this.y -= canvas.cellHeight;
  }
  else if (press === 'down' && this.y < canvas.height) {
    this.y += canvas.cellHeight;
  }

};
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//this resets both player and enemies
function resetGame() {
  player.reset();
  
}

//keeping track of score.
const Score = function (score) {
  this.score = score;

};
//adds win method to Score
Score.prototype.winGame = function () {
  if (player.y <= 0) {
    if (isNaN(parseInt(this.score.innerText))) {
      this.score.innerText = 0;
    }
    else {
      this.score.innerText = parseInt(this.score.innerText) + 1;
      resetGame();
    }
  }
};
//adds loss method to Score
Score.prototype.lostGame = function () {
  if (parseInt(this.score.innerText) > 0) {
    this.score.innerText = parseInt(this.score.innerText) - 1;
  }
  else {
    this.score.innerText = "Try Again!";

  }
};

const startPlayerX = 200,
      startPlayerY = 480,
      gameResult = new Score(document.querySelector('.score')),
      canvas = {
      width: 400,
      height: 480,
      cellWidth: 101,
      cellHeight: 83
    },
      charWidth = 60,
      firstBugY = 65;

//enemy objects
const allEnemies = [new Enemy(-70, firstBugY ), new Enemy(-160, firstBugY  + canvas.cellHeight), new Enemy(-128, firstBugY  + (canvas.cellHeight * 2)), new Enemy(-300, firstBugY  + (canvas.cellHeight *3))];

//the player object
const player = new Player();
// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});



