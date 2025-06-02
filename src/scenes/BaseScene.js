import Phaser from 'phaser';


class BaseScene extends Phaser.Scene {
    constructor(key,config) {
        super(key);
        this.config = config;
        this.ScreenCenter= [config.width / 2,config.height / 2];
        this.fontSize=32;
        this.lineHeight=40;
        this.fontoptions = {fontSize: `${this.fontSize}px`, fill: '#fff'};
    }

    create() {
        this.add.image(0,0, "sky").setOrigin(0);
        
        if(this.config.canGoBack){
            const backButton=this.add.image(this.config.width - 10, this.config.height - 10, "back")
            .setInteractive()
            .setScale(2)
            .setOrigin(1);
            backButton.on('pointerup', () => {
                this.scene.start('MenuScene');
            });    
        }

    }
    createMenu(menu,setupMenuevent) {
        let lastMenupositiony = 0;
        menu.forEach(menuItem => {
            const menuposition=[this.ScreenCenter[0],this.ScreenCenter[1] + lastMenupositiony];
            menuItem.textGo=this.add.text(...menuposition, menuItem.text, this.fontoptions).setOrigin(0.5,1);
            lastMenupositiony += this.lineHeight;
            setupMenuevent(menuItem);

        });

    }
}

export default BaseScene;