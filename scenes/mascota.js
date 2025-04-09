export default class Mascota extends Phaser.Scene {
    
    constructor() {
        super({ key: "Mascota" });
    }
    preload() {
        this.load.image("btnPaseo","assets/gui/botones/paseo.png");
        this.load.image("btnComida","assets/gui/botones/comida.png");
        this.load.image("btnMusica","assets/gui/botones/musica.png");
        this.load.image("btnJuego","assets/gui/botones/jugar.png");
        this.load.image("btnRopa","assets/gui/botones/ropa.png");
        this.load.image("btnSalir","assets/gui/botones/atras.png");


    }

    create() {
        const centerX = this.cameras.main.centerX; 
        const centerY = this.cameras.main.centerY;
        const fondo = this.add.image(0, 0, 'fondo')
        .setOrigin(0, 0)  
        .setScrollFactor(0, 0)
        .setScale(1.5);
        //Boton Salir
        this.btnSalir = this.add.sprite(25, 25, 'btnSalir').setInteractive().setScale(.09);
        this.btnSalir.on('pointerdown', () => {
            this.scene.start('Inicio');
        });

        //Boton Paseo
        this.btnPaseo = this.add.sprite(this.cameras.main.width - 25, 25, 'btnPaseo').setInteractive().setScale(.09);
        this.btnPaseo.on('pointerdown', () => {
            this.scene.start('Cielo');
        });





        //Boton Comida
        this.btnComida = this.add.sprite(this.cameras.main.width - 25, centerY-130, 'btnComida').setInteractive().setScale(.09);
        this.btnComida.on('pointerdown', () => {
            console.log("comida")
        });

        //Boton Juego
        this.btnJuego = this.add.sprite(this.cameras.main.width - 25, centerY-60, 'btnJuego').setInteractive().setScale(.09);
        this.btnJuego.on('pointerdown', () => {
            console.log("Juego")
        });

        //Boton Ropa
        this.btnRopa = this.add.sprite(this.cameras.main.width - 25, centerY+10, 'btnRopa').setInteractive().setScale(.09);
        this.btnRopa.on('pointerdown', () => {
            console.log("Ropa")
        });

        //Boton Musica
        this.btnMusica = this.add.sprite(this.cameras.main.width - 25, centerY+80, 'btnMusica').setInteractive().setScale(.09);
        this.btnMusica.on('pointerdown', () => {
        });










        const AnimGI = this.add.sprite(centerX, centerY-50, 'gipsy');
        AnimGI.setScale(.28);



    }


    update() {

    }
}

