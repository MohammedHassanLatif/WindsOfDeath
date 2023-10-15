var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 800,
    backgroundColor: "black",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 }
        }
    },
    scene: [
        SceneMainMenu,
        Level1,
        Level2,
        Level3,
        SceneGameOver,
        win
    ],
    pixelArt: true,
    roundPixels: false,
};

var game = new Phaser.Game(config);

/*THIS IS THE CURRENT LOCAL VERSION*/
