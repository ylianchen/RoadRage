// js/utils/AssetLoader.js
class AssetLoader {
    constructor() {
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.assets = {
            cars: {},
            bonus: {},
            animations: []
        };
    }

    updateLoadingProgress() {
        const progress = Math.floor((this.loadedAssets / this.totalAssets) * 100);
        document.getElementById('loading-screen').innerHTML = `Loading... ${progress}%`;
        if (this.loadedAssets === this.totalAssets) {
            document.getElementById('loading-screen').style.display = 'none';
        }
    }

    loadImage(path) {
        this.totalAssets++;
        return loadImage(path, () => {
            this.loadedAssets++;
            this.updateLoadingProgress();
        }, error => {
            console.error('Failed to load image:', path, error);
        });
    }

    loadGameAssets() {
        // Load car images
        this.assets.cars.player1 = this.loadImage(`${CONFIG.PATHS.IMAGES.CAR}car1.png`);
        this.assets.cars.player2 = this.loadImage(`${CONFIG.PATHS.IMAGES.CAR}car2.png`);
        this.assets.cars.cop = this.loadImage(`${CONFIG.PATHS.IMAGES.CAR}cop.png`);

        // Load bonus images
        this.assets.bonus.star = this.loadImage(`${CONFIG.PATHS.IMAGES.BONUS}star.png`);
        this.assets.bonus.star1 = this.loadImage(`${CONFIG.PATHS.IMAGES.BONUS}star1.png`);
        this.assets.bonus.star2 = this.loadImage(`${CONFIG.PATHS.IMAGES.BONUS}star2.png`);

        // Load title
        this.assets.title = this.loadImage(`${CONFIG.PATHS.IMAGES.TITLE}Title.png`);

        // Load animation frames
        for (let i = 0; i < 68; i++) {
            const frameNumber = (i + 1).toString().padStart(2, '0');
            const framePath = `${CONFIG.PATHS.IMAGES.ANIMATIONS}stick${frameNumber}.jpg`;
            this.assets.animations.push(this.loadImage(framePath));
        }
    }
}
