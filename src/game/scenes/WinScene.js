import { Scene } from 'phaser'


export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'WinScene' })
  }

  create () {
    this.add.image(400, 300, 'sky')
    this.spaceKey = this.input.keyboard.addKey('SPACE'); 
   this.add.text(300, 200, 'You Won! press space to start', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
  }
  update () {
    if(this.spaceKey.isDown){
        this.scene.start('GameScene')
    }
  }
}
