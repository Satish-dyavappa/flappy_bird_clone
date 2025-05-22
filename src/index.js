import phaser from "phaser";

const config = {
  //webGL (web graphics library) is a JavaScript API for rendering 2D and 3D graphics in a web browser
  //phaser.AUTO will use WebGL if available, otherwise it will fall back to Canvas
  type: phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    //arcade is a physics engine that is used for 2D games
    default: "arcade",
    arcade: {
    debug:true,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
// preload is a function that is called before the game starts, load assets and resources
function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
}

const Veloity =200;
let bird = null;
const flapvelocity=250;
const initialpos={x:config.width * 0.1,y:config.height/2}; // initial position of the bird
let upperpipe=null;
let lowerpipe=null;

// create is a function that is called after the game starts, create the game objects and set up the game
function create() {
  // x and y are the coordinates of the image on the screen
  // "sky" is the key of the image that was loaded in the preload function
  this.add.image(0, 0, "sky").setOrigin(0);
  bird = this.physics.add.sprite(initialpos.x,initialpos.y, "bird").setOrigin(0);
  bird.body.gravity.y =400;
  upperpipe=this.physics.add.sprite(400,100,"pipe").setOrigin(0,1);
  lowerpipe=this.physics.add.sprite(400,upperpipe.y + 100,"pipe").setOrigin(0,0);
  this.input.on("pointerdown",flap);
  this.input.keyboard.on("keydown-SPACE",flap);
  

}

// update is a function that is called every frame, update the game objects and handle user input
function update(time, delta) {
if(bird.y> config.height || bird.y<0){
    initialBirdPosition();
}

}

function initialBirdPosition(){
bird.x=initialpos.x;
bird.y=initialpos.y;
bird.body.velocity.y=0;
}
function flap(){
bird.body.velocity.y = -flapvelocity;

}

new phaser.Game(config);
