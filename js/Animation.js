// Updated Animation class
class Animation {
    constructor(images, x, y) {
        this.x = x;
        this.y = y;
        this.images = images;
        this.index = 0;
        this.speed = CONFIG.GAME.GLOBAL_SPEED * 4;
    }

    display() {
        const imageIndex = int(this.index);
        if (this.images[imageIndex]) {
            image(this.images[imageIndex], this.x, this.y);
        }
    }

    move() {
        // Use the base speed instead of the variable newGlobalSpeed
        this.y += CONFIG.GAME.GLOBAL_SPEED * 4;
    }

    next() {
        // Use consistent animation speed
        this.index += CONFIG.GAME.GLOBAL_SPEED * 4;
        if (this.index >= this.images.length) {
            this.index = 0;  // Reset to 0 instead of subtracting length
        }
    }
}

// Updated main.js functions
function initializeAnimations() {
    animations = [];
    for (let i = 0; i < assetLoader.assets.animations.length; i++) {
        animations.push(new Animation(assetLoader.assets.animations, 0, -i * CONFIG.CANVAS.HEIGHT));
    }
}

function updateAnimations() {
    for (let anim of animations) {
        anim.display();
        anim.next();
        anim.move();
        
        // Reset animation position when it goes off screen
        if (anim.y > CONFIG.CANVAS.HEIGHT) {
            anim.y = -CONFIG.CANVAS.HEIGHT;
        }
    }
}

function draw() {
    background(0);
    
    // Always update animations regardless of game state
    updateAnimations();
    
    switch(gameState.screen) {
        case 0:
            drawStartScreen();
            break;
        case 1:
            drawGameplay();
            break;
        case 2:
            drawGameOver();
            break;
    }
}

function resetGame() {
    gameState.score = 0;
    gameState.collision = false;
    gameState.startTime = millis();
    gameState.lastChaserSpawn = millis();
    //gameState.lastRoadblockSpawn = millis();
    gameState.lastBonusSpawn = millis();
    
    // Reset global speed variables
    globalSpeed = CONFIG.GAME.GLOBAL_SPEED;
    newGlobalSpeed = globalSpeed;
    
    player.reset();
    bonus = new Bonus(random(200, width-230), int(random(3)), assetLoader.assets);
    chaser = new Chaser(0, random(200, width-200), 0, 0.5, assetLoader.assets);
    //roadblock = new Roadblock(0, random(200, width-200 - 100), 0.2);
    
    // Don't reinitialize animations here
}