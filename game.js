const gameState = {
    score: 0
};

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    backgroundColor: "1cbb9b",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400},
            enableBody: true,
            debug: false,
        }
    },
    scene: [
        StartScene,
        Level1,
        Level2
    ]
};

const game = new Phaser.Game(config);