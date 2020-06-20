import Phaser from 'phaser'
import * as Math from 'mathjs'

class CheckPoint extends Phaser.Physics.Arcade.Sprite{
    constructor (currentScene, x, y, index) {
        //console.log('constructing checkpoint');
        super(currentScene, x, y, 'checkPoint');
        currentScene.add.existing(this);
        currentScene.physics.add.existing(this);
        this.index = index
        this.visible = false;
    }
}
class CheckpointGroup extends Phaser.Physics.Arcade.Group{
    constructor (currentScene)
    {
        super(currentScene.physics.world, currentScene);
    }
}
export default class Bouy extends Phaser.Physics.Arcade.Sprite{
    constructor (currentScene, x, y, index) {
        //console.log('constructing bouy');
        super(currentScene, x, y, 'bouy');
        currentScene.add.existing(this);
        currentScene.physics.add.existing(this);
        this.setScale(currentScene.sceneScale);
        this.index = index;
        this.checkpointText = currentScene.add.text(this.x, this.y, `${index}`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' , color: '#000000' });
        this.currentScene = currentScene
        
    }
    createCheckpoint(number, direction, index){
        this.checkPointHolderArr = []
        switch(direction) {
            case 'left':
                for(let i=0; i<=number; i++){
                    const checkPoint = new CheckPoint(this.currentScene, this.x-80-i*300*this.currentScene.sceneScale, this.y, index);
                    checkPoint.setScale(this.currentScene.sceneScale);
                    this.checkPointHolderArr.push(checkPoint)
                }
                break;
            case 'right':
                for(let i=0; i<=number; i++){
                    const checkPoint = new CheckPoint(this.currentScene, this.x+100+i*300*this.currentScene.sceneScale, this.y, index);
                    checkPoint.setScale(this.currentScene.sceneScale);
                    this.checkPointHolderArr.push(checkPoint)
                }
                break;
            default:
                //default
        }
        return this.checkPointHolderArr
        
        
    }
}