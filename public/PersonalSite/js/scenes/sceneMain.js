var score = 0;
var scoreText;
var highscore = 0;
var isPlayer = false;
var canScore = true;
var gameMusic;

class SceneMain extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMain" });
    }



    preload() {
        this.load.spritesheet("sprExplosion", "../assets/images/sprExplosion.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("sprEnemy0", "../assets/images/enemyShip0NEW.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("sprEnemy1", "../assets/images/enemyShip1NEW.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("sprEnemy2", "../assets/images/enemyShip2NEW.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("sprLaserEnemy0", "../assets/images/sprLaserEnemy0.png");
        this.load.image("sprLaserPlayer", "../assets/images/sprLaserPlayer.png");
        this.load.spritesheet("sprPlayer", "../assets/images/playerShipNEWright.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.audio("sndExplode0", "../assets/audio/sndExplode0.wav");
        this.load.audio("sndExplode1", "../assets/audio/sndExplode1.wav");
        this.load.audio("sndLaser", "../assets/audio/sndLaser.wav");
        this.load.audio("sndLaserEnemy", "../assets/audio/gunshot.wav");
        this.load.audio("gameMusic", "../assets/audio/music/cyborg-ninja-by-kevin-macleod-from-filmmusic-io.mp3");

    }

    create() {
        //var score = 0;
        //var scoreText;
        gameMusic = this.sound.add("gameMusic", {loop: true});
        gameMusic.play();

        scoreText = this.add.text(this.game.config.width * 0.1, 48, "Score: 0", {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });

        this.anims.create({
            key: "sprEnemy0",
            frames: this.anims.generateFrameNumbers("sprEnemy0"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "sprEnemy1",
            frames: this.anims.generateFrameNumbers("sprEnemy1"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "sprEnemy2",
            frames: this.anims.generateFrameNumbers("sprEnemy2"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "sprExplosion",
            frames: this.anims.generateFrameNumbers("sprExplosion"),
            frameRate: 20,
            repeat: 0
        });
        this.anims.create({
            key: "sprPlayer",
            frames: this.anims.generateFrameNumbers("sprPlayer"),
            frameRate: 20,
            repeat: -1
        }); //creates player ship sprite anims

        this.sfx = {
            explosions: [
                this.sound.add("sndExplode0", {volume: 0.5}),
                this.sound.add("sndExplode1", {volume: 0.5})
            ],
            laser: this.sound.add("sndLaser", {volume: 0.5}),
            enemyLaser: this.sound.add("sndLaserEnemy", {volume: 0.5})

        };

        this.sfx.laser.setVolume(0.5);
        this.backgrounds = [];
        for (var i = 0; i < 5; i++) {
            var bg = new ScrollingBackground(this, "sprBg0", i * 10);
            this.backgrounds.push(bg);
        }

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprPlayer",
            isPlayer = true
        );
        console.log(this.player);

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();

        this.time.addEvent({
            delay: 1000,
            callback: function() {
                var enemy = null;

                if (Phaser.Math.Between(0, 10) >= 3) {
                    enemy = new GunShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                }
                else if (Phaser.Math.Between(0, 10) >= 5) {
                    if (this.getEnemiesByType("ChaserShip").length < 5) {

                        enemy = new ChaserShip(
                            this,
                            Phaser.Math.Between(0, this.game.config.width),
                            0
                        );
                    }
                }
                else {
                    enemy = new CarrierShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                }

                if (enemy !== null) {
                    enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
                    this.enemies.add(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy();

                    //score += 10;
                    //scoreText.setText('Score: ' + score);
                }
                enemy.explode(true);
                playerLaser.destroy();
            }
        });

        this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
            if (!player.getData("isDead") &&
                !enemy.getData("isDead")) {
                player.explode(false);
                player.onDestroy();
                enemy.explode(true);
                if (score > highscore)
                {
                    highscore = score;
                }
            }
        });

        this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
            if (!player.getData("isDead") &&
                !laser.getData("isDead")) {
                player.explode(false);
                player.onDestroy();
                laser.destroy();
                if (score > highscore)
                {
                    highscore = score;
                }
            }
        });
    }

    getEnemiesByType(type) {
        var arr = [];
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            if (enemy.getData("type") == type) {
                arr.push(enemy);
            }
        }
        return arr;
    }

    update() {

        //scoreText.setText('Score: ' + score);

        if (!this.player.getData("isDead")) {
            this.player.update();
            if (this.keyW.isDown) {
                this.player.moveUp();
                /*this.player.angle = 0;
                console.log("Player angle in update is " + this.player.angle);*/
            }
            else if (this.keyS.isDown) {
                this.player.moveDown();
                /*this.player.angle = 180;
                console.log("Player angle in update is " + this.player.angle);*/
            }
            if (this.keyA.isDown) {
                this.player.moveLeft();
                /*this.player.angle = 270;
                console.log("Player angle in update is " + this.player.angle);*/
            }
            else if (this.keyD.isDown) {
                this.player.moveRight();
                /*this.player.angle = 90;
                console.log("Player angle in update is " + this.player.angle);*/
            }

            if (this.keySpace.isDown) {
                this.player.setData("isShooting", true);
            }
            else {
                this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
                this.player.setData("isShooting", false);
            }
            scoreText.setText('Score: ' + score);
        }

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

        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }
    }
}