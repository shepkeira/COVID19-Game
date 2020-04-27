
class Level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2'})
    }

    preload() {
        this.load.image('background', '\\charactersheets\\BackgroundColorForest.png')
        this.load.image('enemy', '\\charactersheets\\character_maleAdventurer_idle.png');
        this.load.image('bubble', '\\charactersheets\\circle.png');
        this.load.image('platform', '\\charactersheets\\ground_stone.png');
        this.load.image('platform_small', '\\charactersheets\\ground_stone_small.png')
        this.load.spritesheet('character', '\\charactersheets\\character_femaleAdventurer_sheet.png', {frameWidth: 96, frameHeight: 128});
    }

    create() {
        gameState.active = true;
        gameState.gameOver = false;

        gameState.bg = this.add.image(0,0, 'background').setOrigin(0,0);
        gameState.bg = this.add.image(gameState.bg.width,0, 'background').setOrigin(0,0);


        gameState.text = this.add.text(0, 0, 'Health: 100%', {color: '#d16b4b', fontSize: '40px'});
        gameState.text.setScrollFactor(0,0);
        //gameState.enemy = this.physics.add.group();
        //gameState.enemy.create(300, 514.5, 'enemy').setScale(.5);
        
        gameState.enemy = this.physics.add.sprite(300,525,'enemy').setScale(.5);//.setOrigin(0,0);

        this.cameras.main.setBounds(0,-100,gameState.bg.width*2, gameState.bg.height);
        this.physics.world.setBounds(0,-100,gameState.bg.width*2, gameState.bg.height);
        

        gameState.cursors = this.input.keyboard.createCursorKeys();

        gameState.platforms = this.physics.add.staticGroup();
        const platPosisitons = [{ x: 100, y: 500 },{ x: 300, y: 630},{ x:300, y: 370},{ x: 500, y: 500},{ x: 700, y: 600}, { x: 900, y: 550}, { x: 1100, y: 500},{ x: 1300, y: 525 },{ x: 1500, y: 600},{ x: 1700, y: 550},{ x: 1900, y: 600}]


        platPosisitons.forEach(plat => {
            gameState.platforms.create(plat.x, plat.y, 'platform').setScale(.5).refreshBody();
        }); 

        gameState.player = this.physics.add.sprite(100, 400, 'character').setScale(.5, .5);
        this.physics.add.collider(gameState.player, gameState.platforms);
        this.physics.add.collider(gameState.enemy, gameState.platforms);
        
        gameState.player.health = 100;

        //gameState.physics.arcade.collide(gameState.player, gameState.enemy);
        //gameState.physics.arcade.overlap(gameState.player, gameState.enemy, spritecollide, null, this);
        //gameState.physics.arcade.collide(gameState.enemy, gameState.player, this.spritecollide, null, this);

        gameState.player.setCollideWorldBounds(true);
        //gameState.player.setCollideWorldBounds(true);

        this.cameras.main.startFollow(gameState.player, true);        
        
        gameState.bubble = this.add.sprite(gameState.player.x, gameState.player.y, 'bubble').setScale(.2);
        //console.log(gameState.bubble.width);
        //gameState.bubble.displayWidth = 240;
        //gameState.bubble.displayHeight = 240;

        gameState.player.body.onOverlap = true;
        this.physics.world.on('overlap', function() {console.log("hi")}, this);

        //this.physics.add.overlap(gameState.bubble, gameState.enemy);
        //this.physics.add.overlap(gameState.player, gameState.enemy);
        

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

        //this.physics.add.overlap(gameState.player, gameState.enemy, spriteHitHealth);

        
    }

    /* spriteHitHealth() {
        console.log("hi");
    } */

    update() {
        if (gameState.active && !gameState.gameOver) {

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
                gameState.player.setVelocityY(-330);
            }
        }
        gameState.bubble.x = gameState.player.x - 6;
        gameState.bubble.y = gameState.player.y + 16;

        var circle = new Phaser.Geom.Circle(gameState.bubble.x, gameState.bubble.y, 120);
        if(Phaser.Geom.Intersects.CircleToRectangle(circle, gameState.enemy.getBounds())) {
            var enemyX = gameState.enemy.x - (gameState.enemy.width/4);
            var enemyY = gameState.enemy.y - gameState.enemy.height/2;
            var playerX = gameState.player.x - (gameState.player.width/4);
            var playerY = gameState.player.y - gameState.player.height/2;
            var disX = Math.abs(playerX - enemyX);
            //console.log(playerX);
            //console.log(enemyX);
            var disY = Math.abs(playerY - enemyY);
            var dis = Math.sqrt((disX * disX) + (disY * disY));
            dis = (dis/120)*6;
            if (!gameState.gameOver) {
                gameState.player.health -= .1/dis;
            } else {
                gameState.player.health = 0;
            }
            gameState.text.setText("Health: " + Math.round(gameState.player.health) + "%");
            //console.log(dis);
        }

        if(gameState.player.health <= 0) {
            this.add.text(gameState.player.x, gameState.player.y, "GameOver", {color: '#d16b4b', fontSize: '40px'});
            gameState.gameOver = true;
        }


    }

    spritecollide() {
        this.add.text(150, 175, 'Click to Start', {color: '#d16b4b', fontSize: '40px'})
    }
}