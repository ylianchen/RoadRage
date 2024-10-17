class Bonus {
  constructor(x, i) {
    this.bonusSize = 30;
    this.bonusX = x;
    this.bonusY = -this.bonusSize;
    this.bonusSpeed = newGlobalSpeed / 2; // adjust to change how fast the bonus moves
    this.bonusIcon = new Array(3);
    this.bonusType = i; // code for bonus types

    this.bonusDisappear = false;

    // Import bonus icons
    // !!temporal images, replace with actual graphics!!
    this.bonusIcon[0] = loadImage("data/bonus/star.png"); // civilian
    this.bonusIcon[1] = loadImage("data/bonus/star1.png"); // slow down
    this.bonusIcon[2] = loadImage("data/bonus/star2.png"); // unbreakable
  }

  spawn() {
    this.bonusAcquire();
    if (this.bonusDisappear) {
      this.bonusY = height + 30;
      this.bonusEffect();
      this.bonusDisappear = !this.bonusDisappear;
    } else {
      image(this.bonusIcon[this.bonusType], this.bonusX, this.bonusY, this.bonusSize, this.bonusSize);
      bonusScore = 0;
    }
    this.disableBonusEffect();
  }

  bonusAcquire() {
    if (carX >= this.bonusX - img.width
      && carX <= this.bonusX + this.bonusSize
      && carY >= this.bonusY - img.height
      && carY <= this.bonusY + this.bonusSize) {
      this.bonusDisappear = !this.bonusDisappear;
    }
  }

  move() {
    this.bonusAcquire();
    if (!this.bonusDisappear) {
      this.bonusY += this.bonusSpeed;
    } else {
      this.bonusSpeed = newGlobalSpeed / 2;
    }
  }

  bonusEffect() {
    // Type 1: Civilian
    if (this.bonusType == 0) {
      bonusScore = scoreIncrement * 2;
    }

    // Type 2: Slow down time
    if (this.bonusType == 1) {
      bonusBegin = millis();
      newGlobalSpeed = globalSpeed / 2;
      scoreIncrement = 0.0025;
    }

    // Type 3: Invisible
    if (this.bonusType == 2) {
      bonusBegin = millis();
      playerOpacity = 128;
      invisible = true;
    }
  }

  disableBonusEffect() {
    if (millis() - bonusBegin > bonusLength) {
      newGlobalSpeed = globalSpeed;
      scoreIncrement = 0.005;
      playerOpacity = 255;
      invisible = false;
    }
  }
}