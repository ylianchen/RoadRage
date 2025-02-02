// js/classes/Animation.js
class Animation {
    constructor(images, x, y) {
        this.x = x;
        this.y = y;
        this.images = images;
        this.index = 0;
        this.speed = newGlobalSpeed * 4;
    }

    display() {
        const imageIndex = int(this.index);
        if (this.images[imageIndex]) {
            image(this.images[imageIndex], this.x, this.y);
        }
    }

    move() {
        this.speed = newGlobalSpeed * 4;
        this.y += this.speed;
    }

    next() {
        this.index += this.speed;
        if (this.index >= this.images.length) {
            this.index -= this.images.length;
        }
    }
}
