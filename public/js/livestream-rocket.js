
var config = {
    type: Phaser.AUTO,
    width: 300,
    height: 500,
    backgroundColor: "#b3e5fc",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: function () {
            // Chargement des images
            this.load.image('sky', 'assets/deep-space.jpg');
            this.load.bitmapFont('atari', 'assets/atari-classic.png', 'assets/atari-classic.xml');
            this.load.spritesheet('fire', 'assets/bullet4.png', {frameWidth: 25, frameHeight: 50});
            this.load.spritesheet('rocket', 'assets/rocket.png', {frameWidth: 22, frameHeight: 75});
            this.vel = 0;
            this.scoreVal = 0;
            this.fireScale = -0.5;
        },
        create: function () {
            // Setup + Affichage
            this.bg = this.add.tileSprite(0, 0, 300, 500, 'sky').setOrigin(0, 0);
            this.platforms = this.physics.add.staticGroup();
            this.player = this.physics.add.sprite(150, 400, "rocket");
            this.cursors = this.input.keyboard.createCursorKeys();
            this.scoreText = this.add.bitmapText(150, 25, 'atari', '@samm0101010', 16).setOrigin(0.5, 0.5)
            this.score = this.add.bitmapText(150, 50, 'atari', this.scoreVal, 12).setOrigin(0.5, 0.5)
            this.fire = this.add.sprite(150, 455, 'fire')
            this.fire.setScale(0.5)
            this.fire.rotation = 1.56
        },
        update: function() {
            // Logique du jeu
            if (this.cursors.space.isDown) {
                this.fire.setScale(1)
                if (this.vel < 0.5) {
                    this.scoreVal = 0
                    this.score.text = 0
                }
                if (this.fireScale < 0) {
                    this.fireScale += 1
                }
                this.vel += 0.12;
                this.bg._tilePosition.y -= this.vel;
            } else if (Math.round(this.vel) > 25 && !this.cursors.space.isDown) {
                this.vel -= 0.1;
                this.bg._tilePosition.y -= this.vel;
            } else if (Math.round(this.vel) > 0 && !this.cursors.space.isDown) {
                this.vel -= 0.02;
                this.bg._tilePosition.y -= this.vel;
            }
            if (!this.cursors.space.isDown) {
                this.fire.setScale(0.5)
            }
            if (Math.round(this.vel) > 0) {
                this.scoreVal += this.vel
                this.score.text = Math.round(this.scoreVal)
            }
            
        }
    }
};
let game = new Phaser.Game(config);