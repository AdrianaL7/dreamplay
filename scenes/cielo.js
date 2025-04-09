export default class Cielo extends Phaser.Scene {
    
    constructor() {
        super({ key: "Cielo" });
    }
    preload() {
        this.load.image('player', 'assets/sprites/player/jump/player.png');
        this.load.image("btnCasa","assets/gui/botones/casa.png");
        this.load.image("btnInteractuar","assets/gui/alerta.png");
        this.load.image("btnCieMJuego","assets/cielo/arco2.png");
        this.load.image('fondo', 'assets/fondos/bg.png');
        this.load.image('coi','assets/sprites/npcs/vk.png')
        
    }

    create() {
        

        this.player = new Player(this, 1000, 800, 'player');
        this.add.existing(this.player)
        this.player.setDepth(1);
        this.cameras.main.startFollow(this.player, false, 1, 1);


        this.add.image(0, 0, 'fondo')
        .setOrigin(0, 0)  
        .setScale(4)  
        .setScrollFactor(1, 1)
        .setDepth(-6);





        const mundo = this.add.image(500, 500, 'fondo')
        .setOrigin(0, 0)  
        .setScale(1)  
        .setScrollFactor(1, 1)
        .setDepth(-4);
        
        this.coi= this.physics.add.staticSprite(1440, 800, 'coi').setScale(.025);
        this.coi.flipX=true;
        this.coi.refreshBody();
        
        this.add.existing(this.coi)
        this.physics.add.collider(this.coi, this.player);

        this.btnInteractuarCoi = this.add.sprite(1440, 755, 'btnInteractuar').setInteractive().setDepth(2).setScale(.09);
        this.btnInteractuarCoi.setActive(false).setVisible(false);

        this.zonecoi = this.add.zone(1440, 800, 170, 170);
        this.physics.add.existing(this.zonecoi, false);
        this.zonecoi.body.moves = false;

        this.physics.add.overlap(this.zonecoi, this.player)
        






        this.physics.world.setBounds(500, 500, mundo.width, mundo.height);

        




        this.btnCasa = this.add.sprite(20, 50, 'btnCasa').setInteractive().setScale(.09);
        this.btnCasa.setOrigin(0, 1);
        this.btnCasa.setScrollFactor(0, 0);
        this.btnCasa.setDepth(2);
        this.btnCasa.on('pointerdown', () => {
            this.scene.start('Mascota');
        });


        this.btnMiniJuego = this.add.sprite(500+(mundo.width/2), 550, 'btnCieMJuego').setInteractive().setScale(.08);
        this.btnMiniJuego.on('pointerdown', () => {
            this.scene.start('CieMJuego');
        });
        



        
    }
    
    Interactuar()
    {   
        let estadocoi=this.zonecoi.body.embedded ? true : false
        this.btnInteractuarCoi.setActive(estadocoi).setVisible(estadocoi);
        if(estadocoi)
        {   
            this.btnInteractuarCoi.on('pointerdown', () => {
                console.log("hola")
            });
            if(this.player.keyF.isDown)
            {
                console.log("hola")
            }
            
        }
    }

    update() {

        this.player.MovimientoJugador();
        this.zonecoi.body.debugBodyColor = this.zonecoi.body.touching.none ? 0x00CCC : 0xffff00;
        this.Interactuar();
    }
}

