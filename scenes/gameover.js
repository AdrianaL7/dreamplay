export default class GameOver extends Phaser.Scene {
    
    constructor() {
        super({ key: "GameOver" });
    }
    preload() {
        this.load.image("btnSalir2","assets/gui/botones/play.png");
        this.load.image("fondogm","assets/fondos/bg3.png");
    }

    create() {

        const centerX = this.cameras.main.centerX; 
        const centerY = this.cameras.main.centerY;



        
        this.add.image(0, 0, 'fondogm').setScale(2);
        this.add.text(centerX-124.9,centerY-100, `Game Over`, {
            fontSize: '30px',
            fill: '#ffffff',
            fontFamily: 'PressStart2P',
            stroke: '#BB40A7',
            strokeThickness: 3
        });
        //Boton Info
        this.btnSalir2 = this.add.sprite(centerX, centerY+25, 'btnSalir2').setInteractive();
        this.btnSalir2.setScale(.15);
        this.btnSalir2.on('pointerdown', () => {
            this.scene.start('CieMJuego');
        });


    }


    update() {

        
    }
}

