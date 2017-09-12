// Canvas width = 505
// Canvas height = 606
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, 
    // this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates the Enemy location (you need to implement)
    this.x += this.speed * dt;
    if (this.x >= 500) {
        this.x = 0;
    }
    // TODO: Handles collision with the Player (you need to implement)
    checkCollision(this);
};

var checkCollision = function(enemy) {

    // Player dimensions are x=70 y=80
    // Bug dimensions are x=100 y=80

    // Check for collision between enemy and player
    if (
        player.y + 135 >= enemy.y + 90
        && player.y + 90 <= enemy.y + 135
        && player.x + 25 <= enemy.x + 90        
        && player.x + 90 >= enemy.x + 25) {
            console.log('collided');
            player.resetPlayer();
    }

    // Check if player reaches borders of the canvas
    // Bottom border
    if (player.y > 380) {
        player.y = 380;
    }
    // Top border, Reached the top!
    if (player.y <= 50) {
        player.resetPlayer();
    }
    // Left border
    if (player.x < 0) {
        player.x = 0;
    }
    // Right border
    if (player.x > 400) {
        player.x = 400;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// IDEA You can add your own Enemy methods as needed

// ************************************************************

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    // Setting the Player initial location
    this.x = x;
    this.y = y;
    this.speed = speed;

    // Loading the image by setting this.sprite to the appropriate image
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // TODO: The update method for the Player (can be similar to the one for the Enemy)
    this.sprite = player.sprite;
};

Player.prototype.handleInput = function(keyCode) {
    switch(keyCode) {
        case 'up':
            player.y -= player.speed - 20; // -20?
        break;
        case 'down':
            player.y += player.speed - 20; // -20?
        break;
        case 'left':
            player.x -= player.speed; // -20?
        break;
        case 'right':
            player.x += player.speed; // -20?
        break;
        case 'char-boy':
            player.sprite = 'images/char-boy.png';
            player.update();
        break;
        case 'char-cat-girl':
            player.sprite = 'images/char-cat-girl.png';
            player.update();
        break;
        case 'char-horn-girl':
            player.sprite = 'images/char-horn-girl.png';
            player.update();
        break;
        case 'char-pink-girl':
            player.sprite = 'images/char-pink-girl.png';
            player.update();
        break;
        case 'char-princess-girl':
            player.sprite = 'images/char-princess-girl.png';
            player.update();
        break;        
    }
    
};

Player.prototype.resetPlayer = function() {
    player.x = 202.5;
    player.y = 383;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
    console.log('player = (' + this.x + ',' + this.y + ');');
};

// --------------------------------------------

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Place the player object in a variable called player
var player = new Player(200,380, 100);
var enemy = new Enemy(0, Math.random() * 180+50, Math.random() * 256);
allEnemies.push(enemy);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        49: 'char-boy',
        50: 'char-cat-girl',
        51: 'char-horn-girl',
        52: 'char-pink-girl',
        53: 'char-princess-girl',
    };
    player.handleInput(allowedKeys[e.keyCode]);
});


// In addition to the basic functionality, you can add more cool functionality to your game. For example, here are some additional features that you can add:
// IDEA: Player selection: allow the user to select the image for the player character before starting the game. You can use the different character images provided in the images folder (we’ll get to that below).
// IDEA: Score: you can implement a score for the game. For example, the score can increase each time the player reaches the water, and it can be reset to 0 when collision occurs (or it can be reduced).
// IDEA: Collectables: you can add gems to the game, allowing the player to collect them to make the game more interesting.
