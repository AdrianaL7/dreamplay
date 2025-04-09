export default class Inicio extends Phaser.Scene {
    
    constructor() {
        super({ key: "Inicio" });
    }
    preload() {
        this.load.image("btnInicio","assets/gui/botones/play.png");
        this.load.image("logo","assets/gui/inicio/logodp.png");
        this.load.image('fondo', 'assets/fondos/bg.png')


        this.load.image('gipsy', 'assets/gui/inicio/gipsy.png');





    }

    create() {

        const centerX = this.cameras.main.centerX; 
        const centerY = this.cameras.main.centerY;

        const posX = this.cameras.main.width - 25;
        const posY = 25;
        const fondo = this.add.image(0, 0, 'fondo')
        .setOrigin(0, 0)  
        .setScrollFactor(0, 0)
        .setScale(1.5);





        //Boton Info
        




        //Boton Inicio

        this.logo=this.add.image(centerX, centerY-170, 'logo');
        this.logo.setScale(.16);
        this.btnInicio = this.add.sprite(centerX, centerY+80, 'btnInicio').setInteractive();
        this.btnInicio.setScale(.17);
        
        this.btnInicio.on('pointerdown', () => {
            this.scene.start('Mascota');
        });

        
        //this.anims.create({
            //key: 'GipsyI',
           // frames: [
                //{ key: 'frame1' },
                //{ key: 'frame2' },
              //  { key: 'frame3' },
            //],
            //frameRate: 10, 
           // repeat: -1, 
       // });


        const AnimGI = this.add.image(centerX, centerY-50, 'gipsy');
        AnimGI.setScale(.28);

    }


    update() {

        
    }
}

