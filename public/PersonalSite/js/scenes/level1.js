var score = 0;
var scoreText;
var highscore = 0;
var isPlayer = false;
var isPlayer1 = false;
var isPlayer2 = false;
var canScore = true;
var gameMusic;
var boundaryX;
var boundaryY;
var map;
var tileset;
var backgroundLayer;
var backgroundLayer1;
var wallLayer;
var cameraMain;

var p1healthText;
var p1Alive;
var p1HealthBar

var p2healthText;
var p2Alive;
var p2HealthBar;


class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: "Level1" });
    }



    preload() {


        this.load.image("p1bullet", "../assets/wodImages/projectile1.png");
        this.load.image("player1", "../assets/wodImages/theGuy1.png");
        this.load.image("p2bullet", "../assets/wodImages/projectile2.png");
        this.load.image("player2", "../assets/wodImages/theGuy2.png");

        this.load.image("zombie1", "../assets/wodImages/zombie1.png");

        this.load.image("tiles", "../assets/maps/CityAssets.png");
        this.load.tilemapTiledJSON("map", "../assets/maps/CityLevel1.json");

        this.load.spritesheet("bloodSplatter", "../assets/wodImages/bloodSplatter.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.image("goal", "../assets/wodImages/GOAL.png");

        this.load.audio("level1Music", "../assets/wodMusic/541216__erokia__apocalyptic-soundscape-ambiance.wav");

        this.load.audio("bloodSplat", "../assets/wodSFX/166535__qubodup__hidden-spike-trap.wav");
        this.load.audio("pewPew", "../assets/wodSFX/427598__michorvath__ar15-pistol-shot.wav");
        this.load.audio("chomp", "../assets/wodSFX/543386__nillyplays__nom-noise.wav");
        this.load.audio("RIP", "../assets/wodSFX/502733__phonosupf__viola-gust.wav");

    }

    create() {

        this.sfx = {
            splat: this.sound.add("bloodSplat", {volume: 0.5}),
            shoot: this.sound.add("pewPew", {volume: 0.5}),
            chomp: this.sound.add("chomp", {volume: 0.5}),
            death: this.sound.add("RIP", {volume: 1})
        };

        this.player1 = new Player1(
            this,
            this.game.config.width * 0.5,
            (this.game.config.height * 0.5) - 140,
            "player1",
            isPlayer1 = true
        );
        console.log(this.player1);
        console.log("P1 x is " + this.player1.x);
        console.log("P1 y is " + this.player1.y);
        this.p1Alive = true;

        this.player2 = new Player2(
            this,
            (this.game.config.width * 0.5),
            (this.game.config.height * 0.5) + 200,
            "player2",
            isPlayer2 = true
        );
        console.log(this.player2);
        console.log("P2 x is " + this.player2.x);
        console.log("P2 y is " + this.player2.y);
        this.p2Alive = true;

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_EIGHT);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE);
        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX);
        this.keyShoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.player1bullets = this.add.group();

        this.player2bullets = this.add.group();

         map = this.make.tilemap({ key: "map" });
         tileset = map.addTilesetImage("CityAssetsTiles", "tiles");
         backgroundLayer = map.createStaticLayer('Floor', tileset, 0, 0);
         backgroundLayer1 = map.createStaticLayer('Decoration', tileset, 0, 0);
         wallLayer = map.createStaticLayer('Colliders', tileset, 0, 0);

        wallLayer.setCollisionByProperty({ collides: true});
        this.physics.add.collider(this.player1, wallLayer);
        this.physics.add.collider(this.player2, wallLayer);

        /*
        boundaryX = backgroundLayer.width;
        boundaryY = backgroundLayer.height;
        */

        this.player1.setDepth(10);
        this.player2.setDepth(10);

        this.cameraMain = this.cameras.main;
        this.cameraMain.startFollow(this.player1);

        this.cameraMain.setBounds(0,0, backgroundLayer.width, backgroundLayer.height);
        console.log("Camera X is " + this.cameraMain.x);
        console.log("Camera max X is " + ((this.cameraMain.x) + (this.game.config.width)));

        this.zombies = this.add.group();

        //making LOTS of zombies as level 1 is considerably bigger than 2 and 3
        this.makeZombie(this, 600 , 350, "zombie1");
        this.makeZombie(this, 1000 , 550, "zombie1");
        this.makeZombie(this, 1100 , 460, "zombie1");
        this.makeZombie(this, 700 , 480, "zombie1");
        this.makeZombie(this, 780 , 520, "zombie1");
        this.makeZombie(this, 1030 , 530, "zombie1");

        this.makeZombie(this, 1200 , 600, "zombie1");
        this.makeZombie(this, 1280 , 550, "zombie1");
        this.makeZombie(this, 1220 , 460, "zombie1");
        this.makeZombie(this, 1160 , 350, "zombie1");
        this.makeZombie(this, 1310 , 520, "zombie1");
        this.makeZombie(this, 1330 , 590, "zombie1");

        this.makeZombie(this, 1400 , 620, "zombie1");
        this.makeZombie(this, 1480 , 530, "zombie1");
        this.makeZombie(this, 1520 , 420, "zombie1");
        this.makeZombie(this, 1560 , 310, "zombie1");
        this.makeZombie(this, 1610 , 570, "zombie1");
        this.makeZombie(this, 1680 , 520, "zombie1");

        this.makeZombie(this, 1700 , 500, "zombie1");
        this.makeZombie(this, 1780 , 350, "zombie1");
        this.makeZombie(this, 1790 , 660, "zombie1");
        this.makeZombie(this, 1860 , 550, "zombie1");
        this.makeZombie(this, 1910 , 320, "zombie1");
        this.makeZombie(this, 1950 , 690, "zombie1");

        this.makeZombie(this, 2400 , 600, "zombie1");
        this.makeZombie(this, 2480 , 550, "zombie1");
        this.makeZombie(this, 2690 , 360, "zombie1");
        this.makeZombie(this, 2660 , 650, "zombie1");
        this.makeZombie(this, 2810 , 520, "zombie1");
        this.makeZombie(this, 2950 , 490, "zombie1");

        this.makeZombie(this, 3200 , 500, "zombie1");
        this.makeZombie(this, 3280 , 350, "zombie1");
        this.makeZombie(this, 3390 , 660, "zombie1");
        this.makeZombie(this, 3460 , 550, "zombie1");
        this.makeZombie(this, 3510 , 320, "zombie1");
        this.makeZombie(this, 3650 , 690, "zombie1");

        this.makeZombie(this, 3700 , 350, "zombie1");
        this.makeZombie(this, 3780 , 550, "zombie1");
        this.makeZombie(this, 3890 , 710, "zombie1");
        this.makeZombie(this, 3960 , 650, "zombie1");
        this.makeZombie(this, 4010 , 620, "zombie1");
        this.makeZombie(this, 4150 , 380, "zombie1");

        this.makeZombie(this, 4300 , 480, "zombie1");
        this.makeZombie(this, 4480 , 390, "zombie1");
        this.makeZombie(this, 4590 , 480, "zombie1");
        this.makeZombie(this, 4660 , 500, "zombie1");
        this.makeZombie(this, 4810 , 530, "zombie1");
        this.makeZombie(this, 4850 , 610, "zombie1");

        this.makeZombie(this, 4900 , 530, "zombie1");
        this.makeZombie(this, 5080 , 370, "zombie1");
        this.makeZombie(this, 5190 , 530, "zombie1");
        this.makeZombie(this, 5260 , 370, "zombie1");
        this.makeZombie(this, 5310 , 420, "zombie1");
        this.makeZombie(this, 5450 , 410, "zombie1");


        this.physics.add.overlap(this.player1, this.zombies, function(player1, zombie) {
            if (!player1.getData("isDead") &&
                !zombie.getData("isDead")) {
                if((player1.getData("canHurt1") == true))
                {
/*
                    console.log("Calling P1 hurt function");
*/
                    player1.hurtMe1();
                }
            }
        });

        this.physics.add.overlap(this.player2, this.zombies, function(player2, zombie) {
            if (!player2.getData("isDead") &&
                !zombie.getData("isDead")) {
                if((player2.getData("canHurt2") == true))
                {
                    /*
                                        console.log("Calling P1 hurt function");
                    */
                    player2.hurtMe2();
                }
            }
        });

        this.physics.add.overlap(this.player1bullets, this.zombies, function(p1bullet, zombie) {
            if (zombie) {
                if(!zombie.getData("isDead"))
                {
                    if(zombie.getData("canHurtZombie") == true)
                    {
                        zombie.hurtZombie();
                    }
                }
                p1bullet.destroy();
            }
        });

        this.physics.add.overlap(this.player2bullets, this.zombies, function(p2bullet, zombie) {
            if (zombie) {
                if(!zombie.getData("isDead"))
                {
                    if(zombie.getData("canHurtZombie") == true)
                    {
                        zombie.hurtZombie();
                    }
                }
                p2bullet.destroy();
            }
        });

        this.physics.add.collider(this.zombies, wallLayer);

        this.physics.add.collider(this.player1bullets, wallLayer, function(p1bullet){
            if(p1bullet)
            {
                p1bullet.destroy();
            }
        })

        this.physics.add.collider(this.player2bullets, wallLayer, function(p2bullet){
            if(p2bullet)
            {
                p2bullet.destroy();
            }
        })

        this.anims.create({
            key: "bloodSplatter",
            frames: this.anims.generateFrameNumbers("bloodSplatter"),
            frameRate: 20,
            repeat: 0
        });

        //sets up player 1 health text
        p1healthText = this.add.text(this.game.config.width * 0.1, 48, "P1 Health: " + this.player1.getData("health1"), {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        p1healthText.setScrollFactor(0,0);
        p1healthText.setDepth(40);

        //sets up player 1 health bar
        p1HealthBar=this.makeHealthBar(80,100,0xe74c3c);
        this.setBarValue(p1HealthBar,100);

        //stops health bar from moving from fixed point on screen
        p1HealthBar.setScrollFactor(0,0);
        p1HealthBar.setDepth(40);


        //sets up player 2 health text
        p2healthText = this.add.text(this.game.config.width * 0.6, 48, "P2 Health: " + this.player2.getData("health2"), {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        p2healthText.setScrollFactor(0,0);
        p2healthText.setDepth(40);

        //sets up player 2 health bar
        p2HealthBar=this.makeHealthBar(this.game.config.width * 0.6,100,0xe74c3c);
        this.setBarValue(p2HealthBar,100);

        //stops health bar from moving from fixed point on screen
        p2HealthBar.setScrollFactor(0,0);
        p2HealthBar.setDepth(40);

        this.goal = new Goal(this, 6000, 400, "goal");
        this.goal.assignScene("Level2");

        this.physics.add.collider(this.player1, this.goal, function(player1, goal) {
            if (player1) {
                goal.loadScene();
            }
        });

        this.physics.add.collider(this.player2, this.goal, function(player2, goal) {
            if (player2) {
                goal.loadScene();
            }
        });

        level1music = this.sound.add("level1Music", {loop: true});
        level1music.play();
    }

    update() {
        //scoreText.setText('Score: ' + score);

        //handles player 1 health text
        if(this.p1Alive)
        {
            p1healthText.setText("P1 Health: " + this.player1.getData("health1"));
        }
        else
        {
            p1healthText.setText("P1 Health: 0");
        }

        //handles player 2 health text
        if(this.p2Alive)
        {
            p2healthText.setText("P2 Health: " + this.player2.getData("health2"));
        }
        else
        {
            p2healthText.setText("P2 Health: 0");
        }

        //Player 1 update code
        if (this.p1Alive){
            if (!this.player1.getData("isDead")) {
                this.player1.update();
                if (this.keyW.isDown) {
                    this.player1.moveUp();
                    /*this.player.angle = 0;
                    console.log("Player angle in update is " + this.player.angle);*/
                }
                else if (this.keyS.isDown) {
                    this.player1.moveDown();
                    /*this.player.angle = 180;
                    console.log("Player angle in update is " + this.player.angle);*/
                }
                if (this.keyA.isDown) {
                    this.player1.moveLeft();
                    /*this.player.angle = 270;
                    console.log("Player angle in update is " + this.player.angle);*/
                }
                else if (this.keyD.isDown) {
                    this.player1.moveRight();
                    /*this.player.angle = 90;
                    console.log("Player angle in update is " + this.player.angle);*/
                }

                if (this.keySpace.isDown) {
                    this.player1.setData("isShooting1", true);
                }
                else {
                    this.player1.setData("timerShootTick1", this.player1.getData("timerShootDelay1") - 1);
                    this.player1.setData("isShooting1", false);
                }
                /*
                            scoreText.setText('Score: ' + score);
                */

                this.player1.x = Phaser.Math.Clamp(this.player1.x, 0, backgroundLayer.width);
                this.player1.y = Phaser.Math.Clamp(this.player1.y, 0, backgroundLayer.height);
            }
            else
            {
                console.log("Uh oh! Player 1 is dead! We're screwed now!");
            }
        }

        //Player 2 update code
        if (this.p2Alive){
            if (!this.player2.getData("isDead")) {
                this.player2.update();
                if (this.keyUp.isDown) {
                    this.player2.moveUp();
                    /*this.player.angle = 0;
                    console.log("Player angle in update is " + this.player.angle);*/
                }
                else if (this.keyDown.isDown) {
                    this.player2.moveDown();
                    /*this.player.angle = 180;
                    console.log("Player angle in update is " + this.player.angle);*/
                }
                if (this.keyLeft.isDown) {
                    this.player2.moveLeft();
                    /*this.player.angle = 270;
                    console.log("Player angle in update is " + this.player.angle);*/
                }
                else if (this.keyRight.isDown) {
                    this.player2.moveRight();
                    /*this.player.angle = 90;
                    console.log("Player angle in update is " + this.player.angle);*/
                }

                if (this.keyShoot.isDown) {
                    this.player2.setData("isShooting2", true);
                }
                else {
                    this.player2.setData("timerShootTick2", this.player2.getData("timerShootDelay2") - 1);
                    this.player2.setData("isShooting2", false);
                }
                /*
                            scoreText.setText('Score: ' + score);
                */

                //locks Player 2 within camera bounds (hopefully)
                /*if(!this.player1.getData("isDead"))
                {
                    this.player2.x = Phaser.Math.Clamp(this.player2.x, cameraMain.x - 400, cameraMain.x + 400);
                    this.player2.y = Phaser.Math.Clamp(this.player2.y, cameraMain.y - 400, cameraMain.y + 400);

                }
                else
                {

                }*/
                /*if(!this.p1Alive)
                {
                    this.player2.x = Phaser.Math.Clamp(this.player2.x, 0, backgroundLayer.width);
                    this.player2.y = Phaser.Math.Clamp(this.player2.y, 0, backgroundLayer.height);
                }*/
                this.player2.x = Phaser.Math.Clamp(this.player2.x, 0, backgroundLayer.width);
                this.player2.y = Phaser.Math.Clamp(this.player2.y, 0, backgroundLayer.height);
            }
            else
            {
                console.log("Player 2 is dead? ...sucks for them.");
            }
        }


        for (var i = 0; i < this.zombies.getChildren().length; i++) {
            var zombie = this.zombies.getChildren()[i];

            zombie.update();
        }

        /*
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];

            enemy.update();

            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {
                if (enemy) {
                    if (enemy.onDestroy !== undefined) {
                        enemy.onDestroy();
                    }
                    enemy.destroy();
                }
            }
        }

        for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
            var laser = this.enemyLasers.getChildren()[i];
            laser.update();
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
        */

        /*
        for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
            var laser = this.playerLasers.getChildren()[i];
            laser.update();
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
        */

        //Player 1 bullet update code
        for (var i = 0; i < this.player1bullets.getChildren().length; i++) {
            var p1bullet = this.player1bullets.getChildren()[i];
            p1bullet.update();
        }

        //Player 2 bullet update code
        for (var i = 0; i < this.player2bullets.getChildren().length; i++) {
            var p2bullet = this.player2bullets.getChildren()[i];
            p2bullet.update();
        }

        /*
        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }
        */

        //calls game over function if both players die
        if(!this.p1Alive && !this.p2Alive)
        {
            console.log("Player 1 is dead? " + this.player1.getData("isDead"));
            console.log("Player 2 is dead? " + this.player2.getData("isDead"));
            this.scene.scene.time.delayedCall(1000, this.gameOver, [], this);
            /*this.scene.time.delayedCall(500, this.canHurtThisZombie, [], this);*/
        }
    }

    makeZombie(scene, x, y, key)
    {
        var zombie = null;
        zombie = new Zombie(scene, x, y, key);
        if (zombie !== null) {
/*
            enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
*/
            this.zombies.add(zombie);
        }
    }


    gameOver()
    {
        this.game.sound.stopAll();
        this.scene.start("SceneGameOver");
    }

    passTheBuck()
    {
        if(this.p2Alive)
        {
            console.log("Player 1 died! Time for Player 2 to get some screen time.");
            this.cameraMain.startFollow(this.player2);
        }
    }

    makeHealthBar(x, y,color) {
        //draw the bar
        let bar = this.add.graphics();

        //color the bar
        bar.fillStyle(color, 1);

        //fill the bar with a rectangle
        bar.fillRect(0, 0, 200, 30);

        console.log("Bar drawn at X " + bar.x + "and Y" + bar.y);
        //position the bar
        bar.x = x;
        bar.y = y;

        //return the bar
        return bar;
    }
    setBarValue(bar,percentage) {
        //scale the bar
        console.log("Percentage should be " + percentage);
        bar.scaleX = percentage/100;
    }

    setZombieTarget(target)
    {
        for (var i = 0; i < this.zombies.getChildren().length; i++) {
            var zombie = this.zombies.getChildren()[i];

            zombie.setData("target", target);
        }
    }

    //small function to stop all audio, trying to use same code directly within entities file caused crashes
    stopAudio()
    {
        this.game.sound.stopAll();
    }

    /*makeGoal(x, y, key)
    {
        var goal = null;
        goal = new goal(scene, x, y, key);
    }*/
}