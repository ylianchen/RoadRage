// Last update 22:39 07.01.21

// Variables for environment
let globalSpeed = 0.5; // Global speed for all moving elements
let newGlobalSpeed = globalSpeed; // speed while bonus takes effect

// Variables for bonuses
let bonus;
let timeStart;
let spawnCycle = 5000; // interval between bonuses !!remember to change this!!
let bonusDisappear = false;
let bonusBegin; // timer for bonus effect
let bonusLength = 7000; // how long the bonus effects last
let playerOpacity = 255; // change the look of player's car
let invisible = false;

// Variables for player's car
let carX, carY; // car location
let carVX = 0, carVY = 0, carSpeed = 1; // car speed
let img; // car.png
let img2;
let cap; // cloud maybe
let x, y1, y2; // turbulence line behind the car
let animations = new Array(68); // background img array 

// Variables for obstacles
let chaser;
let roadblock;
let cop;
let car;
let type;
let ennemiesAmount = 0;
let easing = 0.001;
let chaserStart; // timer for chaser spawn
let chaserCycle = 3000; // intervals between each spawn
let roadblockStart; // timer for roadblock spawn
let roadblockCycle = 2000;

// Variables for scoring
let scoreIncrement = 0.005;
let totalScore = 0;
let bonusScore;

// Other variables
let screen = 0; // which screen is displayed
let collision = false; // collision with obstacles
let gameStartTime; // time when game begins

function preload() {
  img = loadImage("data/car/car1.png"); // load car img
  img2 = loadImage("data/car/car2.png");
  cop = loadImage("data/car/copo.png");
  // cap = loadImage("cap.png"); this is for the cloud shadow maybe

  // Load the background image sequence
  title = loadImage("data/Title/Title.png");
  let seq = [];
  for (let i = 0; i < 68; i++) {
    seq[i] = loadImage(`data/data/stick${(i+1).toString().padStart(2, '0')}.jpg`);
  }
  
  // Make the objects
  for (let i = 0; i < animations.length; i++) {
    // Each object gets an image array and an x,y location
    animations[i] = new Animation(seq, 0, 0);
  }
}

function setup() {
  createCanvas(680, 680);
  frameRate(60);

  // Initialisation for bonus
  timeStart = millis();
  bonus = new Bonus(random(200, width-230), int(random(3)));

  // Initialize enemies
  chaser = new Chaser(0, random(200, width-200), 0, 0.5);
  roadblock = new Roadblock(0, random(200, width-200 - 100), 0.2);
  chaserStart = millis();
  roadblockStart = millis();
}

function draw() {
  // Display, cycle, and move all the animation objects
  for (let i = 0; i < animations.length; i++) {
    animations[i].display();
    animations[i].next();
    animations[i].move();
  }

  // cloud();
  switch(screen) {
    case 0:
      start_screen();
      break;
    case 1:
      gameplay_screen();
      break;
    case 2:
      over_screen();
      break;
  }
}

function keyPressed() {
  // Start screen
  if (screen === 0) {
    if (keyCode === 32) screen = 1; // 32 is the keyCode for spacebar
  }

  // Gameplay screen
  if (screen === 1) playerControls();

  // Game over screen
  if (screen === 2) {
    if (keyCode === 32) screen = 0; // 32 is the keyCode for spacebar
  }
}

function keyReleased() {
  // Gameplay screen
  if (screen === 1) {
    carVX = 0;
    carVY = 0;
  }
}

function mousePressed() {
  if (screen === 0) {
    if (mouseX < 380 && mouseX > 300 && mouseY < 226 && mouseY > 186) {
      screen = 1;
    }
    if (mouseX < 240 && mouseX > 215 && mouseY < 440 && mouseY > 400) {
      car--;
    }
    if (mouseX < 465 && mouseX > 440 && mouseY < 440 && mouseY > 400) {
      car++;
    }
    if (car < 0) car = 1;
    if (car > 1) car = 0;
  }
}

// Placeholder functions (these are likely defined in other files)
function start_screen() {
  // Implementation needed
}

function gameplay_screen() {
  // Implementation needed
}

function over_screen() {
  // Implementation needed
}

function playerControls() {
  // Implementation needed
}

// Placeholder classes (these are likely defined in other files)
class Bonus {
  constructor(x, type) {
    // Implementation needed
  }
}

class Chaser {
  constructor(x, y, z, speed) {
    // Implementation needed
  }
}

class Roadblock {
  constructor(x, y, speed) {
    // Implementation needed
  }
}

class Animation {
  constructor(sequence, x, y) {
    // Implementation needed
  }

  display() {
    // Implementation needed
  }

  next() {
    // Implementation needed
  }

  move() {
    // Implementation needed
  }
}