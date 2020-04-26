
class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1'})
    }

    preload() {
        this.load.image('background', '\\charactersheets\\BackgroundColorForest.png')
        this.load.image('char', '\\charactersheets\\character_femaleAdventurer_idle.png');
        this.load.image('bubble', '\\charactersheets\\circle.png');
        this.load.image('platform', '\\charactersheets\\ground_stone.png');
        this.load.image('platform_small', '\\charactersheets\\ground_stone_small.png')
        this.load.spritesheet('character', '\\charactersheets\\character_femaleAdventurer_sheet.png', {frameWidth: 96, frameHeight: 128});
    }

    create() {
        gameState.active = true;

        gameState.bg = this.add.image(0,0, 'background').setOrigin(0,0);
        gameState.bg = this.add.image(gameState.bg.width,0, 'background').setOrigin(0,0);

        this.cameras.main.setBounds(0,-100,gameState.bg.width*2, gameState.bg.height);
        this.physics.world.setBounds(0,-100,gameState.bg.width*2, gameState.bg.height);
        

        gameState.cursors = this.input.keyboard.createCursorKeys();

        gameState.platforms = this.physics.add.staticGroup();
        const platPosisitons = [{ x: 100, y: 500 },{ x: 300, y: 600},{ x: 500, y: 550},{ x: 700, y: 600}, { x: 900, y: 550}, { x: 1100, y: 500},{ x: 1300, y: 525 },{ x: 1500, y: 600},{ x: 1700, y: 550},{ x: 1900, y: 600}]


        platPosisitons.forEach(plat => {
            gameState.platforms.create(plat.x, plat.y, 'platform').setScale(.5).refreshBody();
        }); 

        gameState.player = this.physics.add.sprite(100, 400, 'character').setScale(.5, .5);
        this.physics.add.collider(gameState.player, gameState.platforms);

        gameState.player.setCollideWorldBounds(true);

        this.cameras.main.startFollow(gameState.player, true);

        

        gameState.bubble = this.add.sprite(gameState.player.x, gameState.player.y, 'bubble');
        gameState.bubble.displayWidth = 240;
        gameState.bubble.displayHeight = 240;
        

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('character', {start: 0, end: 0}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('character', 
            {
                start: 24, 
                end: 27
            }),
            frameRate: 5,
            repeat: -1
        });
        
    }

    update() {
        if (gameState.active) {
            if (gameState.cursors.right.isDown && gameState.player.body.onFloor()) {
                //gameState.player.x = gameState.player.x + 5;
                gameState.player.anims.play('run', true);
                gameState.player.setVelocityX(150);
                gameState.player.flipX = false;
            } else if (gameState.cursors.right.isDown) {
                gameState.player.anims.play('run', true);
                gameState.player.setVelocityX(100);
                gameState.player.flipX = false;
            } else if (gameState.cursors.left.isDown && gameState.player.body.onFloor()) {
                gameState.player.anims.play('run', true);
                gameState.player.setVelocityX(-150);
                gameState.player.flipX = true;
            } else if (gameState.cursors.left.isDown) {
                //gameState.player.x = gameState.player.x - 5;
                gameState.player.anims.play('run', true);
                gameState.player.setVelocityX(-100);
                gameState.player.flipX = true;
            } else {
                gameState.player.anims.play('idle', true);
                gameState.player.setVelocityX(0);
            }

            if (gameState.cursors.up.isDown && gameState.player.body.onFloor()) {
                gameState.player.setVelocityY(-200);
            }
        }
        gameState.bubble.x = gameState.player.x - 6;
        gameState.bubble.y = gameState.player.y + 16;
    }
}