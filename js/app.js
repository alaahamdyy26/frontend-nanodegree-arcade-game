// Enemies our player must avoid
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Enemy = function (x = 0, y = 0) {
  // TODO
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = getRandomNum(120, 360);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.reset = function () {
  this.x = -65;
  this.speed = getRandomNum(120, 360);
};
Enemy.prototype.update = function (dt) {
  // TODO:DONE
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x >= 650) {
    this.reset();
  }
  this.x += this.speed * dt;
};
Enemy.prototype.isCollidingWith = function (x, y) {
  if (this.x < x + 60 && this.x > x - 60 && this.y < y + 60 && this.y > y - 60) {
    gameResult.lostGame();
    return true;
  }
  return false;
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// TODO
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player() {
  this.sprite = 'images/char-boy.png';
  this.x = startPlayerX;
  this.y = startPlayerY;
}

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

Player.prototype.handleInput = function (press) {
  if (press === 'left' && this.x > 0) {
    this.x -= 101;
  }
  else if (press === 'right' && this.x < 400) {
    this.x += 101;
  }
  else if (press === 'up' && this.y > 0) {
    this.y -= 83;
  }
  else if (press === 'down' && this.y < 480) {
    this.y += 83;
  }

};
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//this resets both player and enemies
function resetGame() {
  player.reset();
  allEnemies.forEach(function (x) {
    x.reset();
  });
}

//keeping track of score.
var Score = function (score) {
  this.score = score;
};
//adds win method to Score
Score.prototype.winGame = function () {
  if (player.y <= -18) {
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
      gameResult = new Score(document.querySelector('.score'));


//enemy objects
const allEnemies = [new Enemy(-70, 65), new Enemy(-160, 148), new Enemy(-128, 228), new Enemy(-300, 311)];

//the player object
var player = new Player();
// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});


