/**
 *
 * @author 
 *
 */
class StartGamePanel extends egret.Sprite{
    private startGameBitmap = new egret.Bitmap();
	public constructor() {
        super();
        
        this.startGameBitmap.texture = RES.getRes("btn_start_png");
        this.width=400;
        this.height=588;
        this.touchEnabled=true;
        this.x = (egret.MainContext.instance.stage.stageWidth - this.width) / 2;
        this.y = (egret.MainContext.instance.stage.stageHeight - this.height) / 2;
        this.addChild(this.startGameBitmap);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.remove,this);
	}
	public remove(){
        this.removeChild(this.startGameBitmap);
        var evt: GameEvent = new GameEvent(GameEvent.START_GAME);
        this.dispatchEvent(evt);
        console.log("抛出初始化猫的事件");
	}
}
