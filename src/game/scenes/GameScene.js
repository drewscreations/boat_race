import { Scene } from 'phaser'
import * as Math from 'mathjs'
import Boat from '../classes/Boat'
import Bouy from '../classes/Bouy'


export default class GameScene extends Scene {
    constructor () {
        super({ key: 'GameScene' })
        console.log('constructing game scene')
    }
    preload () {

        // enable cursor keys
        this.vectorToAngle = (coords) => { //coords: [x,y]
            return Math.atan(coords[1]/coords[0])*180/Math.pi //output angle in deg, I want to use this for wind angles
        }
        this.cursors = this.input.keyboard.createCursorKeys();
        this.aKey = this.input.keyboard.addKey('A'); 
        this.sceneScale = 0.2 //image scaling
        console.log('finished preloading game scene')
        console.log(`Game scene key: ${this.scene.key}`)
        
        
    }
    create () {
        const maxEnemyBoats = 4
        this.add.image(400, 300, 'sky');
        this.add.text(10, 10, 'left/right to rotate boat\nup/down to rotate boom', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',color: '#ffff00' });
        //-----------------------level creation-----------------------
        //spawn bouys
        this.bouy1 = new Bouy(this, 50, 500, 1);
        this.bouy2 = new Bouy(this, 180, 300, 2);
        this.bouy3 = new Bouy(this, 600, 300, 3);
        this.bouy4 = new Bouy(this, 400, 90, 4);
        //create checkpoints
        //path 1
        this.path1Checkpoints = []
        this.path1Checkpoints.push(this.bouy4.createCheckpoint(4, 'right', 1))
        this.path1Checkpoints.push(this.bouy4.createCheckpoint(4, 'left', 2))
        this.path1Checkpoints.push(this.bouy2.createCheckpoint(4, 'right', 3))
        this.path1Checkpoints.push(this.bouy2.createCheckpoint(2, 'left', 4))
        this.path1Checkpoints.push(this.bouy4.createCheckpoint(4, 'right', 5))
        this.path1Checkpoints.push(this.bouy4.createCheckpoint(4, 'left', 6))
        this.path1Checkpoints.push(this.bouy1.createCheckpoint(12, 'right', 7))
        this.path1Checkpoints.push([])
        //path 2
        this.path2Checkpoints = []
        this.path2Checkpoints.push(this.bouy4.createCheckpoint(8, 'right', 1))
        this.path2Checkpoints.push(this.bouy4.createCheckpoint(8, 'left', 2))
        this.path2Checkpoints.push(this.bouy3.createCheckpoint(4, 'left', 3))
        this.path2Checkpoints.push(this.bouy3.createCheckpoint(4, 'right', 4))
        this.path2Checkpoints.push(this.bouy4.createCheckpoint(4, 'right', 5))
        this.path2Checkpoints.push(this.bouy4.createCheckpoint(4, 'left', 6))
        this.path2Checkpoints.push(this.bouy1.createCheckpoint(12, 'right', 7))
        //spawn boats
        
        this.playerBoat = new Boat(this, 500, 520, false, 'superBoat');
        this.enemyBoatsArr = []
        this.enemyHullArr = []
        this.allHullArr = []
        this.allHullArr.push(this.playerBoat.hull)
        for (let i=0; i<maxEnemyBoats; i++){
            const enemyBoat = new Boat(this, 100*i, 520);
            this.enemyBoatsArr.push(enemyBoat)
            this.enemyHullArr.push(enemyBoat.hull)
            this.allHullArr.push(enemyBoat.hull)
        }
        //add opverlap for all boats and checkpints
        for (let i=0; i<this.path1Checkpoints.length; i++){
            this.physics.add.overlap(
                this.allHullArr,
                this.path1Checkpoints[i],
                function(hull, checkpoint){
                    //console.log(hull.currentCheckpoint, checkpoint)
                    if(hull.currentCheckpoint===checkpoint.index){
                        if(hull.currentCheckpoint===7){
                            hull.currentCheckpoint=1;
                            hull.laps++}
                        else{
                        hull.currentCheckpoint=checkpoint.index+1
                        }
                    }
                })
        }
        //add collision for all boats
        this.physics.add.collider(this.allHullArr,this.allHullArr)
        this.windDirection = -90;
        
        
        }

    update () {
        //move boats from wind
        this.playerBoat.move(this.windDirection);
        this.enemyBoatsArr.map((boat, index)=>{
            boat.move(this.windDirection);
        }) 
        //-------------------player controlls------------------------
        // rotate to the left
        if(this.cursors.left.isDown) {
            this.playerBoat.turn('hull', -1);
        }
        // rotate to the right
        else if(this.cursors.right.isDown) {
            this.playerBoat.turn('hull', 1);            
        }
        // move the boom
        if(this.cursors.up.isDown) {
            this.playerBoat.turn('boom', -1);
        }
        //move boom other way
        else if(this.cursors.down.isDown) {
            this.playerBoat.turn('boom', +1);
        }
        if(this.playerBoat.hull.laps>=1){
            this.scene.start('WinScene')
        }
        //all checkpoints invisible
        this.path1Checkpoints.map((checkpoint)=>{
            checkpoint.map((piece)=>{
                piece.visible=false
            })
        })
        //player's active checkpoint - visible
        this.path1Checkpoints[this.playerBoat.hull.currentCheckpoint-1].map((piece)=>{
            piece.visible=true
        })
    }
    
}
