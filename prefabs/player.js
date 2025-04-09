class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
        this.setScale(.12);

        this.controles = scene.input.keyboard.createCursorKeys();
        this.keyW = scene.input.keyboard.addKey('W');
        this.keyA = scene.input.keyboard.addKey('A');
        this.keyS = scene.input.keyboard.addKey('S');
        this.keyD = scene.input.keyboard.addKey('D');
        this.keyF = scene.input.keyboard.addKey('F');
        this.shiftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.velocidadBase = 200;
        this.velocidadCorrer = 500;
        this.velocidadActual=0;
    }

    MovimientoJugador() {
        this.setVelocity(0);


        

        if (this.controles.up.isDown || this.keyW.isDown) {
            this.velocidadActual = this.shiftKey.isDown ? this.velocidadCorrer : this.velocidadBase;
            this.setVelocityY(-this.velocidadActual);
            this.flipY=true;
        }
        else if (this.controles.left.isDown || this.keyA.isDown) {
            this.velocidadActual = this.shiftKey.isDown ? this.velocidadCorrer : this.velocidadBase;
            this.setVelocityX(-this.velocidadActual);
            this.flipX=true;

        }
        else if (this.controles.down.isDown || this.keyS.isDown) {
            this.velocidadActual = this.shiftKey.isDown ? this.velocidadCorrer : this.velocidadBase;
            this.setVelocityY(this.velocidadActual);
            this.flipY=false;
        }
        else if (this.controles.right.isDown || this.keyD.isDown) {
            this.velocidadActual = this.shiftKey.isDown ? this.velocidadCorrer : this.velocidadBase;
            this.setVelocityX(this.velocidadActual);
            this.flipX=false;

        }
    }

}