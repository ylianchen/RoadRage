class Roadblock {
  constructor(y, x, vy) {
    this.Onscreen = false;
    this.posY = y;
    this.posX = x;
    this.VY = vy;
    this.roadblockW = 100;
    this.roadblockH = 30;
  }

  update() {
    this.posY += this.VY;
  }

  spawn() {
    rect(this.posX, this.posY, this.roadblockW, this.roadblockH);
  }
}

class Chaser {
  constructor(y, x, vx, vy) {
    this.onScreen = false;
    this.pY = y;
    this.pX = x;
    this.VX = vx;
    this.VY = vy;
  }

  update() {
    this.pY += this.VY;
    let targetX = carX;
    let dx = targetX - this.pX;
    this.pX += dx * easing;
  }

  spawn() {
    if (this.onScreen == false) {
      image(cop, this.pX, this.pY);
    }
  }
}