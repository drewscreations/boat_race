import * as Phaser from 'phaser';
import boat from '@/game/assets/images/boat.png'
import sky from '@/game/assets/sky.png'
import bouy from '@/game/assets/images/bouy.png'
import boom from '@/game/assets/images/boom.png'
import checkPoint from '@/game/assets/images/checkPoint.png'
// import bomb from '@/game/assets/bomb.png'
import thudMp3 from '@/game/assets/thud.mp3'
import thudOgg from '@/game/assets/thud.ogg'
import courseInstruction from '@/game/assets/images/courseInstructions.png'

export default class BootScene extends Phaser.Scene {
  constructor() {
    // debugger;
    super('BootScene');
    // debugger;
    console.log('constructing boot')
    

  }

  preload() {
    // load images
    this.loadImages();
    // load spritesheets
    this.loadSpriteSheets();
    // load audio
    this.loadAudio();
    // load tilemap
    this.loadTileMap();
    console.log('finished preloading boot')
    console.log(`Boot scene key: ${this.scene.key}`)
  }

  loadImages() {
    this.load.image('boat', boat);
    this.load.image('sky', sky);
    this.load.image('bouy',bouy);
    this.load.image('boom',boom);
    this.load.image('checkPoint',checkPoint);
    this.load.image('courseInstruction',courseInstruction);
    }

  loadSpriteSheets() {
    // this.load.spritesheet('items', 'assets/images/items.png', { frameWidth: 32, frameHeight: 32 });
    // this.load.spritesheet('characters', 'assets/images/characters.png', { frameWidth: 32, frameHeight: 32 });
    // this.load.spritesheet('monsters', 'assets/images/monsters.png', { frameWidth: 32, frameHeight: 32 });
  }

  loadAudio() {
    this.load.audio('thud', [thudMp3, thudOgg])
    // this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
    // this.load.audio('enemyDeath', ['assets/audio/EnemyDeath.wav']);
    // this.load.audio('playerAttack', ['assets/audio/PlayerAttack.wav']);
    // this.load.audio('playerDamage', ['assets/audio/PlayerDamage.wav']);
    // this.load.audio('playerDeath', ['assets/audio/PlayerDeath.wav']);
  }

  loadTileMap() {
    // map made with Tiled in JSON format
    //this.load.tilemapTiledJSON('map', 'assets/level/large_level.json');
  }

  create() {
    this.scene.start('TitleScene');
    console.log('sent switch to start game')
  }
}
