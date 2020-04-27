class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene'})
    }

    create() {
        this.add.text(50, 125, 'Welcome to COVID Dodger!', {color: '#d16b4b', fontSize: '40px'})
        this.add.text(150, 175, 'Click to Start', {color: '#d16b4b', fontSize: '40px'})

        this.input.on('pointerdown', () => {
            this.scene.stop('StartScene')
            this.scene.start('Level2')
        })
    }
}