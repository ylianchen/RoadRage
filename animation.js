class Animation {
  constructor(images_, x_, y_) {
    this.x = x_;  // location for Animation
    this.y = y_;  // location for Animation

    this.index = 0;

    // The array of images
    this.images = images_;

    // Speed, this will control both the animations movement
    // as well as how fast it cycles through the images
    this.speed = newGlobalSpeed * 4;
  }

  display() {
    // Must convert the float index to an int first
    let imageIndex = int(this.index);
    image(this.images[imageIndex], 0, 0);
  }

  move() {
    this.speed = newGlobalSpeed * 4;
    this.y += this.speed;
  }

  next() {
    // Move the index forward in the animation sequence
    this.index += this.speed;
    // If we are at the end, go back to the beginning
    if (this.index >= this.images.length) {
      // We could just say index = 0
      // but this is slightly more accurate
      this.index -= this.images.length;
    }
  }
}