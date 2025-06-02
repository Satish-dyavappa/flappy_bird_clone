import BaseScene from "./BaseScene";


class ScoreScene extends BaseScene {
    constructor(config) {
        super('ScoreScene',{...config,canGoBack:true});

    }

    create() {
        super.create();

        const bestscore = localStorage.getItem('BestScore');
        this.add.text(...this.ScreenCenter, `Best Score:${bestscore}`, this.fontoptions).setOrigin(0.5);
    }
    
}

export default ScoreScene;