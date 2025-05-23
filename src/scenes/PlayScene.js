import phaser from "phaser";
let pipes_to_render=4;

class PlayScene extends Phaser.Scene {

    constructor(config) {
        super('PlayScene' );
        this.config=config;

        this.bird=null;
        this.pipes=null;
        this.pipeverticalrange=[150,250];
        this.pipeshorizontalDistacerange=[400,430];
        this.pipehorizontalDistance=0;
        this.flapvelocity=250;
    }
    // preload is a function that is called before the game starts, load assets and resources
    preload() {
        this.load.image("sky", "assets/sky.png");
        this.load.image("bird", "assets/bird.png");
        this.load.image("pipe", "assets/pipe.png");
    }

    // create is a function that is called after the game starts, create the game objects and set up the game
    create(){  
        this.createBG();
        this.createBird();
        this.createPipes();
        this.handleinputs();
    }
    // update is a function that is called every frame, update the game objects and handle user input
    update(time, delta){
        this.CheckGameStatus();
        this.recyclepipes();
    }

    createBG(){
        this.add.image(0, 0, "sky").setOrigin(0);
    }

    createBird(){
        this.bird = this.physics.add.sprite(this.config.startposition.x,this.config.startposition.y, "bird").setOrigin(0);
        this.bird.body.gravity.y =400;
    }

    createPipes(){
        this.pipes=this.physics.add.group();

        for(let i=0;i<pipes_to_render;i++){
            const upperpipe=this.pipes.create(0,0,"pipe").setOrigin(0,1);
            const lowerpipe=this.pipes.create(0,0,"pipe").setOrigin(0,0); 

            this.place_pipes(upperpipe,lowerpipe);
        };
        
        this.pipes.setVelocityX(-200);
    }

    handleinputs(){
        this.input.on("pointerdown",this.flap,this);
        this.input.keyboard.on("keydown-SPACE",this.flap,this);
    }

    CheckGameStatus(){
        if(this.bird.y > this.config.height || this.bird.y< -this.bird.height){
            this.initialBirdPosition();
        }
    }

    place_pipes(upipe,lpipe){
        const RightmostX=this.getRightmostpipe();
        const pipeverticalDistance=phaser.Math.Between(...this.pipeverticalrange);
        const pipevericalposition=phaser.Math.Between(0+20,this.config.height-pipeverticalDistance-20);
        const pipehorizontalDistance =phaser.Math.Between(...this.pipeshorizontalDistacerange);
          
        upipe.x=RightmostX+pipehorizontalDistance;
        upipe.y=pipevericalposition;
      
        lpipe.x=upipe.x;      
        lpipe.y=upipe.y + pipeverticalDistance;
      
      }
      
    recyclepipes(pipe){
        const temppipes=[];
        this.pipes.getChildren().forEach(pipe=>{
          if(pipe.getBounds().right<=0){
            // recycle the pipe
            temppipes.push(pipe);
            if(temppipes.length===2){
              this.place_pipes(...temppipes);
            }
           
          }
        })
      }
    getRightmostpipe(){
        let RightmostX=0;
      
        this.pipes.getChildren().forEach(function(pipe){
          RightmostX=Math.max(pipe.x, RightmostX);
      })
      return RightmostX;
      }
      
    initialBirdPosition(){
      this.bird.x=this.config.startposition.x;
      this.bird.y=this.config.startposition.y;
      this.bird.body.velocity.y=0;
      }
    flap(){
      this.bird.body.velocity.y = -this.flapvelocity;
      
      }
}

export default PlayScene;