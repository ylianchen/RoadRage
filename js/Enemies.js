// js/classes/Enemies.js
class Roadblock {
    constructor(y, x, vy) {
        this.posY = y;
        this.posX = x;
        this.VY = vy;
        this.width = 100;
        this.height = 30;
        this.onScreen = false;
    }

    update() {
        this.posY += this.VY;
    }

    display() {
        rect(this.posX, this.posY, this.width, this.height);
    }

    isColliding(player) {
        return (
            player.x < this.posX + this.width &&
            player.x + 50 > this.posX &&
            player.y < this.posY + this.height &&
            player.y + 50 > this.posY
        );
    }
}

class Chaser {
    constructor(y, x, vx, vy, assets) {
        this.y = y;
        this.x = x;
        this.vx = vx;
        this.vy = vy;
        this.copImage = assets.cars.cop;
        this.onScreen = false;
    }

    update(playerX) {
        this.y += this.vy;
        const dx = playerX - this.x;
        this.x += dx * CONFIG.GAME.ENEMIES.EASING;
    }

    display() {
        if (!this.onScreen) {
            image(this.copImage, this.x, this.y);
        }
    }

    isColliding(player) {
        return (
            player.x < this.x + 50 &&
            player.x + 50 > this.x &&
            player.y < this.y + 50 &&
            player.y + 50 > this.y
        );
    }
}
