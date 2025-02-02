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
    startTime: 0
};

let globalSpeed = CONFIG.GAME.GLOBAL_SPEED;
let newGlobalSpeed = globalSpeed;
let bonusScore = 0;
let bonusBegin;
let invisible = false;

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
    for (let i = 0; i < assetLoader.assets.animations.length; i++) {
        animations[i] = new Animation(assetLoader.assets.animations, 0, 0);
    }
}

function resetGame() {
    gameState.score = 0;
    gameState.collision = false;
    gameState.startTime = millis();
    
    player.reset();
    bonus = new Bonus(random(200, width-230), int(random(3)), assetLoader.assets);
    chaser = new Chaser(0, random(200, width-200), 0, 0.5, assetLoader.assets);
    roadblock = new Roadblock(0, random(200, width-200 - 100), 0.2);
}

function draw() {
    // Display animations
    animations.forEach(anim => {
        anim.display();
        anim.next();
        anim.move();
    });

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

function drawStartScreen() {
    image(assetLoader.assets.title, 0, 0);
    // Add start screen UI elements here
}

function drawGameplay() {
    // Update and display game objects
    player.move();
    player.display();
    
    bonus.update();
    bonus.display();
    bonus.checkCollection(player);
    bonus