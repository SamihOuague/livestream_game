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
            this.load.spritesheet('stock', 'assets/reservoir.png', {frameWidth: 18, frameHeight: 100});
            this.load.spritesheet('fuel', 'assets/redsquare.png', {frameWidth: 16, frameHeight: 10});
            this.load.spritesheet('jauge', 'assets/jauge.png', {frameWidth: 50, frameHeight: 8});
            this.load.spritesheet('minifuel', 'assets/miniredsquare.png', {frameWidth: 2, frameHeight: 2});
            this.vel = 0;
            this.scoreVal = 0;
            this.charged = false;
            this.lauched = false;
        },
        create: function () {
            // Setup + Affichage
            this.bg = this.add.tileSprite(0, 0, 300, 500, 'sky').setOrigin(0, 0);
            this.platforms = this.physics.add.staticGroup();
            this.player = this.physics.add.sprite(150, 400, "rocket");
            this.cursors = this.input.keyboard.createCursorKeys();
            this.scoreText = this.add.bitmapText(150, 25, 'atari', '@samm0101010', 16).setOrigin(0.5, 0.5);
            this.score = this.add.bitmapText(150, 50, 'atari', this.scoreVal, 12).setOrigin(0.5, 0.5);
            this.add.bitmapText(150, 180, 'atari', "KM/H", 12).setOrigin(0.5, 0.5);
            this.vitesse = this.add.bitmapText(150, 150, 'atari', 0, 12).setOrigin(0.5, 0.5);
            this.veloc = 0;
            this.fire = this.add.sprite(150, 455, 'fire');
            this.fire.setScale(0.5);
            this.fire.rotation = 1.56;
            this.physics.add.sprite(280, 390, "stock").setOrigin(0, 0)
            this.physics.add.sprite(150, 490, "jauge").setOrigin(0.5, 0.5)
            this.fuel = [];
            this.minifuel = [];
            this.yPos = 479;
            this.xPos = 131;
            this.fuelVolume = 0;
        },
        update: function() {
            // Logique du jeu
            if (this.cursors.space.isDown && !this.charged) {
                if (this.minifuel.length < 20) {
                    this.charged = true;
                } else {
                    console.log(this.minifuel.length);
                    for (let i = 0; i < 20; i++) {
                        this.minifuel[i].destroy();
                    }
                    this.minifuel = []
                    this.xPos = 131;
                    if (this.fuel.length < 10) {
                        this.fuel.push(this.physics.add.sprite(281, this.yPos, "fuel").setOrigin(0, 0))
                        this.yPos -= 9.8;
                    } else {
                        this.lauched = true;
                    }
                }
            } else if (!this.cursors.space.isDown && this.charged) {
                this.charged = false;
                this.minifuel.push(this.physics.add.sprite(this.xPos, 491, "minifuel").setOrigin(0.5, 0.5));
                this.xPos += 2;
            }

            if (this.fuel.length > 0 && this.lauched) {
                this.fire.setScale(1);
                this.vel += 0.12;
                this.veloc += 12;
                this.fuelVolume -= 1;
                if (this.fuelVolume % 100 == 0) {
                    this.fuel[this.fuel.length - 1].destroy();
                    this.fuel.pop();
                    this.yPos += 9.8;
                }
            } else if (this.lauched && this.fuel.length == 0) {
                this.fire.setScale(0.5);
                if (this.vel > 0) {
                    this.vel -= 0.11;
                    this.veloc -= 11;
                }
            }

            if (Math.round(this.vel) > 0) {
                this.scoreVal += this.vel;
                this.score.text = Math.round(this.scoreVal);
                this.vitesse.text = Math.round(this.veloc);
                this.bg._tilePosition.y -= this.vel;
            } else {
                this.vitesse.text = 0;
                if (this.fuelVolume == 0 && this.lauched) {
                    this.lauched = false;
                    this.yPos = 479;
                }
            }
        }
    }
};
let game = new Phaser.Game(config);