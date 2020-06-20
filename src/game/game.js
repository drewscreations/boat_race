import Phaser from 'phaser'
import Scenes from './scenes/Scenes'


function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: Scenes
  })
}

export default launch
export { launch }
