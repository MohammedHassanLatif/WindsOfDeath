var screenBG;

class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({ key: "SceneGameOver" });
    }
    preload()
    {
        this.load.image("gameOver", "../assets/wodImages/GameOver.png");
        this.load.image("restartButton", "../assets/wodImages/RestartGameButton.png");
        this.load.image("restartButtonHover", "../assets/wodImages/RestartGameButtonHover.png");
        this.load.image("restartButtonDown", "../assets/wodImages/RestartGameButtonDown.png");
        this.load.audio("gameOverNoise", "../assets/wodMusic/243925__patricklieberkind__creepy-ambient-noises.wav");
    }

    create() {
        screenBG = this.add.image(game.config.width / 2, (game.config.height / 2) + 48, "gameOver");

        this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#FF0000',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown")
        };

        this.btnRestart = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.75,
            "restartButton"
        );

        this.btnRestart.setInteractive();

        this.btnRestart.on("pointerover", function() {
            this.btnRestart.setTexture("restartButtonHover"); // set the button texture to sprBtnPlayHover
            this.sfx.btnOver.play(); // play the button over sound
        }, this);

        this.btnRestart.on("pointerout", function() {
            this.setTexture("restartButton");
        });

        this.btnRestart.on("pointerdown", function() {
            this.btnRestart.setTexture("restartButtonDown");
            this.sfx.btnDown.play();
        }, this);

        this.btnRestart.on("pointerup", function() {
            score = 0;
            canScore = true;
            this.btnRestart.setTexture("restartButton");
            this.game.sound.stopAll();
            this.scene.start("SceneMainMenu");
        }, this);

        gameOverMusic = this.sound.add("gameOverNoise", {loop: true});
        gameOverMusic.play();
    }

    update() {

    }
}