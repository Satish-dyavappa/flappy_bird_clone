import phaser from "phaser";
import PlayScene from "./scenes/PlayScene";

const WIDTH=800;
const HEIGHT=600;
const BIRD_POSITION={x:WIDTH * 0.1, y:HEIGHT/2};

const SHARED_CONFIG={
  width:WIDTH,
  height:HEIGHT,
  startposition:BIRD_POSITION,
}
const config = {
  //webGL (web graphics library) is a JavaScript API for rendering 2D and 3D graphics in a web browser
  //phaser.AUTO will use WebGL if available, otherwise it will fall back to Canvas
  type: phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    //arcade is a physics engine that is used for 2D games
    default: "arcade",
    arcade: {
    debug:true,
    },
  },
  scene: [new PlayScene(SHARED_CONFIG)]
};
new phaser.Game(config);
