import BaseScene from "./BaseScene";


class PouseScene extends BaseScene {
    constructor(config) {
        super('PouseScene',config);
        this.config = config;

    this.menu=[
        {scene:'PlayScene',text:'Continue'},
        {scene:'MenuScene',text:'Exit'}
    ];
    }

    create() {
        super.create();
        this.createMenu(this.menu,this.setupMenuevent.bind(this));
    }
    setupMenuevent(menuItem) {
     const textGo = menuItem.textGo;
     textGo.setInteractive();

        textGo.on('pointerover', () => {
            textGo.setStyle({ fill: '#ff9' });
        });
        textGo.on('pointerout', () => {
        textGo.setStyle({ fill: '#fff' });
        });

        textGo.on('pointerup', () => {
            if(menuItem.scene && menuItem.text==='Continue'){
                this.scene.stop();
                this.scene.resume(menuItem.scene);
            } else {
                this.scene.stop('PlayScene');
                this.scene.start(menuItem.scene);
            }
            });
    }
    
    
}

export default PouseScene;