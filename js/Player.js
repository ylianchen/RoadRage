// js/classes/Player.js
class Player {
    constructor(assetLoader) {
        this.assets = assetLoader.assets;
        this.reset();
    }

    reset() {
        this.x = width / 2;
        this.y = height - 150;
        this.vx = 0;
        this.vy = 0;
        this.speed = 1;
        this.opacity = 255;
        this.selectedCar = 0;
    }

    move() {
        this.y += this.vy / frameRate();
        this.x += this.vx / frameRate();
        this.constrainPosition();
    }

    constrainPosition() {
        this.y = constrain(this.y, 100, height - 150);
        this.x = constrain(this.x, 160, 520 - 50);
    }

    display() {
        push();
        tint(255, this.opacity);
        const carImage = this.selectedCar === 0 ? this.assets.cars.player1 : this.assets.cars.player2;
        image(carImage, this.x, this.y);
        pop();
        
        this.drawTurbulence();
    }

    drawTurbulence() {
        const x = random(this.x, this.x + 50);
        const y1 = random(this.y, height);
        const y2 = random(this.y, height);
        stroke(255);
        line(x, y1, x, y2);
    }

    handleKeyPress(keyCode) {
        switch(keyCode) {
            case UP_ARROW:
                this.vy = -this.speed;
                break;
            case DOWN_ARROW:
                this.vy = this.speed;
                break;
            case LEFT_ARROW:
                this.vx = -this.speed;
                break;
            case RIGHT_ARROW:
                this.vx = this.speed;
                break;
        }
    }

    handleKeyRelease() {
        this.vx = 0;
        this.vy = 0;
    }
}
