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
    checkCollision(this);
};

var checkCollision = function(enemy) {

    // Player dimensions are x=70 y=80
    // Bug dimensions are x=100 y=80

    // Check for collision between enemy and player
    if (
        player.y + 135 >= enemy.y + 90 &&
        player.y + 90 <= enemy.y + 135 &&
        player.x + 25 <= enemy.x + 90 &&
        player.x + 90 >= enemy.x + 25) {
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
        player.update();
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


// IDEA: Make the Gem class.
var Gem = function(x, y) {
    // Setting the Player initial location
    this.x = x;
    this.y = y;
    this.value = 5;

    // Loading the image by setting this.sprite to the appropriate image
    this.sprite = 'images/Gem-Blue.png';
    // IDEA: Make each gem have a different value depending on the colour
};

Gem.prototype.update = function() {
    if (
        player.y + 135 >= gem.y + 90 &&
        player.y + 90 <= gem.y + 135 &&
        player.x + 25 <= gem.x + 90 &&
        player.x + 90 >= gem.x + 25) {
        console.log('collected');
        gem.eraseGem();
    }
}

Gem.prototype.replaceGem = function() {
    this.x = getRandomIntInclusive(200, 300);
    this.y = getRandomIntInclusive(100, 350);
    player.score += this.value;
}

Gem.prototype.eraseGem = function() {
    player.score += this.value;
    // find the gem in the array and erase it.
    findGem(this);
}

function findGem(gem) {
    var remove = 0;
    allGems.forEach(function(el, index){
        if (gem.x === el.x && gem.y === el.y) {
            remove = index;
        }
    });
    allGems.splice(remove, 1);
    remove = 0;
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// ************************************************************

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    // Setting the Player initial location
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.score = 0;
    this.level = 0;

    // Loading the image by setting this.sprite to the appropriate image
    this.sprite = 'images/char-boy.png';
};

Player.prototype.changeChar = function() {
    ctx.drawImage(Resources.get(player.sprite), player.x, player.y);
}

Player.prototype.update = function(dt) {
    // this.sprite = player.sprite;
    this.score += 10;
    this.level += 1;
    this.x = 200;
    this.y = 380;
    var enemy = new Enemy(0, Math.random() * 180 + 50, Math.random() * 256);
    allEnemies.push(enemy);
    var gem = new Gem(getRandomIntInclusive(0, 500), getRandomIntInclusive(50, 350));
    allGems.push(gem);
};

Player.prototype.handleInput = function(keyCode) {
    switch (keyCode) {
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
            player.changeChar();
            break;
        case 'char-cat-girl':
            player.sprite = 'images/char-cat-girl.png';
            player.changeChar();
            break;
        case 'char-horn-girl':
            player.sprite = 'images/char-horn-girl.png';
            player.changeChar();
            break;
        case 'char-pink-girl':
            player.sprite = 'images/char-pink-girl.png';
            player.changeChar();
            break;
        case 'char-princess-girl':
            player.sprite = 'images/char-princess-girl.png';
            player.changeChar();
            break;
    }

};

Player.prototype.resetPlayer = function() {
    player.x = 200;
    player.y = 380;
    player.score = 0;
    player.level = 0;
    allEnemies = [];
    var enemy = new Enemy(0, Math.random() * 180 + 50, Math.random() * 256);
    allEnemies.push(enemy);
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    document.getElementById('score').innerHTML = player.score;
    document.getElementById('level').innerHTML = player.level;
};

// --------------------------------------------

var player = new Player(200, 380, 100);

var allEnemies = [];
var enemy = new Enemy(0, Math.random() * 180 + 50, Math.random() * 256);
allEnemies.push(enemy);

var allGems = [];
var totalGems = getRandomIntInclusive(1,3);
for(var i=0; i < totalGems; i++) {
    var gem = new Gem(getRandomIntInclusive(0, 400), getRandomIntInclusive(50, 350));
    allGems.push(gem);
}


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
// IDEA: Collectables: you can add gems to the game, allowing the player to collect them to make the game more interesting.

/**
 * 
 *  Gets a random integer between min and max.
 * 
 * @param integer min 
 * @param integer max 
 * @returns integer
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}