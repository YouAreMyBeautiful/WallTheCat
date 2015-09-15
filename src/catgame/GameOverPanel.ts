/**
 *
 * @author 
 *
 */
class GameOverPanel extends egret.Sprite {
    private startGameBitmap = new egret.Bitmap();
    private mao2 = new egret.Bitmap();
    private text: egret.TextField;
    private share=new egret.Bitmap();
    public replay: RePlay=new RePlay();
    public constructor() {
        super();
       // var replay: RePlay;
        //replay = new RePlay();
        this.startGameBitmap.texture = RES.getRes("failed_png");
        this.mao2.texture = RES.getRes("mao2_png");
       // this.share.texture = RES.getRes("shareBTN_png");
        
        this.width=400;
        this.height=500;
        this.touchEnabled=true;
        this.x = (egret.MainContext.instance.stage.stageWidth - this.width) / 2-25;
        this.y = (egret.MainContext.instance.stage.stageHeight - this.height)/2;
        this.mao2.x = 90;
        this.mao2.y = 265;
        this. text=new egret.TextField;
        this.text.text="你没有抓住神经猫！！！\n再来一次吧！";
        this.text.x = this.width / 2-130;
        this. text.y = this.height / 2-50;
        this. text.textColor = 0XFF0000;
        //this.replay.x = 240;
       // this.replay.y = 358;
        this.share.x = 5;
        this.share.y = 358;
        
        this.addChild(this.startGameBitmap);
        this.addChild(this.mao2);
        this.addChild(this.text); 
        // var replay: RePlay;
       // replay = new RePlay();
        this.addChild(this.replay);
        this.addChild(this.share);
        this.replay.addEventListener(GameEvent.RE_MOVE,this.remove,this);
        
    }
    public remove(){
        this.replay.removeEventListener(GameEvent.RE_MOVE,this.remove,this);
        this.removeChild(this.startGameBitmap);
        this.removeChild(this.mao2);
        this.removeChild(this.text); 
        this.removeChild(this.share);
        var evt: GameEvent = new GameEvent(GameEvent.RE_PLAY);
        this.dispatchEvent(evt);
    }
}
