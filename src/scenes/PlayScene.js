import BaseScene from "./BaseScene";

let pipes_to_render=4;

class PlayScene extends BaseScene {

    constructor(config) {
        super('PlayScene',config);

        this.bird=null;
        this.pipes=null;
        this.ispouse=false;
        this.pipehorizontalDistance=0;
        this.flapvelocity=300;
        this.score=0;
        this.Scoretxt='';

        this.currntDifficulty='easy';
        this.difficulties ={
          'easy': {
            pipeshorizontalDistacerange: [400, 430],
            pipeverticalrange: [150, 250],
          },

          'normal': {
            pipeshorizontalDistacerange: [350, 400],
            pipeverticalrange: [100, 200],
          },
          'hard': {
            pipeshorizontalDistacerange: [300, 350],
            pipeverticalrange: [50, 150],
          }
        }
    }
    // create is a function that is called after the game starts, create the game objects and set up the game
    create(){  
        this.currentDifficulty ='easy';
        super.create();
        this.createBird();
        this.createPipes();
        this.createcollisions();
        this.createpause();
        this.createScore();
        this.handleinputs();
        this.listenToevents();

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('bird', { start: 9, end: 15}),
            frameRate: 2,
            repeat: -1
    })
        this.bird.anims.play('fly');
  }
    // update is a function that is called every frame, update the game objects and handle user input
    update(time, delta){
        this.CheckGameStatus();
        this.recyclepipes();
    }

    listenToevents(){
      if(this.pouseEvent){return;}
     this.pouseEvent = this.events.on('resume',()=>{
        this.initialtime=3;
        this.countDowntext=this.add.text(...this.ScreenCenter, `Game will start in:` + this.initialtime,this.fontoptions).setOrigin(0.5);
        this.timedEvent = this.time.addEvent({
          delay:1000,
          callback:() => this.countDown(),
          callbackScope:this,
          loop:true
      })
    })
  }

  countDown(){
    this.initialtime--;
    this.countDowntext.setText(`Game will start in :` + this.initialtime);
    if(this.initialtime <=0){
      this.ispouse=false;
      this.countDowntext.setText('');
      this.physics.resume();
      this.timedEvent.remove();
    }
  }
    

    createBG(){
        this.add.image(0, 0, "sky").setOrigin(0);
    }

    createBird(){
        this.bird = this.physics.add.sprite(this.config.startposition.x,this.config.startposition.y, "bird")
        .setScale(3)
        .setFlipX(true)
        .setOrigin(0);

        this.bird.body.setSize(this.bird.width,this.bird.height-8);
        this.bird.body.gravity.y =600;
        this.bird.setCollideWorldBounds(true);
    }

    createPipes(){
        this.pipes=this.physics.add.group();

        for(let i=0;i<pipes_to_render;i++){
            const upperpipe=this.pipes.create(0,0,"pipe")
            .setImmovable(true)
            .setOrigin(0,1);
            const lowerpipe=this.pipes.create(0,0,"pipe")
            .setImmovable(true)
            .setOrigin(0,0); 

            this.place_pipes(upperpipe,lowerpipe);
        };
        
        this.pipes.setVelocityX(-200);
    }

    createcollisions(){
     this.physics.add.collider(this.bird,this.pipes,this.gameover,null,this);
    }
    createScore(){
      this.score=0;
      const BestScoreText=localStorage.getItem('BestScore');
      this.Scoretxt=this.add.text(16,16, `Score: ${this.score}`, {fontSize: '32px',fill: 'black'});
      this.add.text(16, 50, `Best Score: ${BestScoreText || 0}`, {fontSize: '24px', fill: 'black'});
      
    }

    createpause(){
      this.ispouse=false;
     const pausebutton= this.add.image(this.config.width - 50, this.config.height-30, "pause").setInteractive().setScale(3).setOrigin(1);
     pausebutton.on("pointerdown", () => {
     this.ispouse=true;
     this.scene.pause();
     this.physics.pause();
     this.scene.launch('PouseScene', {config: this.config});


     });
    }

    handleinputs(){
        this.input.on("pointerdown",this.flap,this);
        this.input.keyboard.on("keydown-SPACE",this.flap,this);
    }

    CheckGameStatus(){
        if(this.bird.getBounds().bottom >= this.config.height || this.bird.y<=0){
            this.gameover();
        }
    }

    place_pipes(upipe,lpipe){
        const difficulty = this.difficulties[this.currntDifficulty];
        const RightmostX=this.getRightmostpipe();
        const pipeverticalDistance=Phaser.Math.Between(...difficulty.pipeverticalrange);
        const pipevericalposition=Phaser.Math.Between(0+20,this.config.height-pipeverticalDistance-20);
        const pipehorizontalDistance =Phaser.Math.Between(...difficulty.pipeshorizontalDistacerange);
          
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
              this.increaseScore();
              this.savebestscore();
              this.increaseDifficulty();
            }
           
          }
        })
      }

    increaseDifficulty(){
      if(this.score=== 1){
        this.currntDifficulty = 'normal';
    };
    if(this.score===3){
      this.currentDifficulty='hard';
    };
  }

    getRightmostpipe(){
        let RightmostX=0;
      
        this.pipes.getChildren().forEach(function(pipe){
          RightmostX=Math.max(pipe.x, RightmostX);
      })
      return RightmostX;
      }

    savebestscore(){
        const BestScoreText=localStorage.getItem('BestScore');
        const BestScore=BestScoreText && parseInt(BestScoreText, 10);
        if(!BestScore || this.score > BestScore){
          localStorage.setItem('BestScore', this.score);
        } 
    }      
    gameover(){
        this.physics.pause();
        this.bird.setTint(0xff0000);
        this.savebestscore();
        this.time.addEvent({
          dekay: 1000,
          callback: () => {
            this.scene.restart();
          },
          loop: false,
        } )
      }
    flap(){
      if(this.ispouse){return;}
      this.bird.body.velocity.y = -this.flapvelocity;
      
      }
    increaseScore(){
        this.score++;
        this.Scoretxt.setText(`Score: ${this.score}`)
    }

}

export default PlayScene;