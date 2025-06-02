import BaseScene from "./BaseScene";


class MenuScene extends BaseScene {
    constructor(config) {
        super('MenuScene',config);
        this.config = config;

    this.menu=[
        {scene:'PlayScene',text:'Play'},
        {scene:'ScoreScene',text:'Score'},
        {scene:null,text:'Exit'}
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
        menuItem.textGo && this.scene.start(menuItem.scene);
        if (menuItem.scene === 'Exit') {
            this.game.destroy(true);
        }
            });
    }
    
    
}

export default MenuScene;