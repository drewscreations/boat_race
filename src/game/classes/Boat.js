import Phaser from 'phaser'
import * as Math from 'mathjs'
/*
The boat class has a hull and a boom. The hull gives the desired direction while the boom gives the amgle of attack.
The hull also defines the boat speed and collides with the checkpoints
*/

class Hull extends Phaser.Physics.Arcade.Sprite{
    constructor (currentScene, x, y) {
        //console.log('constructing hull');
        super(currentScene, x, y, 'boat');
        currentScene.add.existing(this);
        currentScene.physics.add.existing(this);
        this.currentCheckpoint = 1;
        this.laps = 0;
    }
}
class Boom extends Phaser.Physics.Arcade.Sprite{
    constructor (currentScene, x, y) {
        //console.log('constructing boom');
        super(currentScene, x, y, 'boom');
        currentScene.add.existing(this);
        currentScene.physics.add.existing(this);
    }
}
export default class Boat {
    //when making a boat pass in the current scene
    constructor (currentScene, x, y, ai=true, name='bot') {
        //console.log('constructing boat');
        const hull = new Hull(currentScene, x, y);
        const boom = new Boom(currentScene, x, y);
        //hull.setCollideWorldBounds(true);
        //hull.body.onWorldBounds = true // enable worldbounds collision event
        hull.setScale(currentScene.sceneScale);
        hull.setRotation(-Math.pi/2);// the image I am using is facing right, so I need to rotate it to face up
        hull.speed = 40; // boat speed, 40 is good
        hull.rotationSpeed = 1;
        this.hull = hull;
        boom.setRotation(-Math.pi/2);
        boom.rotationSpeed = 1;
        boom.setScale(currentScene.sceneScale);
        this.boom = boom;
        this.autoToggle=false;
        //this.currentCheckpoint = 1;
        this.ai = ai;
        this.name = name;
    
        this.currentScene=currentScene;
            if(!this.ai){
            this.boatLiftText = currentScene.add.text(10, 10, 'Lift: 0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
            this.boatDragText = currentScene.add.text(10, 50, 'Drag: 0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
            this.boatAngleText = currentScene.add.text(10, 100, 'BoatAngle: 0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
            this.windAngleText = currentScene.add.text(10, 150, 'WindAngle: 0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
            this.attackAngleText = currentScene.add.text(10, 200, 'AttackAngle: 0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
            this.currentCheckpointText = currentScene.add.text(10, 250, 'Checkpoint: 0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
            this.hull.setTint('0xfff000')
        }
        this.messagesText = currentScene.add.text(10, 250, '', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }); 
        currentScene.physics.add.overlap(this.hull, null,this.moveCheckpoint(2))//getting called too early
        // currentScene.physics.add.collider()      
    }
    //turns the object in given direction: for now hull and boom
    turn(object, direction){
        switch(object){
            case 'hull':
                this.hull.angle += 1*direction*this.hull.rotationSpeed;
                this.boom.angle += 1*direction*this.boom.rotationSpeed;
                break;
            case 'boom':
                if(true){//(-this.boom.angle+this.hull.angle)*direction<10){//double check this math...
                    this.boom.angle += 1*direction*this.boom.rotationSpeed;
                } 
        }
    }
    moveCheckpoint(newCheckPoint){
        //this.currentCheckpoint=newCheckPoint*Math.random();
        
    }
    move(windAngle){
        let attackAngle = this.boom.angle
        let hullAngle = this.hull.angle
        //calc lift and drag from wind and attack angle
        const lift = Math.abs((Math.sin((windAngle-attackAngle)/180*Math.pi)));//vertical movement from wind
        const drag = 0//Math.abs(Math.cos(this.boat.angle/56)/3);//horrizontal movement from wind
        //move the boat
        this.hull.setVelocityY((lift-drag)*Math.sin(this.hull.angle*Math.pi/180)*this.hull.speed)
        this.hull.setVelocityX((lift-drag)*Math.cos(this.hull.angle*Math.pi/180)*this.hull.speed)
        // this.hull.setVelocityX(10)
        //move the boom with the boat
        this.boom.x = this.hull.x
        this.boom.y = this.hull.y
        this.messagesText.x = this.hull.x;
        this.messagesText.y = this.hull.y;
        //only give stats of non ai controlled
        if(!this.ai){this.updateText(drag, lift, hullAngle, windAngle, attackAngle)};
        const dx = this.hull.x-this.currentScene.bouy4.x;
        const dy = this.hull.y-this.currentScene.bouy4.y;
        // const res = Math.atan(dy/dx)*180/Math.pi;
        const hullPos = {
            x:this.hull.x,
            y:this.hull.y
        };
        //------------------------target checkpoint position-----------------------------
        const targetCheckpointIndex = Math.floor(Math.random()*this.currentScene.path1Checkpoints[this.hull.currentCheckpoint-1].length)||0
        const bouyPos = {
            x:this.currentScene.path1Checkpoints[this.hull.currentCheckpoint-1][targetCheckpointIndex].x||0,
            y:this.currentScene.path1Checkpoints[this.hull.currentCheckpoint-1][targetCheckpointIndex].y||0
        };
        const res = Phaser.Math.Angle.WrapDegrees(-Phaser.Math.Angle.BetweenPoints(bouyPos,hullPos)*180/Math.pi+this.hull.angle-180)
        const my_angle = (Math.sin((windAngle-attackAngle)/180*Math.pi))
        //use this.messagesText for debugging messages on the boat?
        //this.messagesText.text = `Current checkpoint: ${this.hull.currentCheckpoint}`;
        //ai moving hull and boom
        if(res>30&&this.ai){this.turn('hull',-1)}
        else if (res<20&&this.ai){this.turn('hull',1)};
        if(my_angle>-.9&&this.ai){this.turn('boom',1)}
        else if (my_angle<.9&&this.ai){this.turn('boom',-1)};
        
    }
    updateText(drag, lift, boatAngle, windAngle, attackAngle){
        this.boatDragText.text = `Drag: ${drag}`;
        this.boatLiftText.text = `Lift: ${lift}`;
        this.boatAngleText.text = `BoatAngle: ${boatAngle}`;
        this.windAngleText.text = `WindAngle: ${windAngle}`;
        this.attackAngleText.text = `AttackAngle: ${attackAngle}`;
        this.currentCheckpointText.text = `Checkpoint: ${this.hull.currentCheckpoint}`;
        //this.messagesText.text = `AutoToggle: ${this.autoToggle}`;
    }
}