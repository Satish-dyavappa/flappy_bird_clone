import phaser from "phaser";
import PlayScene from "./scenes/PlayScene";
import MenuScene from "./scenes/MenuScene";
import preloadScene from "./scenes/preloadScene";
import ScoreScene from "./scenes/ScoreScene";
import PouseScene from "./scenes/PouseScene";


const WIDTH=800;
const HEIGHT=600;
const BIRD_POSITION={x:WIDTH * 0.1, y:HEIGHT/2};

const SHARED_CONFIG={
  width:WIDTH,
  height:HEIGHT,
  startposition:BIRD_POSITION,
}

const Scene=[preloadScene, MenuScene,ScoreScene, PlayScene,PouseScene];
const createScene=Scene => new Scene(SHARED_CONFIG);
const initScene=() => Scene.map(createScene);
const config = {
  //webGL (web graphics library) is a JavaScript API for rendering 2D and 3D graphics in a web browser
  //phaser.AUTO will use WebGL if available, otherwise it will fall back to Canvas
  type: phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    //arcade is a physics engine that is used for 2D games
    default: "arcade",
    arcade: {
    },
  },
  scene: initScene(),
};
new phaser.Game(config);