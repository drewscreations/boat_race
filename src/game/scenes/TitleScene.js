import { Scene } from 'phaser'


export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'TitleScene' })
  }

  create () {
    this.add.image(400, 300, 'sky')
    this.spaceKey = this.input.keyboard.addKey('SPACE'); 
    const flavorText = 'Happy Fathers Day!\nYour boat is yellow with a red boom.\nRotate the boat with the left/right arrow keys\nRotate the boom with the up/down arrow keys\nPress space to start'
    this.add.text(200, 200, flavorText, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', backgroundColor: 'rgba(0,255,0,0.25)', align:'center' } );
    //instructions background image
    // let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'courseInstruction')
    // let scaleX = this.cameras.main.width / image.width
    // let scaleY = this.cameras.main.height / image.height
    // let scale = Math.max(scaleX, scaleY)
    // image.setScale(scale).setScrollFactor(0)
    //this.add.image(0,0,'courseInstruction')
  }
  update () {
    if(this.spaceKey.isDown){
        this.scene.start('GameScene')
    }
  }
}
