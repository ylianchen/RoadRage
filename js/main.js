// js/main.js
let assetLoader;
let player;
let animations = [];
let bonus;
let chaser;
let roadblock;
let gameState = {
    screen: 0,
    score: 0,
    collision: false,
    startTime: 0,
    lastChaserSpawn: 0,
    lastRoadblockSpawn: 0,
    lastBonusSpawn: 0
};

let globalSpeed = CONFIG.GAME.GLOBAL_SPEED;
let newGlobalSpeed = globalSpeed;
let bonusScore = 0;
let bonusBegin;
let invisible = false;
let scoreIncrement = CONFIG.GAME.SCORE.INCREMENT;

function preload() {
    assetLoader = new AssetLoader();
    assetLoader.loadGameAssets();
}

function setup() {
    createCanvas(CONFIG.CANVAS.WIDTH, CONFIG.CANVAS.HEIGHT);
    frameRate(CONFIG.CANVAS.FRAME_RATE);
    
    // Initialize game objects
    player = new Player(assetLoader);
    initializeAnimations();
    resetGame();
}

function initializeAnimations() {
    animations = [];
    for (let i = 0; i < assetLoader.assets.animations.length; i++) {
        animations.push(new Animation(assetLoader.assets.animations, 0, -i * CONFIG.CANVAS.HEIGHT));
    }
}

function resetGame() {
    // Reset game state
    gameState.score = 0;
    gameState.collision = false;
    gameState.startTime = millis();
    gameState.lastChaserSpawn = millis();
    gameState.lastRoadblockSpawn = millis();
    gameState.lastBonusSpawn = millis();
    
    // Reset game variables
    globalSpeed = CONFIG.GAME.GLOBAL_SPEED;
    newGlobalSpeed = globalSpeed;
    scoreIncrement = CONFIG.GAME.SCORE.INCREMENT;
    bonusScore = 0;
    invisible = false;
    
    // Reset game objects
    player.reset();
    bonus = new Bonus(random(200, width-230), int(random(3)), assetLoader.assets);
    chaser = new Chaser(0, random(200, width-200), 0, newGlobalSpeed, assetLoader.assets);
    roadblock = new Roadblock(0, random(200, width-200 - 100), newGlobalSpeed/2);
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

function drawStartScreen() {
    image(assetLoader.assets.title, 0, 0);
    
    // Draw car selection
    textSize(32);
    textAlign(CENTER);
    fill(255);
    text("Select Your Car", width/2, 350);
    text("<", 220, 420);
    text(">", 460, 420);
    
    // Display selected car
    let selectedCarImg = player.selectedCar === 0 ? 
        assetLoader.assets.cars.player1 : 
        assetLoader.assets.cars.player2;
    image(selectedCarImg, width/2 - 25, 380);
    
    text("Press SPACE to Start", width/2, height - 100);
}

function drawGameplay() {
    // Update game objects
    player.move();
    player.display();
    
    // Update and check bonus
    if (bonus) {
        bonus.update();
        bonus.display();
        bonus.checkCollection(player);
        bonus.checkEffectDuration();
    }
    
    // Spawn new bonus if needed
    if (millis() - gameState.lastBonusSpawn > CONFIG.GAME.BONUS.SPAWN_CYCLE) {
        bonus = new Bonus(random(200, width-230), int(random(3)), assetLoader.assets);
        gameState.lastBonusSpawn = millis();
    }
    
    // Update and check enemies
    updateEnemies();
    
    // Update score
    gameState.score += scoreIncrement + bonusScore;
    
    // Display score
    textSize(24);
    textAlign(LEFT);
    fill(255);
    text(`Score: ${Math.floor(gameState.score)}`, 20, 30);
    
    // Check for collisions if not invisible
    if (!invisible && (checkChaserCollision() || checkRoadblockCollision())) {
        gameState.collision = true;
        gameState.screen = 2;
    }
}

function updateEnemies() {
    // Spawn new chaser
    if (millis() - gameState.lastChaserSpawn > CONFIG.GAME.ENEMIES.CHASER_SPAWN_CYCLE) {
        chaser = new Chaser(0, random(200, width-200), 0, newGlobalSpeed, assetLoader.assets);
        gameState.lastChaserSpawn = millis();
    }
    
    // Spawn new roadblock
    if (millis() - gameState.lastRoadblockSpawn > CONFIG.GAME.ENEMIES.ROADBLOCK_SPAWN_CYCLE) {
        roadblock = new Roadblock(0, random(200, width-200 - 100), newGlobalSpeed/2);
        gameState.lastRoadblockSpawn = millis();
    }
    
    // Update and display enemies
    if (chaser) {
        chaser.update(player.x);
        chaser.display();
    }
    
    if (roadblock) {
        roadblock.update();
        roadblock.display();
    }
}

function drawGameOver() {
    textSize(48);
    textAlign(CENTER);
    fill(255, 0, 0);
    text("GAME OVER", width/2, height/2 - 50);
    
    textSize(32);
    fill(255);
    text(`Final Score: ${Math.floor(gameState.score)}`, width/2, height/2 + 20);
    text("Press SPACE to Restart", width/2, height/2 + 80);
}

function checkChaserCollision() {
    return chaser && chaser.isColliding(player);
}

function checkRoadblockCollision() {
    return roadblock && roadblock.isColliding(player);
}

function keyPressed() {
    switch(gameState.screen) {
        case 0:
            if (keyCode === 32) { // Spacebar
                gameState.screen = 1;
                resetGame();
            }
            break;
            
        case 1:
            player.handleKeyPress(keyCode);
            break;
            
        case 2:
            if (keyCode === 32) { // Spacebar
                gameState.screen = 0;
                resetGame();
            }
            break;
    }
}

function keyReleased() {
    if (gameState.screen === 1) {
        player.handleKeyRelease();
    }
}

function mousePressed() {
    if (gameState.screen === 0) {
        // Car selection logic
        if (mouseX < 240 && mouseX > 215 && mouseY < 440 && mouseY > 400) {
            player.selectedCar = (player.selectedCar - 1 + 2) % 2;
        }
        if (mouseX < 465 && mouseX > 440 && mouseY < 440 && mouseY > 400) {
            player.selectedCar = (player.selectedCar + 1) % 2;
        }
    }
}