export default class CieMJuego extends Phaser.Scene {
    
    constructor() {
        super({ key: "CieMJuego" });
        this.puntaje = 0;
        this.ultimaPlataforma = null; 
    }
    preload() {
        this.load.image('player', 'assets/sprites/player/jump/player.png');
        this.load.image("btnCielo","assets/gui/botones/atras.png");
        this.load.image("plataforma", "assets/cielo/plataformas/plataformabase.png");
        this.load.image('fondo', 'assets/fondos/bg.png')
    }



    create() {
        this.ultimaPlataforma = null; 
		this.maxHeight = 0;
        this.puntosExtras = 0;



        

        this.controles = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        const fondo = this.add.image(0, 0, 'fondo')
        .setOrigin(0, 0)  
        .setDisplaySize(this.cameras.main.width, this.cameras.main.height)
        .setScrollFactor(0, 0);
        this.physics.world.setBounds(0, -Infinity, this.cameras.main.width, Infinity);

        const centerX = this.cameras.main.centerX; 
        const centerY = this.cameras.main.centerY;
        const cheigh=this.cameras.main.height-100
        this.player = new Player(this, centerX,  25, 'player');
        this.add.existing(this.player);
        this.physics.add.existing(this.player);
        
        this.player.setGravityY(800);
        this.player.setBounce(0.1);
        this.player.setDepth(1)
        this.player.refreshBody();
        this.player.setCollideWorldBounds(true);
        
        this.cameras.main.startFollow(this.player, false, 0, .03);

        this.btnCielo = this.add.sprite(20, 50, 'btnCielo').setInteractive();
        this.btnCielo.setOrigin(0, 1);
        this.btnCielo.setScrollFactor(1, 0);
        this.btnCielo.setDepth(2).setScale(.09);
        this.btnCielo.on('pointerdown', () => {
            this.scene.start('Cielo');
        });
        


        this.suelo = this.physics.add.staticImage(this.cameras.main.width / 2, this.player.body.y+90, 'plataforma');
        this.suelo.displayWidth = this.cameras.main.width;
        this.suelo.displayHeight = 70; 
        this.suelo.refreshBody();

        this.physics.add.collider(this.player, this.suelo);




        this.plataformas = this.physics.add.staticGroup();
            
        this.GenerarPlataformas();
         // Texto para mostrar el puntaje
         this.puntajeTexto = this.add.text(this.cameras.main.width - 20, 20, `PUNTAJE: ${this.puntaje}`, {
            fontSize: '15px',
            fill: '#ffffff',
            fontFamily: 'PressStart2P',
            stroke: '#BB40A7',
            strokeThickness: 3
        }).setOrigin(1, 0); // Alinea a la derecha
        this.puntajeTexto.setDepth(2);
        this.puntajeTexto.setScrollFactor(1, 0);
        // Colisión entre el jugador y las plataformas
        
        
        
    }



    Saltar() 
        {
            if (this.player.body.touching.down)
            {

            this.player.setVelocityY(-460)
            }
        }

    MovimientoLateral(){
        this.player.setVelocityX(0);
        if (this.controles.left.isDown || this.keyA.isDown) {
            this.player.setVelocityX(-200);
            this.player.flipX = true 
        }
        else if (this.controles.right.isDown || this.keyD.isDown) {
            this.player.setVelocityX(200); 
            this.player.flipX = false;  
        }

        this.input.on('pointermove',function(pointer)
        {
           this.player.x=Phaser.Math.Clamp(pointer.x,10,this.cameras.main.width - 10);
        }, this);

    }
        
    

    
    update(){
        const distance = Math.floor(Math.abs(this.player.body.bottom));
        this.MovimientoLateral();
        this.Saltar();
        this.ActualizarPlataformas();
        
        this.GameOver();

        if(distance>this.maxHeight)
        {
            this.maxHeight=distance;
            this.puntaje=  Math.floor(Math.abs(this.maxHeight/10)+this.puntosExtras);
            this.puntajeTexto.setText(`Puntaje: ${this.puntaje}`);
        }

            





        
    }
    
    GenerarPlataformas(){
        let yp=this.player.body.y
            for(let cont=0;cont<9;cont++)
            {
                
                let plata = this.plataformas.create(Phaser.Math.Between(40,this.cameras.main.width-40), yp, 'plataforma');
                plata.setScale(0.065);
                plata.refreshBody()
                plata.setImmovable(true)
                plata.body.checkCollision.down = false; 
                plata.body.checkCollision.left = false;
                plata.body.checkCollision.right = false;

                yp=yp-Phaser.Math.Between(75,110);
            }
        this.physics.add.collider(this.player, this.plataformas);
    }

    ActualizarPlataformas(){
        this.plataformas.children.iterate(child => {
            let platarriba =this.PlataformaArriba();
            const platform = child
            
            const scrollY = this.cameras.main.scrollY
            if (platform.y >= scrollY + this.cameras.main.height)
            {
                platform.y = platarriba.y-Phaser.Math.Between(75,110);
                platform.x=Phaser.Math.Between(40,this.cameras.main.width-40);
                platform.body.updateFromGameObject()
            }
            
        })
       
        if(this.suelo.y >=this.cameras.main.scrollY+700)
        {
            this.suelo.destroy();
        }
    }


    PlataformaFondo()
    {
        const platforms = this.plataformas.getChildren()
        let platafondo = platforms[0]

        for (let i = 1; i < platforms.length; ++i)
        {
        const platform = platforms[i]
            if (platform.y < platafondo.y)
            {
                continue
            }

            platafondo = platform
        }
        return platafondo
    }

    PlataformaArriba()
    {
        const platforms = this.plataformas.getChildren();
        let platarriba = platforms[0];

        for (let cont = 1; cont < platforms.length; cont++)
        {
        const platform = platforms[cont]
            if (platform.y < platarriba.y)
            {
                platarriba = platform;
            }
        }
        return platarriba
    }









    GameOver(){
        const platafondo = this.PlataformaFondo()
        if (this.player.y > platafondo.y + 50)
        {
            console.log('game over')
            this.guardarPuntaje(this.puntaje);
            this.puntaje = 0;
            this.scene.start('GameOver');
        }
    }

    abrirBaseDeDatos() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('DreamPlay', 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('puntajes')) {
                    db.createObjectStore('puntajes', { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }

    async guardarPuntaje(puntaje) {
        const db = await this.abrirBaseDeDatos();
        const transaction = db.transaction('puntajes', 'readwrite');
        const store = transaction.objectStore('puntajes');
        store.add({ puntaje });
    }

}