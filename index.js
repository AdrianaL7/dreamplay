import Cielo from './scenes/cielo.js'; 
import CieMJuego from './scenes/cielo_minujuego.js';
import GameOver from './scenes/gameover.js';
import Inicio from './scenes/inicio.js'; 
import Mascota from './scenes/mascota.js'; 



const config = {
    type: Phaser.AUTO,
    width: 360, 
    height: 640,
    scale: {
    mode: Phaser.Scale.FIT, 
    backgroundColor: "#99dcec",
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
    scene: 
        [Inicio, Mascota, Cielo, CieMJuego,GameOver],
        pixelart:true,
        physics: 
        {
            default: 'arcade', 
            arcade: 
            {
                gravity: { y: 0 }, 
                debug: false
            }
        }
};


const game = new Phaser.Game(config);