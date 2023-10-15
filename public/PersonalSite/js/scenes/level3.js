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
var mapTrois;
var tilesetTrois;
var backgroundLayerTrois;
var backgroundLayer1Trois;
var wallLayerTrois;
var cameraMain;

var p1healthText;
var p1Alive;
var p1HealthBar

var p2healthText;
var p2Alive;
var p2HealthBar;


class Level3 extends Phaser.Scene {
    constructor() {
        super({ key: "Level3" });
    }



    preload() {


        this.load.image("p1bullet", "../assets/wodImages/projectile1.png");
        this.load.image("player1", "../assets/wodImages/theGuy1.png");
        this.load.image("p2bullet", "../assets/wodImages/projectile2.png");
        this.load.image("player2", "../assets/wodImages/theGuy2.png");

        this.load.image("zombie1", "../assets/wodImages/zombie1.png");

        this.load.image("tilesTrois", "../assets/maps/ForestAssets.png");
        this.load.tilemapTiledJSON("mapTrois", "../assets/maps/ForestLevel3.json");

        this.load.spritesheet("bloodSplatter", "../assets/wodImages/bloodSplatter.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.image("goal", "../assets/wodImages/GOAL.png");

        this.load.audio("level3Music", "../assets/wodMusic/Feral Chase.mp3");

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
            180,
            "player1",
            isPlayer1 = true
        );
        console.log(this.player1);
        console.log("P1 x is " + this.player1.x);
        console.log("P1 y is " + this.player1.y);
        this.p1Alive = true;

        this.player2 = new Player2(
            this,
            this.game.config.width * 0.5,
            740,
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

        mapTrois = this.make.tilemap({ key: "mapTrois" });
        tilesetTrois = mapTrois.addTilesetImage("ForestAssetsTiles", "tilesTrois");
        backgroundLayerTrois = mapTrois.createStaticLayer('Floor', tilesetTrois, 0, 0);
        backgroundLayer1Trois = mapTrois.createStaticLayer('Decoration', tilesetTrois, 0, 0);
        wallLayerTrois = mapTrois.createStaticLayer('Colliders', tilesetTrois, 0, 0);

        wallLayerTrois.setCollisionByProperty({ collides: true});
        this.physics.add.collider(this.player1, wallLayerTrois);
        this.physics.add.collider(this.player2, wallLayerTrois);

        this.player1.setDepth(10);
        this.player2.setDepth(10);

        this.cameraMain = this.cameras.main;
        this.cameraMain.startFollow(this.player1);

        this.cameraMain.setBounds(0,0, backgroundLayerTrois.width, backgroundLayerTrois.height);
        console.log("Camera X is " + this.cameraMain.x);
        console.log("Camera max X is " + ((this.cameraMain.x) + (this.game.config.width)));

        this.zombies = this.add.group();

        //river top zombies
        this.makeZombie(this, 660 , 120, "zombie1");
        this.makeZombie(this, 690 , 100, "zombie1");
        this.makeZombie(this, 740 , 100, "zombie1");
        this.makeZombie(this, 850 , 130, "zombie1");
        this.makeZombie(this, 890 , 120, "zombie1");
        this.makeZombie(this, 930 , 130, "zombie1");

        //zombies on bridge
        this.makeZombie(this, 1120 , 110, "zombie1");
        this.makeZombie(this, 1130 , 110, "zombie1");
        this.makeZombie(this, 1120 , 330, "zombie1");
        this.makeZombie(this, 1140 , 450, "zombie1");
        this.makeZombie(this, 1180 , 590, "zombie1");
        this.makeZombie(this, 1200 , 120, "zombie1");

        //river bottom zombies
        this.makeZombie(this, 820 , 720, "zombie1");
        this.makeZombie(this, 880 , 680, "zombie1");
        this.makeZombie(this, 920 , 720, "zombie1");
        this.makeZombie(this, 980 , 680, "zombie1");
        this.makeZombie(this, 900 , 720, "zombie1");
        this.makeZombie(this, 940 , 680, "zombie1");
        this.makeZombie(this, 1080 , 700, "zombie1");
        this.makeZombie(this, 1150 , 690, "zombie1");

        this.makeZombie(this, 1220 , 700, "zombie1");
        this.makeZombie(this, 1410 , 670, "zombie1");
        this.makeZombie(this, 1460 , 720, "zombie1");
        this.makeZombie(this, 1510 , 680, "zombie1");

        this.makeZombie(this, 1830 , 690, "zombie1");
        this.makeZombie(this, 1840 , 640, "zombie1");
        this.makeZombie(this, 1820 , 600, "zombie1");
        this.makeZombie(this, 1880 , 540, "zombie1");
        this.makeZombie(this, 1860 , 450, "zombie1");
        this.makeZombie(this, 1810 , 380, "zombie1");

        this.makeZombie(this, 1960 , 470, "zombie1");
        this.makeZombie(this, 1980 , 380, "zombie1");
        this.makeZombie(this, 2030 , 400, "zombie1");
        this.makeZombie(this, 2090 , 350, "zombie1");
        this.makeZombie(this, 2160 , 280, "zombie1");
        this.makeZombie(this, 2210 , 260, "zombie1");

        this.makeZombie(this, 2290 , 250, "zombie1");
        this.makeZombie(this, 2340 , 250, "zombie1");
        this.makeZombie(this, 2410 , 240, "zombie1");
        this.makeZombie(this, 2480 , 260, "zombie1");
        this.makeZombie(this, 2560 , 280, "zombie1");
        this.makeZombie(this, 2680 , 260, "zombie1");

        this.makeZombie(this, 2800 , 450, "zombie1");
        this.makeZombie(this, 2890 , 450, "zombie1");
        this.makeZombie(this, 2970 , 540, "zombie1");
        this.makeZombie(this, 3040 , 460, "zombie1");
        this.makeZombie(this, 3120 , 480, "zombie1");
        this.makeZombie(this, 3250 , 460, "zombie1");

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

        this.physics.add.collider(this.zombies, wallLayerTrois);

        this.physics.add.collider(this.player1bullets, wallLayerTrois, function(p1bullet){
            if(p1bullet)
            {
                p1bullet.destroy();
            }
        })

        this.physics.add.collider(this.player2bullets, wallLayerTrois, function(p2bullet){
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

        this.goal = new Goal(this, 3670, 400, "goal");
        this.goal.assignScene("Win");

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

        level3music = this.sound.add("level3Music", {loop: true});
        level3music.play();
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

                this.player1.x = Phaser.Math.Clamp(this.player1.x, 0, backgroundLayerTrois.width);
                this.player1.y = Phaser.Math.Clamp(this.player1.y, 0, backgroundLayerTrois.height);
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
                this.player2.x = Phaser.Math.Clamp(this.player2.x, 0, backgroundLayerTrois.width);
                this.player2.y = Phaser.Math.Clamp(this.player2.y, 0, backgroundLayerTrois.height);
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