var titleBG;
var menuAudio;
var level1music;
var level2music;
var level3music;
var gameOverMusic;
var winMusic;


class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMainMenu" });
    }

    preload() {
        this.load.image("sprBg0", "../assets/images/sprBg0.png");
        this.load.image("sprBg1", "../assets/images/sprBg1.png");
        this.load.image("playButton", "../assets/wodImages/StartGameButton.png");
        this.load.image("playButtonHover", "../assets/wodImages/StartGameButtonHover.png");
        this.load.image("playButtonDown", "../assets/wodImages/StartGameButtonDown.png");
        this.load.audio("sndBtnOver", "../assets/wodSFX/405538__nebulasnails__pistol-cock1.wav");
        this.load.audio("sndBtnDown", "../assets/wodSFX/405538__nebulasnails__pistol-cock2.wav");
        this.load.image("titleBG", "../assets/wodImages/Title.png");
        this.load.audio("menuNoise", "../assets/wodMusic/266523__staticpony1__alien-alarm.wav");
    }


    create() {
        titleBG = this.add.image(game.config.width / 2, (game.config.height / 2), "titleBG");

        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown")
        };

        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "playButton"
        );

        this.btnPlay.setInteractive();

        this.btnPlay.on("pointerover", function() {
            this.btnPlay.setTexture("playButtonHover"); // set the button texture to sprBtnPlayHover
            this.sfx.btnOver.play(); // play the button over sound
        }, this);

        this.btnPlay.on("pointerout", function() {
            this.setTexture("playButton");
        });

        this.btnPlay.on("pointerdown", function() {
            this.btnPlay.setTexture("playButtonDown");
            this.sfx.btnDown.play();
        }, this);

        this.btnPlay.on("pointerup", function() {
            this.btnPlay.setTexture("playButton");
            this.game.sound.stopAll();
            this.scene.start("Level1");
        }, this);

        menuAudio = this.sound.add("menuNoise", {loop: true});
        menuAudio.play();

        this.title = this.add.text(this.game.config.width * 0.5, 600, "EPILEPSY WARNING: Some graphics may appear to flicker slightly in Levels 2 and 3", {
            fontFamily: 'monospace',
            fontSize: 16,
            fontStyle: 'bold',
            color: '#FF0000',
            align: 'center'
        });
        this.title.setOrigin(0.5);

    }

    update() {

    }
}